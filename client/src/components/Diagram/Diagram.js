import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Diagram.css';

const Diagram = () => {
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
    const data = {
        labels: ['Income', 'Extence'],
        datasets: [
            {
                data: [income, extence],
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

    const options = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
            },
        },
    };

    return (
        <div>
            <div className="diagram-container">
                <div className='diagram_cont'>
                    <Doughnut data={data} options={options} />
                </div>
            </div>
            <div className="progerss-container">
                <div className='income-container'>
                    <span className="income">
                        Income:
                        <p className="income-cash">
                            <animated.span>{animatedIncome.value.interpolate((val) => Math.floor(val))}</animated.span>
                        </p>
                    </span>
                </div>
                <div className="extense-container">
                    <span className="extense">Extence:
                        <p className="extense-cash">
                            <animated.span>{animatedExtence.value.interpolate((val) => Math.floor(val))}</animated.span>
                        </p></span>
                </div>
            </div>
        </div>
    );
};

export default Diagram;
