import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cardTransaction } from '../../redux/transactionSlice'
import { selectCard } from '../../redux/authSlice'

import ModalSeccessful from '../ModalSeccessful/ModalSeccessful';
import io from 'socket.io-client';

import './ModalTransaction.css'

const socket = io('http://localhost:3003');

const ModalTransaction = ({ setTransactionModal }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [cash, setCash] = useState('');
    const [modalSeccessful, setModalSeccessful] = useState(null)
    const [timeModalSesccess, setTimeModalSesccess] = useState(null);

    const sendCard = useSelector(selectCard)
    // console.log(sendCard)
    const dispatch = useDispatch();

    const toggleModalSeccessful = () => {
        // setTransactionModal(false)
        setModalSeccessful(true);
        const timeoutId = setTimeout(() => {
            setTransactionModal(false);
            setModalSeccessful(false);
        }, 5000);

        // Зберігаємо ідентифікатор таймаута
        setTimeModalSesccess(timeoutId);
    }

    const closeModal = () => {
        if (timeModalSesccess) {
            clearTimeout(timeModalSesccess);
        }
        setTransactionModal(false);
        setModalSeccessful(false);
    }

    const handleSubmit = () => {
        dispatch(cardTransaction({
            sender: +sendCard.number,
            recipient: +cardNumber,
            sum: +cash
        }));
        // socket.emit('getTransactions', '65b1436dcb934637a8b5e037');
        toggleModalSeccessful()
    }

    const handleCardNumber = (e) => {
        setCardNumber(e.target.value);
    }

    return (
        <div>
            {modalSeccessful
                ?
                <ModalSeccessful closeModal={closeModal} />
                :
                <div className='modal_transaction-container'>
                    <form className='modal_transaction-window' onSubmit={(e) => e.preventDefault()}>
                        <span onClick={() => setTransactionModal(false)} className='modal_transaction-close'>х</span>
                        <div className='modal_input-container'>
                            <label className='modal_input-cash modal_input-title' htmlFor='cashInput'>
                                <p className='modal_title'>Cash</p>
                                <input
                                    name='cashInput'
                                    id='cashInput'
                                    value={cash}
                                    onChange={(e) => setCash(e.target.value)}
                                    className='modal_input'
                                    type="number"
                                    placeholder='amount to transfer'
                                />
                            </label>
                            <label className='modal_input-phone modal_input-title' htmlFor='cardInput'>
                                <p className='modal_title'>Card number</p>
                                <input
                                    name='phoneInput'
                                    id='cardInput'
                                    pattern="[0-9]*"
                                    value={cardNumber}
                                    onChange={handleCardNumber}
                                    className='modal_input'
                                    type="text"
                                    placeholder='xxxx xxxx xxxx xxxx'
                                />
                            </label>
                            <button className='modal_transaction-submit' onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>}

        </div>
    )
}

export default ModalTransaction