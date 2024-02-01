import React from 'react';


const Arrived = ({date, sum}) => {
    return (
        <div className='arrived_money'>
            <p className='arived-logo tranfer-history'>
                <span className='arived-logo-ico transfer-history-ico'></span>
            </p>
            <div className='data__transaction'>
                <p className='data-logo'></p>
                <span className='data'>{date}</span>
            </div>
            <div className='arived__amount'>
                <span className='spent__amount-sum'> {sum}$</span>
            </div>
        </div>
    );
};

export default Arrived;