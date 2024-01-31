import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './Diagram.css'

const Diagram = (props) => {
    const [income, setIncome] = useState(0);
    const [extence, setExtence] = useState(0);

    const allTransaction = useSelector(state => state.auth.transactionHistory)

    useEffect(() => {
        allTransaction && calcIncome()
    }, [allTransaction])

    const calcIncome = () => {
        let income = 0;
        let extence = 0;

        allTransaction.forEach(transaction => {
            if (transaction.typeTransaction === 'recipient') {
                income += transaction.trans.sum;
            } else {
                extence += transaction.trans.sum;
            }
        });
        setIncome(income)
        setExtence(extence)
    }

    return (
        <div>
            <div className="diagram-container">
                <div className={`progress_bar ${props.isOver ? 'over_50' : ''}`}>
                    <span className={`diagram diagram-left ${true ? 'over_50' : ''}`} style={{ transform: `rotate(calc(180deg + ${50}deg * 360 / 100))` }}></span>
                    <span className={`diagram diagram-right ${false ? 'over_50' : ''}`} style={{ transform: `rotate(calc(180deg + ${50}deg * 360 / 100))` }}></span>
                </div>
            </div>
            <div className="progerss-container">
                <div className='income-container'>
                    <span className="income">Income: <p className="income-cash">{income}</p></span>
                </div>
                <div className="extense-container">
                    <span className="extense">Extence: <p className="extense-cash">{extence}</p></span>
                </div>
            </div>
        </div>
    )
}

export default Diagram;