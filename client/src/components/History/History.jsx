import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreTransaction } from '../../redux/authSlice';
import { useSpring, useTransition, animated, config } from 'react-spring';
import Spent from '../TransactionBlock/Spent';
import Arrived from '../TransactionBlock/Arrived';
import Modal from '../TransactionBlock/Modal';
import spinner from '../../img/svg/spiner.svg';

import './History.css';

const History = () => {
    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [transactionModal, setTransactionModal] = useState(false);
    const [dataTransaction, setDataTransaction] = useState(null);
    const [statusHistory, setStatusHistory] = useState(null);
    const [loadingNewTransactions, setLoadingNewTransactions] = useState(false);

    const transactions = useSelector((state) => state.auth.transactionHistory);
    const newTransaction = useSelector((state) => state.transaction.newTransaction);
    const totalCountTransaction = useSelector((state) => state.auth.totalCountTransaction);
    const userId = useSelector((state) => state.auth.user._id);

    const statusLoadMore = useSelector((state) => state.auth.statusHistory);

    const [totalCount, setTotalCount] = useState(null);

    const dispatch = useDispatch();

    const getMore = () => {
        if (!transactions || totalCount < totalCountTransaction) {
            setLoadingNewTransactions(true);
            dispatch(getMoreTransaction({ totalCount, userId })).then(() => {
                setLoadingNewTransactions(false);
            });
        }
    };

    useEffect(() => {
        setStatusHistory(statusLoadMore);
    }, [statusLoadMore]);

    useEffect(() => {
        if (transactions) {
            let updatedTransactionsCopy;

            if (newTransaction) {
                updatedTransactionsCopy = [newTransaction, ...transactions];
            } else {
                updatedTransactionsCopy = transactions;
            }

            const sortedTransactions = updatedTransactionsCopy.slice().sort(compareDates);
            const groupedByDate = groupTransactionsByDate(sortedTransactions);
            setGroupedTransactions(groupedByDate);
            setTotalCount(updatedTransactionsCopy.length);
        }
    }, [transactions, newTransaction]);

    const compareDates = (a, b) => {
        const dateA = new Date(a.trans.date.split('T')[0]);
        const dateB = new Date(b.trans.date.split('T')[0]);
        return dateB - dateA;
    };

    const compareDatesTrans = (a, b) => {
        const dateA = new Date(a.trans.date);
        const dateB = new Date(b.trans.date);
        return dateB - dateA;
    };

    const groupTransactionsByDate = (transactions) => {
        const grouped = transactions.reduce((grouped, transaction) => {
            const dateKey = transaction.trans.date.split('T')[0];
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(transaction);
            return grouped;
        }, {});

        Object.keys(grouped).forEach((dateKey) => {
            grouped[dateKey].sort(compareDatesTrans);
        });

        return grouped;
    };

    const someFun = (transaction) => {
        setTransactionModal(true);
        setDataTransaction(transaction);
    };

    const formatDate = (inputDate) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

        const [month, day, year] = formattedDate.split(' ');

        return `${month}. ${day} ${year}`;
    };

    // Анімація для блоку транзакцій
    const groupContainerProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: config.stiff,
    });

    // Анімація для кнопки "load more"
    const loadMoreButtonProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: config.stiff,
    });

    // Анімація для вхідних транзакцій
    const transitions = useTransition(Object.keys(groupedTransactions), {
        from: { opacity: 0, transform: 'translateY(-20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-20px)' },
        keys: (item) => item,
        config: config.gentle,
    });

    return (
        <animated.div style={groupContainerProps} className='cards-history-container'>
            {transitions((style, item) => (
                <animated.div key={item} style={{ ...style, flexShrink: 0 }}>
                    <div className='group_container'>
                        <div className='group_date'>{formatDate(item)}</div>
                        {groupedTransactions[item].map((transaction, index) => (
                            <TransactionItem
                                key={transaction.trans.id}
                                transaction={transaction}
                                index={index}
                                onClick={() => someFun(transaction)}
                            />
                        ))}
                    </div>
                </animated.div>
            ))}
            <div className='button_container'>
                {statusHistory === 'pending' ? (
                    <img alt='spinner' className='spinner_more' src={spinner} />
                ) : totalCount !== totalCountTransaction && !loadingNewTransactions && (
                    <animated.button
                        className='load_more'
                        style={loadMoreButtonProps}
                        onClick={getMore}
                    >
                        load more
                    </animated.button>
                )}
            </div>
            {transactionModal && <Modal transaction={dataTransaction} setTransactionModal={setTransactionModal} />}
        </animated.div>
    );
};

const TransactionItem = ({ transaction, index, onClick }) => {
    const transactionProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
        delay: index * 50,
        config: config.gentle,
    });

    return (
        <animated.div style={transactionProps} onClick={onClick}>
            {index === 0 ? (
                transaction.typeTransaction === 'send' ? (
                    <Spent index={index} newUser={transaction.recipientUser} user={transaction.users} sum={transaction.trans.sum} />
                ) : (
                    <Arrived index={index} user={transaction.users} sum={transaction.trans.sum} />
                )
            ) : (
                transaction.typeTransaction === 'send' ? (
                    <Spent newUser={transaction.recipientUser} index={index} user={transaction.users} sum={transaction.trans.sum} />
                ) : (
                    <Arrived index={index} user={transaction.users} sum={transaction.trans.sum} />
                )
            )}
        </animated.div>
    );
};

export default History;
