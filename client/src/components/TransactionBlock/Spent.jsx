import React from 'react';

const Spent = ({date, sum}) => {
    return (
        <div className='spent_money' >
            <p className='spent-logo tranfer-history'>
                <span className='spent-logo-ico transfer-history-ico'></span>
            </p>
            <div className='data__transaction'>
                <p className='data-logo'></p>
                <span className='data'>{date}</span>
            </div>
            <div className='spent__amount'>
                <span className='spent__amount-sum'>-{sum} $</span>
            </div>
        </div>
    );
};

export default Spent;