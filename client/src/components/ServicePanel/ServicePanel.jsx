import Modal from '../Modal/Modal';
import ModalCommunal from '../ModalCommunal/ModalCommunal';
import ModalTransaction from '../ModalTransaction/ModalTransaction';

import './ServicePanel.css'

import { useState } from 'react';

const ServicePanel = () => {

    let [showModal, setShowModal] = useState(false);
    const [modalCard, setModalCard] = useState(false);
    const toggleModal = () => {
        setShowModal(showModal = !showModal)
    }

    const openModalTransaction = () => {
        setModalCard(!modalCard)
    }

    return (
        <div>
            <div className="service-panel">
                <span className="transfer-card transfer"  onClick={openModalTransaction}>
                    <span className="transfer-card-icon">
                    </span>
                </span>
                <span className="transfer-phone transfer">
                    <span className="transfer-phone-icon">
                    </span>
                </span>
                <span onClick={toggleModal} className="transfer-other transfer">
                    <span className="transfer-other-icon">
                    </span>
                </span>
            </div>
            {modalCard ? <ModalTransaction setModalCard={setModalCard} /> : null}
            {/* {communalModal ? <ModalCommunal setCommunalModal={setCommunalModal} /> : null} */}
            {showModal ? <Modal setShowModal = {setShowModal}/> : null}
        </div>
    )
}

export default ServicePanel;
