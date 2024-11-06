import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { registerUser, checkIsAuth } from '../../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './Registration.css'

const Registration = () => {

    const [statusAuth, setStatusAuth] = useState(null);
    const [isChanged, setIsChanged] = useState(true);

    const [img, setImg] = useState('');

    const isAuth = useSelector(checkIsAuth)
    const { registerMessage } = useSelector(state => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const data = new FormData();
            data.append("username", values.username);
            data.append("password", values.password);
            data.append("img", img);
            dispatch(registerUser(data));
        }
    })

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (username !== "" || password !== "") {
    //         const data = new FormData();
    //         data.append("username", username);
    //         data.append("password", password);
    //         data.append("img", img);
    //         dispatch(registerUser(data));
    //     }
    // }

    const handleInputChange = (e) => {
        formik.handleChange(e)
        setStatusAuth(null);
        setIsChanged(true)
    }

    useEffect(() => {
<<<<<<< HEAD
        if (registerMessage) {
            setIsChanged(false)
            setStatusAuth(registerMessage)
        }
=======
>>>>>>> origin/main
        if (isAuth) navigate('/')
    }, [isAuth, registerMessage, navigate])

    return (
        <div className='container-reg'>
            <div className='form_container-reg'>
                <h2 className='title_reg'>Register</h2>
<<<<<<< HEAD
                {
                    statusAuth && (
                        <div className='errorMessage'>
                            {statusAuth}
                        </div>
                    )
                }
                <form action="" className='form_reg_container' onSubmit={formik.handleSubmit}>
                    <div className='form_reg'>
                        <div className='inputs-reg-container'>
=======
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
>>>>>>> origin/main
                            <input
                                name='username'
                                placeholder='Login'
                                type="text"
                                className={`input-reg input-reg_login ${!isChanged ? 'inputError' : ''}`}
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                onChange={handleInputChange}
                            />
                            {
                                formik.touched.username && formik.errors.username ? (
                                    <div className='error'>{formik.errors.username}</div>
                                ) : null
                            }
                            <input
                                name='password'
                                placeholder='Password'
                                type="password"
                                className={`input-reg input-reg_pass ${!isChanged ? 'inputError' : ''}`}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={handleInputChange}
                            />
                            {
                                formik.touched.password && formik.errors.password ? (
                                    <div className='error'>{formik.errors.password}</div>
                                ) : null
                            }
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
                    </div>
                    <button type='submit' className='form-reg_btn'>Submit</button>

                </form>
                <Link to={"/login"} className='form_registr'>Sign in</Link>
            </div>
        </div>
    );
}

export default Registration;