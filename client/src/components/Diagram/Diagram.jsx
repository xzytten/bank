import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import './Diagram.css';

const Diagram = () => {
<<<<<<< HEAD:client/src/components/Diagram/Diagram.js
=======

>>>>>>> origin/main:client/src/components/Diagram/Diagram.jsx
    ChartJS.register(ArcElement, Tooltip, Legend);

    const cardCashHistory = useSelector(state => state.auth.cashHistory);
    const transCashHistory = useSelector(state => state.transaction.cashHistory);
    
    const [income, setIncome] = useState(0);
    const [extence, setExtence] = useState(0);

    useEffect(() => {
        if (transCashHistory) {
            setIncome(transCashHistory?.income);
            setExtence(transCashHistory?.extence);
        } else {
            setIncome(cardCashHistory?.income);
            setExtence(cardCashHistory?.extence);
        }
    }, [cardCashHistory, transCashHistory]);

    const animatedIncome = useSpring({ value: income });
    const animatedExtence = useSpring({ value: extence });

    const diagramData = {
        labels: ['Income', 'Extence'],
        datasets: [
            {
                data: [+`${income === 0 && extence === 0 ? 50 : income}`, +`${income === 0 && extence === 0 ? 50 : extence}`],
                backgroundColor: [
                    'rgba(83, 150, 109, 0.237)',
                    'rgba(94, 53, 164, 0.237)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const diagramOptions = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                displayColors: false,
            },
        },
    };

    return (
        <div>
            <div className="diagram-container">
                <div className='diagram_cont'>
                    <Doughnut data={diagramData} options={diagramOptions} />
                </div>
            </div>
            <div className="progerss-container">
                <div className='income-container'>
                    <span className="income">
                        Income:
                        <p className="income-cash">
                            <animated.span>{animatedIncome.value.to((val) => Math.floor(val))}</animated.span>
                        </p>
                    </span>
                </div>
                <div className="extense-container">
                    <span className="extense">Extence:
                        <p className="extense-cash">
                            <animated.span>{animatedExtence.value.to((val) => Math.floor(val))}</animated.span>
                        </p></span>
                </div>
            </div>
        </div>
    );
};

export default Diagram;
