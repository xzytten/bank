import { useSelector } from 'react-redux';
import { selectCard } from '../../redux/authSlice';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import './Card.css';

const Card = () => {
    const [cash, setCash] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const card = useSelector(selectCard)
    const cashCard = useSelector(state => state.transaction.cash);

    const handleCopyClick = (e, element) => {
        e.stopPropagation();
        navigator.clipboard.writeText(element)
      };

    useEffect(() => {
        if (card) {
            if (!cashCard) {
                setCash(card.cash);
            } else {
                setCash(cashCard);
            }

            setCardNumber(card.number);
            const date = `${card.expirationDate.slice(0, 4)}/${card.expirationDate.slice(5, 7)}`
            setExpirationDate(date);
            setCVV(card.cvv)
        }
    }, [cashCard, card]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const animatedCash = useSpring({ value: cash });

    return (
        <div className={`profile__card-info left-bar ${isFlipped ? 'flipped' : ''}`}>
            <div className={`front`} >
                <div className={`user__card`} onClick={handleCardClick}>
                    <div className='card__bank'>
                        <h4 className='card__bank-name'>SIMPLE bank</h4>
                        <span className='card__bank-name-ico'></span>
                    </div>
                    <p className='card__number'>
                        <span id="cardNumber" onClick={(e) => handleCopyClick(e, cardNumber)}>{cardNumber}</span>
                    </p>
                    <p className='card__data'>
                        <span id="expiration-date" onClick={(e) => handleCopyClick(e, expirationDate)}>{expirationDate}</span>
                    </p>
                    <p className='master__card-logo'></p>
                </div>
            </div>
            <div className='back'>
                <div className='user__card' onClick={handleCardClick}>
                    <div className='card__bank'>
                        <h4 className='card__bank-name'>SIMPLE bank</h4>
                        <p className='card_cvv' onClick={(e) => handleCopyClick(e, cvv)}>{cvv}</p>
                        <span className='card__bank-name-ico'></span>
                    </div>
                    <p className='master__card-logo'></p>
                </div>
            </div>
            <div className='card__balance'>
                <p>BALANCE</p>
                <div className='card__cash'>
                <animated.span>{animatedCash.value.interpolate((val) => Math.floor(val))}</animated.span> $</div>
            </div>
        </div>
    )
}

export default Card;
