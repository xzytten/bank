import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cardTransaction } from '../../redux/transactionSlice'
import { selectCard } from '../../redux/authSlice'

import ModalSeccessful from '../ModalSeccessful/ModalSeccessful';

import './ModalTransaction.css'

const ModalTransaction = ({ setModalCard, sumRepeat = '', cardRepeat = '' }) => {

    const [cardNumber, setCardNumber] = useState(cardRepeat);
    const [cash, setCash] = useState(sumRepeat);
    const [modalSeccessful, setModalSeccessful] = useState(null)
    const [timeModalSesccess, setTimeModalSesccess] = useState(null);



    const sendCard = useSelector(selectCard)
    const dispatch = useDispatch();

    const toggleModalSeccessful = () => {
        setModalSeccessful(true);
        const timeoutId = setTimeout(() => {
            setModalCard(false);
            setModalSeccessful(false);
        }, 10000);

        // Зберігаємо ідентифікатор таймаута
        setTimeModalSesccess(timeoutId);
    }

    const closeModal = () => {
        if (timeModalSesccess) {
            clearTimeout(timeModalSesccess);
        }
        setModalCard(false);
        setModalSeccessful(false);
    }
    const handleSubmit = () => {
        const senderCardNumber = sendCard.number.replace(/\s/g, ''); // Видаляємо всі пробіли з номера карти відправника
        const recipientCardNumber = cardNumber.replace(/\s/g, ''); // Видаляємо всі пробіли з номера карти отримувача
        dispatch(cardTransaction({
            sender: +senderCardNumber,
            recipient: +recipientCardNumber,
            sum: +cash
        }));
        toggleModalSeccessful();
    }

    const handleCardNumber = (e) => {
        setCardNumber(e.target.value);
    }

    return (
        <div className='modal_container'>
            {
                modalSeccessful
                    ?
                    <ModalSeccessful closeModal={closeModal} />
                    :
                    <div className='modal_transaction-container'>
                        <form className='modal_transaction-window' onSubmit={(e) => e.preventDefault()}>
                            <span onClick={() => setModalCard(false)} className='modal_transaction-close'></span>
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
                                        name='cardInput'
                                        id='cardInput'
                                        pattern="[0-9]*"
                                        value={cardNumber}
                                        onChange={handleCardNumber}
                                        className='modal_input'
                                        type="text"
                                        placeholder='xxxx xxxx xxxx xxxx'
                                    />
                                </label>
                                <button className={`modal_transaction-submit ${cash <= 0 ? 'disabled' : ''}`} onClick={handleSubmit} disabled={cash <= 0 ? true : false}>Submit</button>

                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default ModalTransaction