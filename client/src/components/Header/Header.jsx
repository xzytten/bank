import { checkIsAuth, logout, selectUser } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(checkIsAuth)
    // const navigate = useNavigate();
    const navigate = useNavigate();

    const user = useSelector(selectUser)

    const handleLogout = async () => {
        try {
            await dispatch(logout())
            window.localStorage.removeItem('token')
            console.log('logout')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!isAuth && window.location.pathname !== '/register') {
            // Якщо користувач не аутентифікований і не вже на сторінці реєстрації, перенаправте його на сторінку реєстрації
            navigate('/login', { replace: true });
        }
    }, [isAuth, navigate]);

    return (
        <div>
            <header className='header'>
                <header className='header__logo'>
                    <span className='header__logo-ico'></span>
                    <h1 className='header__logo-name'>SIMPLE bank</h1>
                </header>
                {isAuth
                    ?
                    <div className='you-profile'>

                        <img className='you-profile-photo' src={`http://localhost:3003/${user.img}`} alt=''></img>
                        <span className='you-profile-name'> {user.username}</span>
                        <Link className='you-pofile-exit' to={"/login"} onClick={handleLogout}></Link>
                    </div>
                    :
                    <div className='no-logged'>
                        <Link className='no-logged-login' to={"/login"}>Login</Link>
                        <Link className='no-logged-register' to={"register"}>Register</Link>
                    </div>
                }
            </header>
        </div>
    )
}

export default Header;