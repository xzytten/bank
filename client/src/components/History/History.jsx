import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Spent from '../TransactionBlock/Spent';
import Arrived from '../TransactionBlock/Arrived';
import Modal from '../TransactionBlock/Modal';

import './History.css';


const History = () => {
    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [transactionModal, setTransactionModal] = useState(false);
    const [dataTransaction, setDataTransaction] = useState(null);

    const transactions = useSelector((state) => state.auth.transactionHistory);
    const newTransaction = useSelector((state) => state.transaction.newTransaction);

    useEffect(() => {
        let updatedTransactions = transactions || [];

        if (newTransaction) {
            updatedTransactions = [...updatedTransactions, ...[newTransaction]];
        }

        const sortedTransactions = updatedTransactions.slice().sort(compareDates);

        const groupedByDate = groupTransactionsByDate(sortedTransactions);
        setGroupedTransactions(groupedByDate);
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
                            {index === 0 ? (
                                transaction.typeTransaction === 'send' ? (
                                    <Spent card={transaction.trans.recipient} sum={transaction.trans.sum} />
                                ) : (
                                    <Arrived card={transaction.trans.sender} sum={transaction.trans.sum} />
                                )
                            ) : (
                                transaction.typeTransaction === 'send' ? (
                                    <Spent card={transaction.trans.recipient} sum={transaction.trans.sum} />
                                ) : (
                                    <Arrived card={transaction.trans.sender} sum={transaction.trans.sum} />
                                )
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {transactionModal && <Modal transaction={dataTransaction} setTransactionModal={setTransactionModal} />}
        </div>
    );
};

export default History;

