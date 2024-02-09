import React from 'react';


const Arrived = ({ sum, user }) => {
    return (
        <div className='arrived_money'>
            <p className='arived-logo tranfer-history'>
                <span className='arived-logo-ico transfer-history-ico'></span>
            </p>
            <div className='data__transaction'>
                <img className="trnsaction_user_img" src={`http://localhost:3003/${user.img}`} alt="" />
                <span className='trnsaction_user_name'>{user.username}</span>
            </div>
            <div className='arived__amount'>
                <span className='spent__amount-sum'> {sum}$</span>
            </div>
        </div>
    );
};

export default Arrived;