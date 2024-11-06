import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreTransaction, addNewTransaction } from '../../redux/authSlice';
import { updateCardBalance } from '../../redux/transactionSlice'
import { useSpring, useTransition, animated, config } from 'react-spring';
import { addTransaction, formatDate } from './transactionHelpers';
import { useSocket } from '../../utils/socket';

import Modal from '../TransactionBlock/Modal';
import spinner from '../../img/svg/spiner.svg';
import io from 'socket.io-client';
import TransactionItem from '../TransactionBlock/TransactionItem';

import './History.css';

const History = () => {

    const userId = useSelector((state) => state.auth.user._id);

    const socket = io('http://localhost:3003', {
        query: {
            userId: userId
        }
    });

    const transactions = useSelector((state) => state.auth.transactionHistory);
    const totalCountTransaction = useSelector((state) => state.auth.totalCountTransaction);
    const statusLoadMore = useSelector((state) => state.auth.statusHistory);

    const dispatch = useDispatch();

    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [transactionModal, setTransactionModal] = useState(false);
    const [modalTransaction, setModalTransaction] = useState(null);
    const [statusHistory, setStatusHistory] = useState(null);
    const [loadingNewTransactions, setLoadingNewTransactions] = useState(false);
    const [totalCount, setTotalCount] = useState(null);

    const { newTrans } = useSocket(userId, socket)

    const getMoreTrans = () => {
        if (!transactions || totalCount < totalCountTransaction) {
            setLoadingNewTransactions(true);
            dispatch(getMoreTransaction({ totalCount, userId })).then(() => {
                setLoadingNewTransactions(false);
            });
        }
    };

    useEffect(() => {
        if (newTrans) {
            dispatch(addNewTransaction({ trans: newTrans }));
            addTransaction(newTrans, transactions, setGroupedTransactions, setTotalCount)
            dispatch(updateCardBalance({ newBalance: newTrans.cash }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTrans, dispatch]);

    useEffect(() => {
        setStatusHistory(statusLoadMore);
    }, [statusLoadMore]);

    useEffect(() => {
        if (transactions) {
            addTransaction(null, transactions, setGroupedTransactions, setTotalCount)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    const openTransactionModal = (transaction) => {
        setTransactionModal(true);
        setModalTransaction(transaction);
    };

    const groupContainerProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: config.stiff,
    });

    const loadMoreButtonProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: config.stiff,
    });

    const transitions = useTransition(Object.keys(groupedTransactions), {
        from: { opacity: 0, transform: 'translateY(-20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-20px)' },
        keys: (item) => item,
        config: config.gentle,
    });

    return (
        <div className='cards-history-container'>
            {transitions((style, item) => (
                <animated.div key={item} style={{ ...style, flexShrink: 0 }}>
                    <div className='group_container'>
                        <div className='group_date'>{formatDate(item)}</div>
                        {groupedTransactions[item].map((transaction, index) => (
                            <TransactionItem
                                key={`${transaction.trans.id}-${index}`}
                                transaction={transaction}
                                index={index}
                                onClick={() => openTransactionModal(transaction)} />
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
                        onClick={getMoreTrans}
                    >
                        load more
                    </animated.button>
                )}
            </div>
            {transactionModal && <Modal transaction={modalTransaction} setTransactionModal={setTransactionModal} />}
        </div>
    );
};

export default History;