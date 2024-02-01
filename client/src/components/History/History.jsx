import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import './History.css';
import Spent from '../TransactionBlock/Spent';
import Arrived from '../TransactionBlock/Arrived';
import Modal from '../TransactionBlock/Modal';

const History = () => {
    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [displayedDates, setDisplayedDates] = useState([]);
    const [transactionModal, setTransactionModal] = useState(false);
    const [dataTransaction, setDataTransaction] = useState(null)

    const transactions = useSelector(state => state.auth.transactionHistory);
    const newTransaction = useSelector(state => state.transaction.newTransaction);

    useEffect(() => {
        let updatedTransactions = transactions || [];

        if (newTransaction) {
            updatedTransactions = [...updatedTransactions, newTransaction];
        }

        const sortedTransactions = updatedTransactions.slice().sort(compareDates);

        const groupedByDate = groupTransactionsByDate(sortedTransactions);
        setGroupedTransactions(groupedByDate);
        setDisplayedDates([]); // Скидаємо вже виведені дати при кожному оновленні

    }, [transactions, newTransaction]);

    const compareDates = (a, b) => {
        const dateA = new Date(a.trans.date.split('T')[0]);
        const dateB = new Date(b.trans.date.split('T')[0]);
        return dateB - dateA;
    };

    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((grouped, transaction) => {
            const dateKey = transaction.trans.date.split('T')[0];
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(transaction);
            return grouped;
        }, {});
    };

    const someFun = (transaction) => {
        setTransactionModal(true)
        setDataTransaction(transaction)
    }

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
                            {
                                index === 0 ? (
                                    transaction.typeTransaction === 'send' ?
                                        <Spent date={formatDate(transaction.trans.date)} sum={transaction.trans.sum} />
                                        :
                                        <Arrived date={formatDate(transaction.trans.date)} sum={transaction.trans.sum} />
                                ) : (
                                    transaction.typeTransaction === 'send' ?
                                        <Spent date={formatDate(transaction.trans.date)} sum={transaction.trans.sum} />
                                        :
                                        <Arrived date={formatDate(transaction.trans.date)} sum={transaction.trans.sum} />
                                )
                            }
                        </div>
                    ))}
                </div>
            ))}
            {transactionModal && <Modal transaction={dataTransaction} setTransactionModal={setTransactionModal}/>}
        </div>
    );
}

export default History; 