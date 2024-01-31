import React, { useEffect, useState } from 'react';
import seccess from '../../img/svg/seccess-ico.png'
import { useSelector } from 'react-redux';

import './ModalSeccessful.css'
const ModalSeccessful = ({ closeModal }) => {

    const [modalStatus, setModalStatus] = useState('pending');

    const status = useSelector(state => state.transaction.status)

    useEffect(() => {
        setModalStatus(status)
    }, [status])

    return (
        <div className='modal-container'>
            {modalStatus === 'pending' ?
                <div className='pending-container'>
                </div>
                :
                <div className='seccessful-container'>
                    <span className='close' onClick={closeModal}>x</span>
                    <img className='seccessful-ico' src={seccess} alt='seccessful'></img>
                    <figcaption className='seccessful-info'>You transaction was seccesful!</figcaption>
                </div>}

        </div>
    );
};

export default ModalSeccessful;