import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, login } from '../../redux/authSlice';
import { useFormik } from 'formik'
import * as Yup from 'yup';

import './Login.css';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {}, // Set defaultValues to an empty object
    });
    const isAuth = useSelector(checkIsAuth);
    const { message } = useSelector(state => state.auth);

    const [isChanged, setIsChanged] = useState(true)
    const [statusAuth, setStatusAuth] = useState(null)
    const { loginMessage } = useSelector(state => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch();


    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
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
            dispatch(login(data));
            setSubmitting(false)
        }
    })

    useEffect(() => {
        if (loginMessage) {
            setIsChanged(false)
            setStatusAuth(loginMessage)
        }
        if (isAuth) navigate('/')
    }, [isAuth, loginMessage, navigate])

    const handleInputChange = (e) => {
        formik.handleChange(e);
        setStatusAuth(null);
        setIsChanged(true)
    };

    return (
        <div className='conntainer-login'>
            <div className='form_container-login'>
                <h2 className='title_login'>Sign in</h2>
                {
                    statusAuth && (
                        <div className='errorMessage'>
                            {statusAuth}
                        </div>
                    )
                }
                <form className='form_login' onSubmit={formik.handleSubmit}>
                    <input
                        id="username"
                        name='username'
                        placeholder='Login'
                        type="text"
                        className={`input input_login ${!isChanged ? 'inputError' : ''}`}
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
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        className={`input input_pass ${!isChanged ? 'inputError' : ''}`}
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {
                        formik.touched.password && formik.errors.username ? (
                            <div className='error'>{formik.errors.password}</div>
                        ) : null
                    }
                    <button type='submit' className='form_btn'>Submit</button>
                </form>
                <Link to={"/register"} className='form_sign-in'>Register</Link>
            </div>            
        </div>
    );
};

export default Login;
