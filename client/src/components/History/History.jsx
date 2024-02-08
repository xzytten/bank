import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMoreTransaction } from '../../redux/authSlice';

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
    const [updatedTransactions, setUpdatedTransactions] = useState([])

    const transactions = useSelector((state) => state.auth.transactionHistory);
    const newTransaction = useSelector((state) => state.transaction.newTransaction);
    const totalCountTransaction = useSelector((state) => state.auth.totalCountTransaction)
    const userId = useSelector(state => state.auth.user._id);


    const statusLoadMore = useSelector(state => state.auth.statusHistory);

    const [totalCount, setTotalCount] = useState(null);

    const dispatch = useDispatch();

    const getMore = () => {
        if (!transactions || totalCount < totalCountTransaction) {
            dispatch(getMoreTransaction({ totalCount, userId }));
        }
    };

    useEffect(() => {
        setStatusHistory(statusLoadMore);
        console.log(statusHistory)
    }, [statusLoadMore])

    useEffect(() => {
        if (transactions) {
            // setUpdatedTransactions(...transactions || null);
            let updatedTransactionsCopy;

            if (updatedTransactions.length === 0) {
                updatedTransactionsCopy = [...transactions];
            } else {
                updatedTransactionsCopy = [...transactions, ...updatedTransactions];
            }

            if (newTransaction) {
                updatedTransactionsCopy = [...updatedTransactionsCopy, newTransaction];
                setUpdatedTransactions([...updatedTransactions, newTransaction]);
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

        // Сортуємо транзакції в межах кожної групи (дати)
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

    return (
        <div className='cards-history-container'>
            {Object.keys(groupedTransactions).map((dateKey) => (
                <div key={dateKey} className='group_container'>
                    <div className='group_date'>{formatDate(dateKey)}</div>
                    {groupedTransactions[dateKey].map((transaction, index) => (
                        <div key={index} onClick={() => someFun(transaction)}>
                            {console.log(index)}
                            {index === 0 ? (
                                transaction.typeTransaction === 'send' ? (
                                    <Spent index={index} newUser={transaction.recipientUser} user={transaction.users} card={transaction.trans.recipient} sum={transaction.trans.sum} />
                                ) : (
                                    <Arrived card={transaction.trans.sender} index={index} user={transaction.users} sum={transaction.trans.sum} />
                                )
                            ) : (
                                transaction.typeTransaction === 'send' ? (
                                    <Spent card={transaction.trans.recipient} index={index} user={transaction.users} sum={transaction.trans.sum} />
                                ) : (
                                    <Arrived card={transaction.trans.sender} index={index} user={transaction.users} sum={transaction.trans.sum} />
                                )
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {statusHistory === 'pending'
                ?
                <img alt='spinner' className="spinner_more" src={spinner} />
                :
                totalCount !== totalCountTransaction
                &&
                <button className="load_more" onClick={getMore}>load more</button>
            }
            {transactionModal && <Modal transaction={dataTransaction} setTransactionModal={setTransactionModal} />}
        </div>
    );
};

export default History;

