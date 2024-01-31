import ModalCommunal from '../ModalCommunal/ModalCommunal';

import { useState } from 'react';

import './Modal.css';

const Modal = ({ setShowModal }) => {

    const [communalModal, setCommunalModal] = useState(false)

    const simbolButton = '>>'; 

    const openModalCommunal = () => {
        setCommunalModal(!communalModal)
    }
    
    return (
        <div>
            <div className="modal-container">
                <div className="modal-container-item">
                    <span onClick={() => setShowModal(false)} className="modal-container-close">x</span>
                    <div className="modal-service-panel">
                    <span className="modal-transfer-card modal-transfer">
                            <div className='modal-transfer-block-card modal-transfer-block '>
                                <span className="modal-transfer-card-icon  modal-transfer-icon" />
                            </div>
                            <p className="modal-transfer-content" >Replenish the card</p>
                            <button onClick={openModalCommunal} className="modal-transfer-button">{simbolButton}</button>
                        </span>

                        <span className="modal-transfer-phone modal-transfer">
                            <div className='modal-transfer-block-phone modal-transfer-block'>
                                <span className="modal-transfer-phone-icon  modal-transfer-icon" />
                            </div>
                            <p className="modal-transfer-content" > Replenish the phone</p>
                            <button onClick={openModalCommunal} className="modal-transfer-button">{simbolButton}</button>
                        </span>

                        <span className="modal-transfer-water modal-transfer">
                            <div className='modal-transfer-block-water modal-transfer-block'>
                                <span className="modal-transfer-water-icon  modal-transfer-icon" />
                            </div>
                            <p className="modal-transfer-content" > Replenish the card</p>
                            <button onClick={openModalCommunal} className="modal-transfer-button">{simbolButton}</button>
                        </span>
                    </div>

                </div>
            </div>
            {communalModal ? <ModalCommunal setCommunalModal={setCommunalModal} /> : null}
        </div>
    )
}

export default Modal