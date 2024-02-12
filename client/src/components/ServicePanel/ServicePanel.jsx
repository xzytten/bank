import ModalTransaction from '../ModalTransaction/ModalTransaction';

import './ServicePanel.css'

import { useState } from 'react';

const ServicePanel = () => {

    const [modalCard, setModalCard] = useState(false);

    const openModalTransaction = () => {
        setModalCard(!modalCard)
    }

    return (
        <div>
            <div className="service-panel">
                <span className="transfer-card transfer" onClick={openModalTransaction}>
                    <span className="transfer-card-icon">
                    </span>
                </span>
            </div>
            {modalCard ? <ModalTransaction setModalCard={setModalCard} /> : null}
        </div>
    )
}

export default ServicePanel;
