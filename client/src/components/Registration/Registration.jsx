import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { registerUser, checkIsAuth } from '../../redux/authSlice';

import './Registration.css'

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');

    const isAuth = useSelector(checkIsAuth)
    const { status } = useSelector(state => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("img", img);
        dispatch(registerUser(data))
    }

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, status, navigate])

    return (
        <div className='container-reg'>
            <div className='form_container-reg'>
                <h2 className='title_reg'>Register</h2>
                <form action="" className='form_reg' onSubmit={e => e.preventDefault()}>
                    <div className='inputs-reg-container'>
                        <input
                            name='input-reg'
                            placeholder='Login'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-reg input-reg_login"
                        />

                        <input
                            name='input-pass'
                            placeholder='Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-reg input-reg_pass"
                        />
                        <button className='form-reg_btn' onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className='image-container'>
                        {img
                            ?
                            <img src={URL.createObjectURL(img)} alt='img' className='profile-img' />
                            :
                            <img src={`http://localhost:3003/user.jpg`} alt='madara' className='profile-img' />
                        }
                        <div className='input-file-img'>
                            <label htmlFor='profileImg' className='label-input_img'>Add photo</label>
                            <input
                                type='file'
                                id='profileImg'
                                className='input-img'
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                    </div>

                </form>
                <Link to={"/login"} className='form_registr'>Sign in</Link>
            </div>
        </div>
    );
}

export default Registration;