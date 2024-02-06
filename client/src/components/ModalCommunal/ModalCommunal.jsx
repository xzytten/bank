// import './ModalCommunal.css'

const ModalCommunal = ({setCommunalModal}) => {
    return (
        <div>
            <div className='modal_communal-container'>
                <div className='modal_communal-window'>
                    <span onClick={() => setCommunalModal(false)} className='modal_communal-close'>x</span>
                    <div className='modal_communal_input-container'>
                        <label className='modal_input-cash modal_input-title' htmlFor='yourAddress'>
                            <p className='modal_title'>Your address</p>
                            <input name='adressInput' id='yourAddress' className='modal_input' type="text" placeholder='street, house/apartment number' />
                        </label>
                        <label className='modal_input-cash modal_input-title' htmlFor='fullName'>
                            <p className='modal_title'>Your full name</p>
                            <input name='nameInput' id='fullName' className='modal_input' type="text" placeholder='amount to transfer' />
                        </label>
                        <label className='modal_input-phone modal_input-title' htmlFor='amountInput'>
                            <p className='modal_title'>Amount</p>
                            <input name='amountInput' id='amountInput' className='modal_input' type="text" placeholder='card number' />
                        </label>
                        <button className='modal_communal-submit'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCommunal;