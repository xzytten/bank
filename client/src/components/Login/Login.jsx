import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, login } from '../../redux/authSlice';
import { useForm } from 'react-hook-form';

import './Login.css';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {}, // Set defaultValues to an empty object
    });
    const isAuth = useSelector(checkIsAuth);
    const { message } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (formData, e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData();
        data.append('username', formData.username);
        data.append('password', formData.password);

        try {
            dispatch(login(data));
            reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth, message, navigate]);

    return (
        <div className='conntainer-login'>
            <div className='form_container-login'>
                <h2 className='title_login'>Sign in</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='form_login'>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        placeholder='Login'
                        type="text"
                        className="input input_login"
                    />
                    {errors.username && <p className="error-message-name">{errors.username.message}</p>}
                    {message && <p className="error-message-name">{message?.name}</p>}
                    <input
                        {...register('password', { required: 'Password is required' })}
                        placeholder='Password'
                        type="password"
                        className="input input_pass"
                    />
                    {errors.password && <p className="error-message-pass">{errors.password.message}</p>}
                    {message && <p className="error-message-pass">{message?.pass}</p>}
                    <button type="button" className='form_btn' disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <Link to={"/register"} className='form_sign-in'>Register</Link>
            </div>            
        </div>
    );
};

export default Login;
