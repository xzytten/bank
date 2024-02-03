import React from 'react';


const Arrived = ({ card, sum }) => {

    const formatCreditCardNumber = (creditCardNumber) => {
        const creditCardString = creditCardNumber.toString();

        const cleanedNumber = creditCardString.replace(/\D/g, '');

        const parts = [];
        for (let i = 0; i < cleanedNumber.length; i += 4) {
            parts.push(cleanedNumber.slice(i, i + 4));
        }

        for (let i = 1; i < parts.length - 1; i++) {
            parts[i] = '*'.repeat(parts[i].length);
        }

        return parts.join(' ');
    };
    return (
        <div className='arrived_money'>
            <p className='arived-logo tranfer-history'>
                <span className='arived-logo-ico transfer-history-ico'></span>
            </p>
            <div className='data__transaction'>
                <span className='data'>{formatCreditCardNumber(card)}</span>
            </div>
            <div className='arived__amount'>
                <span className='spent__amount-sum'> {sum}$</span>
            </div>
        </div>
    );
};

export default Arrived;