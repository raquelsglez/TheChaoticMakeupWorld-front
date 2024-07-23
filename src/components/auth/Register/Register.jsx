import styles from './Register.module.css';
import { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [valueUsername , setValueUsername ] = useState('');
    const [valueFirstName , setValueFirstName ] = useState('');
    const [valueLastName , setValueLastName ] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(
            valueUsername === '' ||
            valueFirstName === '' || 
            valueLastName === '' || 
            valueEmail === '' || 
            valuePassword === ''
        ){
            setError('All fields are required');
            return;
        }

        try{
            const response = await axios.post(
                'http://localhost:3000/api/auth/register',
                {
                    username: valueUsername,
                    first_name: valueFirstName,
                    last_name: valueLastName,
                    email: valueEmail,
                    password: valuePassword
                }
            );
            setError('');
            setConfirmation('You have registered successfully')

        } catch (err){
            setError(err.response.data.message);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.registerForm}>
            <h1>Register</h1>
            <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setValueUsername(e.target.value)} value={valueUsername}/>
            <input type="text" id="firstName" name="firstName" placeholder="first name" onChange={(e) => setValueFirstName(e.target.value)} value={valueFirstName}/>
            <input type="text" id="lastName" name="lastName" placeholder="last name" onChange={(e) => setValueLastName(e.target.value)} value={valueLastName}/>
            <input type="email" id="email" name="email" placeholder="youremail@gmail.com" onChange={(e) => setValueEmail(e.target.value)} value={valueEmail}/>
            <input type="password" id="pwd" name="pwd" placeholder="password" onChange={(e) => setValuePassword(e.target.value)} value={valuePassword}/>
            <button type="submit">Register</button>
            <span className={styles.confirmation}>{confirmation}</span>
            <span className={styles.error}>{error}</span>
        </form>

    )
};

export default Register;
