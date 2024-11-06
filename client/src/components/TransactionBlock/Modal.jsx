import React from 'react';
import { useEffect, useState } from 'react';
import { getUser } from '../../redux/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalTransaction from '../ModalTransaction/ModalTransaction';

import './Modal.css'

const Modal = ({ transaction, setTransactionModal }) => {
    const [modalStatus, setModalStatus] = useState('pending');

    const [modalRepeat, setModalRepeat] = useState(false);

    const { card, user, status } = useSelector(state => state.transaction);
    const { username, img } = useSelector(state => state.auth.user);
    const mainCard = useSelector(state => state.auth.card.number);
    const dispatch = useDispatch();

    const formatDate = (inputDate) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formattedDateTime = new Date(inputDate).toLocaleString('en-US', options);

        return formattedDateTime;
    };

    const repeatTransaction = () => {
        setModalRepeat(true)
        modalRepeat && setTransactionModal(false);
    }

    useEffect(() => {
        if (transaction.typeTransaction === 'recipient') {
            dispatch(getUser({ cardId: transaction.trans.idSender }));
        } else {
            dispatch(getUser({ cardId: transaction.trans.idRecipient }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction]);

    useEffect(() => {
        setModalStatus(status)
    }, [status])

    const formatCreditCardNumber = (creditCardNumber) => {
        const creditCardString = creditCardNumber.toString();

        const cleanedNumber = creditCardString.replace(/\D/g, '');

        const parts = [];
        for (let i = 0; i < cleanedNumber.length; i += 4) {
            parts.push(cleanedNumber.slice(i, i + 4));
        }

        return parts.join(' ');
    };


    return (
        <div className='modal_container'>
            {
                modalRepeat
                    ?
                    <ModalTransaction sumRepeat={transaction.trans.sum} cardRepeat={card} setModalCard={setModalRepeat} />
                    :
                    modalStatus === 'pending'
                        ?
                        <div className='pending-modal-container'></div>
                        :
                        <div className='modal'>
                            <div className='modal-element'>
                                <span className='close_modal' onClick={() => setTransactionModal(false)}></span>
                                <div className='user_profile profile_info'>
                                    <img className={`profile_img user_img ${transaction.typeTransaction === 'recipient' ? 'sender' : "recipient"}`} src={`http://localhost:3003/${img}`} alt="" />
                                    <figcaption className='profile_name'>{username}</figcaption>
                                    <span className='user_card'>{formatCreditCardNumber(mainCard)}</span>
                                </div>
                                <div className='container_info'>
                                    {transaction.typeTransaction === 'recipient'
                                        ?
                                        <div className='sum-info recipient-sum'>+  {transaction.trans.sum}</div>
                                        :
                                        <div className='sum-info sender-sum'>-  {transaction.trans.sum}</div>}
                                </div>
                                <div className='guest_profile profile_info'>
                                    {user && (
                                        <>
                                            <img className={`profile_img guest_img ${transaction.typeTransaction === 'recipient' ? 'recipient' : "sender"}`} src={`http://localhost:3003/${user.img || ''}`} alt="" />
                                            <figcaption className='profile_name'>{user.username}</figcaption>
                                            <span className='user_card'>{formatCreditCardNumber(card)}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='modal_info'>
                                <p className='date'>{formatDate(transaction.trans.date)}</p>
                                {
                                    transaction.typeTransaction !== 'recipient' &&
                                    <div className='button_info' onClick={repeatTransaction}>
                                        <button className='button'></button>
                                        <p>Repeat</p>
                                    </div>
                                }
                            </div>
                        </div>
            }
        </div>
    );
};

export default Modal;