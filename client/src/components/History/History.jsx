import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import './History.css';

const History = () => {
    const [allTransaction, setAllTransaction] = useState([])
    const transactions = useSelector(state => state.auth.transactionHistory)
    const newTransaction = useSelector(state => state.transaction.newTransaction)

    useEffect(() => {
        if (newTransaction) {
            const trans = [...allTransaction, newTransaction]
            const sortedTransactions = trans.slice().sort(compareDates);
            setAllTransaction(sortedTransactions)
        } else if(transactions){
            const sortedTransactions = transactions.slice().sort(compareDates);
            setAllTransaction(sortedTransactions)
        }
    }, [transactions, newTransaction])

    const compareDates = (a, b) => {
        const dateA = new Date(a.trans.date);
        const dateB = new Date(b.trans.date);

        return dateB - dateA;
    };

    const formatDate = (inputDate) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

        // Розбиваємо форматовану дату для вставки абревіатури місяця
        const [month, day, year] = formattedDate.split(' ');

        // Повертаємо вигляд "Apr. 23 2023"
        return `${month}. ${day} ${year}`;
    };

    return (
        <div className='cards-history-container'>

            {allTransaction.map((transaction, index) => (
                transaction.typeTransaction === 'send' ?
                    <div key={index} className='spent_money' >
                        <p className='spent-logo tranfer-history'>
                            <span className='spent-logo-ico transfer-history-ico'></span>
                        </p>
                        <div className='data__transaction'>
                            <p className='data-logo'></p>
                            <span className='data'>{formatDate(transaction.trans.date)}</span>
                        </div>
                        <div className='spent__amount'>
                            <span className='spent__amount-sum'>-{transaction.trans.sum} $</span>
                        </div>
                    </div>
                    :
                    <div className='arrived_money' key={index}>
                        <p className='arived-logo tranfer-history'>
                            <span className='arived-logo-ico transfer-history-ico'></span>
                        </p>
                        <div className='data__transaction'>
                            <p className='data-logo'></p>
                            <span className='data'>{formatDate(transaction.trans.date)}</span>
                        </div>
                        <div className='arived__amount'>
                            <span className='spent__amount-sum'> {transaction.trans.sum}$</span>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default History; 