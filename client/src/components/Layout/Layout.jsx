import React from 'react';
import Header from '../Header/Header';

const Layout = ({ children, showProfile }) => {

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