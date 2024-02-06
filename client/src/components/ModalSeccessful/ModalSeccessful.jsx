import React, { useEffect, useState } from 'react';
import seccess from '../../img/svg/seccess-ico.png'
import error from '../../img/svg/error_r.png'
import { useSelector } from 'react-redux';

import './ModalSeccessful.css'

const ModalSeccessful = ({ closeModal }) => {

    const [modalStatus, setModalStatus] = useState('pending');

    const { transactionStatus, message, status } = useSelector(state => state.transaction)

    useEffect(() => {
        setModalStatus(status)
    }, [status])

    return (
        <div className='modal-container'>
            {modalStatus === 'pending' ?
                <div className='pending-container'>
                </div>
                :
                <div>
                    {
                        transactionStatus !== 'error'
                            ?
                            <div className='seccessful-container'>
                                <span className='close' onClick={closeModal}></span>
                                <img className='seccessful-ico' src={seccess} alt='seccessful'></img>
                                <figcaption className='seccessful-info'>You transaction was seccesful!</figcaption>
                            </div>
                            :
                            <div className='seccessful-container'>
                                <span className='close' onClick={closeModal}></span>
                                <img className='seccessful-ico' src={error} alt='seccessful'></img>
                                <figcaption className='seccessful-info'>Error transaction!</figcaption>
                                <p className='error_meassage'>{message}</p>
                            </div>
                    }
                </div>
            }
        </div >
    );
};

export default ModalSeccessful;