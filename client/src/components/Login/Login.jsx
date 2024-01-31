
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, login } from '../../redux/authSlice';

import './Login.css'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector(checkIsAuth)
    const { status } = useSelector(state => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        dispatch(login(data))
    }

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, status, navigate])

    return (
        <div>
            <div className='form_container-login'>
                <h2 className='title_login'>Sign in</h2>
                <form action="" className='form_login' onSubmit={(e) => e.preventDefault()}>
                    <input
                        name='input-login'
                        placeholder='Login'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" className="input input_login"
                    />
                    <input
                        name='input-pass'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" className="input input_pass"
                    />
                    <button onClick={handleSubmit} className='form_btn'>Submit</button>
                </form>
                <Link to={"/register"} className='form_sign-in'>Register</Link>
            </div>
        </div>
    );
}

export default Login;