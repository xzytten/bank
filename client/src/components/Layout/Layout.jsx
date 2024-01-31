import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import Header from '../Header/Header';
import spiner from '../../img/svg/spiner.svg'

const Layout = ({ children, showProfile }) => {
    const [mainStatus, setMainStatus] = useState('pending');

    const status = useSelector(state => state.auth.state);
    console.log('LLLLLLLLLLLLLLLLL')
    useEffect(() => {
        if (status) {
            setMainStatus(status)
        }
    }, status)

    return (
        <React.Fragment>
            <div>
                <Header showProfile={showProfile} />
                {children && children}
            </div>
        </React.Fragment>
    );
};

export default Layout;