import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkIsAuth, getMe } from '../../redux/authSlice';

import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Profile from '../Pofile/Profile';
import Registration from '../Registration/Registration';
import spiner from '../../img/svg/spiner.svg';

import './MainPage.css';

const MainPage = () => {
    const [pageStatus, setPageStatus] = useState('pending');

    const dispatch = useDispatch();
    
    const isAuth = useSelector(checkIsAuth);
    const status = useSelector(state => state.auth.status);
<<<<<<< HEAD
    
=======

>>>>>>> origin/main
    useEffect(() => {
        if (!isAuth) {
            if (!status) {
                dispatch(getMe());
            } else {
                setPageStatus(status);
            }
        } else {
            setPageStatus('')
        }

    }, [dispatch, isAuth, status]);

    return (
        <Router>
            <Layout className='layout'>
                {pageStatus === 'pending' ? (
                    <img alt='spinner' className="spinner" src={spiner} />
                ) : (
                    <Routes>
                        {isAuth ? <Route path="/" element={<Profile />} /> : <Route path="/" element={<Login />} />}
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                )}
            </Layout>
        </Router>
    );
}

export default MainPage;
