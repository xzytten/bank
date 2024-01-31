import Modal from '../Modal/Modal';
import ModalCommunal from '../ModalCommunal/ModalCommunal';
import ModalTransaction from '../ModalTransaction/ModalTransaction';

import './ServicePanel.css'

import { useState } from 'react';

const ServicePanel = () => {

    let [showModal, setShowModal] = useState(false);
    let [transactionModal, setTransactionModal] = useState(false);

    const toggleModal = () => {
        setShowModal(showModal = !showModal)
    }

    const openModalTransaction = () => {
        setTransactionModal(transactionModal = !transactionModal)
    }

    return (
        <div>
            <div className="service-panel">
                <span className="transfer-card transfer">
                    <span onClick={openModalTransaction} className="transfer-card-icon">
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
            {transactionModal ? <ModalTransaction setTransactionModal={setTransactionModal} /> : null}
            {/* {communalModal ? <ModalCommunal setCommunalModal={setCommunalModal} /> : null} */}
            {showModal ? <Modal setShowModal = {setShowModal}/> : null}
        </div>
    )
}

export default ServicePanel;
