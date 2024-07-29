import styles from './Login.module.css';
import { usePostContext } from "../../../context/PostContext";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {
    const { setUser } = usePostContext(); //utilizo el contexto de post para actualizar user
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault() //prevenir comportamiento por defecto del form

        if(valueEmail === '' || valuePassword === ''){
            setError('Both fields are required');
            return;
        }

        try{
            const response = await axios.post( //solicitud de inicio sesi
                'http://localhost:3000/api/auth/login',
                {
                    email: valueEmail,
                    password: valuePassword
                }
            );
            setError(''); //limpio mensaje de error
            setUser(response.data); //actualizo el user en el contexto
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/')

        } catch (err){
            setError(err.response.data.message); //muestro mensaje de error
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1>Log In</h1>
            <input type="email" id="email" name="email" placeholder="youremail@gmail.com" onChange={(e) => setValueEmail(e.target.value)} value={valueEmail}/>
            <input type="password" id="pwd" name="pwd" placeholder="password" onChange={(e) => setValuePassword(e.target.value)} value={valuePassword}/>
            <button type="submit">Login</button>
            <Link className={styles.linkRegister} to="/register">Register</Link>
            <span className={styles.error}>{error}</span>
        </form>

    )
};

export default Login;
