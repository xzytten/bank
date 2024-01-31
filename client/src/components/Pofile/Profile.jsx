import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMe } from '../../redux/authSlice';
import io from 'socket.io-client';

import Card from '../Card/Card';
import History from '../History/History';
import Progres from '../Progres/Progres';

import './Profile.css';

const socket = io('http://localhost:3003');

const Profile = () => {
    const dispatch = useDispatch();
    const [profileStatus, setProfileStatus] = useState('pending')

    // const user = useSelector(state => state.auth.user._id)
    const status = useSelector(state => state.auth.status)
    socket.on('message', (data) => {
        // console.log('Получено повідомлення від сервера:', data);
        // Тут ви можете обробити дані, які ви відправляєте з сервера до клієнта
    });

    useEffect(() => {
        setProfileStatus(status)
        console.log('profile')
    }, [status])

    // useEffect(() => {
    //     console.log(1);
    //     // socket.emit('getTransactions', '65b1436dcb934637a8b5e037'); // userId - ідентифікатор поточного користувача
    //     // Ви використовуєте один useEffect для обох операцій
    //     socket.emit('join', { name: 'Maks' });

    //     const messageHandler = (data) => {
    //         console.log(data.message); // Очікується 'hello Maks'
    //     };

    //     socket.on('message', messageHandler);

    //     // Cleanup-функція для відключення подій при виході компонента
    //     return () => {
    //         socket.off('message', messageHandler);
    //     };
    // }, [dispatch]); // Додайте dispatch до залежностей

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <div>
            {
                status === 'pending' ?
                    <div className='profile__container'>
                        <div className='profile__card-info left-bar '>
                            <div className='wave-container wave'></div>
                        </div>
                        <div className='profile_cards-history left-bar  '>
                            <div className='wave-container wave'></div>
                        </div>
                        <div className='profile__right-bar right-bar'>
                            <div className='wave-container wave'></div>
                        </div>
                    </div>
                    :
                    <div className='profile__container'>
                        <div className='profile__card-info left-bar'>
                            <Card />
                        </div>
                        <div className='profile_cards-history left-bar'>
                            <History />
                        </div>
                        <div className='profile__right-bar right-bar'>
                            <Progres />
                        </div>
                    </div>
            }

        </div>
    );
};

export default Profile;
