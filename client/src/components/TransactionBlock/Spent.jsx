import React from 'react';

const Spent = ({ sum, newUser, user }) => {
    return (
        <div className='spent_money' >
            <p className='spent-logo tranfer-history'>
                <span className='spent-logo-ico transfer-history-ico'></span>
            </p>
            <div className='data__transaction'>
                <img className="trnsaction_user_img" src={`http://localhost:3003/${user?.img || newUser?.img}`} alt="" />
                <span className='trnsaction_user_name'>{user?.username || newUser?.username}</span>
            </div>
            <div className='spent__amount'>
                <span className='spent__amount-sum'>-{sum} $</span>
            </div>
        </div>
    );
};

export default Spent;