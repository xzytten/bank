import React from 'react';
import { useEffect, useState } from 'react';

import './Modal.css'
import { getUser } from '../../redux/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';

const Modal = ({ transaction, setTransactionModal }) => {
    const dispatch = useDispatch();

    const formatDate = (inputDate) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formattedDateTime = new Date(inputDate).toLocaleString('en-US', options);

        return formattedDateTime;
    };


    useEffect(() => {
        if (transaction.typeTransaction === 'recipient') {
            dispatch(getUser({ cardId: transaction.trans.idSender }));
        } else {
            dispatch(getUser({ cardId: transaction.trans.idRecipient }));
        }
    }, [transaction]);

    const { card, user } = useSelector(state => state.transaction);
    const { username, img } = useSelector(state => state.auth.user);

    const mainCard = useSelector(state => state.auth.card.number);

    return (
        <div className='modal_container'>
            <div className='modal'>
                <div className='close_modal' onClick={() => setTransactionModal(false)}>x</div>
                <div className='user_profile profile_info'>
                    <img className={`profile_img user_img ${transaction.typeTransaction === 'recipient' ? 'sender' : "recipient"}`} src={`http://localhost:3003/${img}`} alt="" />
                    <figcaption className='profile_name'>{username}</figcaption>
                    <span className='user_card'>{mainCard}</span>
                </div>
                <div className='container_info'>
                    {transaction.typeTransaction === 'recipient'
                        ?
                        <div className='sum-info recipient-sum'>+  {transaction.trans.sum}</div>
                        :
                        <div className='sum-info sender-sum'>-  {transaction.trans.sum}</div>}

                    <hr className='line'></hr>
                    <p className='date'>{formatDate(transaction.trans.date)}</p>
                </div>
                <div className='guest_profile profile_info'>
                    {user && (
                        <>
                            <img className={`profile_img guest_img ${transaction.typeTransaction === 'recipient' ? 'recipient' : "sender"}`} src={`http://localhost:3003/${user.img || ''}`} alt="" />
                            <figcaption className='profile_name'>{user.username}</figcaption>
                            <span className='user_card'>{card}</span>
                        </>
                    )}
                </div>
                <button className='button'></button>
            </div>
        </div>
    );
};

export default Modal;