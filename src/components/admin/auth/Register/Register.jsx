import styles from './Register.module.css';
import { useState } from "react";
import axios from 'axios';

const AdminRegister = () => {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        if( valueEmail === '' || valuePassword === ''){
            setError('All fields are required');
            return;
        }

        try{ //realizar solicitud de register
            await axios.post(
                'http://localhost:3000/api/admin/auth/register',
                {
                    email: valueEmail,
                    password: valuePassword
                }
            );
            setError('');
            setConfirmation('New administrator created successfully')
            setValueEmail('')
            setValuePassword('')

        } catch (err){
            setConfirmation('')
            setError(err.response.data.message);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.registerForm}>
            <h1>Create new administrator</h1>
            <input type="email" id="email" name="email" placeholder="youremail@gmail.com" onChange={(e) => setValueEmail(e.target.value)} value={valueEmail}/>
            <input type="password" id="pwd" name="pwd" placeholder="password" onChange={(e) => setValuePassword(e.target.value)} value={valuePassword}/>
            <button type="submit">Create Administrator</button>
            <span className={styles.confirmation}>{confirmation}</span>
            <span className={styles.error}>{error}</span>
        </form>

    )
};

export default AdminRegister;
