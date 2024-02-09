import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import './Diagram.css'

const Diagram = (props) => {

    const cardCashHistory = useSelector(state => state.auth.cashHistory);
    const transCashHistory = useSelector(state => state.transaction.cashHistory);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [income, setIncome] = useState(0);
    const [extence, setExtence] = useState(0);

    useEffect(() => {
        console.log(transCashHistory)
        if (transCashHistory) {
            setIncome(transCashHistory.income);
            setExtence(transCashHistory.extence);
        } else {
            setIncome(cardCashHistory.income);
            setExtence(cardCashHistory.extence);
        }
    }, [cardCashHistory, transCashHistory]);


    const data = {
        labels: ['Income', 'Extence'],
        datasets: [
            {
                data: [income, extence],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Відключає відображення легенди (підписів)
            },
        },
    };

    // const allTransaction = useSelector(state => state.auth.transactionHistory)

    // useEffect(() => {
    //     allTransaction && calcIncome()
    // }, [allTransaction])

    // const calcIncome = () => {
    //     let income = 0;
    //     let extence = 0;

    //     allTransaction.forEach(transaction => {
    //         if (transaction.typeTransaction === 'recipient') {
    //             income += transaction.trans.sum;
    //         } else {
    //             extence += transaction.trans.sum;
    //         }
    //     });
    //     setIncome(income)
    //     setExtence(extence)
    // }

    return (
        <div>
            <div className="diagram-container">
                <div className='diagram'>
                    <Doughnut data={data} options={options} />
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
