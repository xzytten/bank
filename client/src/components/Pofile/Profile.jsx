import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMe } from '../../redux/authSlice';

import Card from '../Card/Card';
import History from '../History/History';
import Progres from '../Progres/Progres';

import './Profile.css';

const Profile = () => {

    const dispatch = useDispatch();
    const [profileStatus, setProfileStatus] = useState('pending')

    const status = useSelector(state => state.auth.status)

    useEffect(() => {
        setProfileStatus(status)
        console.log('profile')
    }, [status])

    useEffect(() => {
        dispatch(getMe());      
    }, [dispatch]);

    return (
        <div>
            {
                profileStatus === 'pending' ?
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
