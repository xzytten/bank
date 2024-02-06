import Modal from '../Modal/Modal';
import Diagram from '../Diagram/Diagram';
import ServicePanel from '../ServicePanel/ServicePanel';

import './Progres.css'

import { useState } from 'react';
const Progres = ( ) => {

    return (
        <div>
            <Diagram/>
            <ServicePanel />
        </div>
    )
}

export default Progres;