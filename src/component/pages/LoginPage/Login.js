import React, { useState } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import users from "../../../constants/UserData";
import { useNavigate, Navigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [firstName, setFirstname] = useState(''); 
  // const [lastName, setLastname] = useState(''); 
  // const [email, setEmail] = useState(''); 
  // const [registrationNumber, setRegistrationNumber] = useState(''); // Added registration number state
  const [error, setError] = useState('');
  const userSession = localStorage.getItem('USER_SESSION');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleFirstnameChange = (event) => {
  //   setFirstname(event.target.value);
  // };

  // const handleLastnameChange = (event) => {
  //   setLastname(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleRegistrationNumberChange = (event) => {
  //   setRegistrationNumber(event.target.value);
  // };

  const handleLogin = (event) => {
    event.preventDefault();
  
    // if (!username || !password || !firstName || !lastName || !email) {
    //   setError('Please fill in all the fields');
    //   return;
    // }
  
    const user = users.find((user) => user.username === username);
  
    if (!user && user.password !== password) {
      setError('Invalid username or password');
      return;
    }
  
    localStorage.setItem('USER_SESSION', JSON.stringify(user));

    navigate('/todo');
    console.log('Login successful');
  };
 
  if(userSession){

     return <Navigate to={'/todo'} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.socialIcons}>
        <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
        <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        {/* <input type="text" className={styles.input} placeholder="First Name" value={firstName} onChange={handleFirstnameChange} /> */}
        {/* <input type="text" className={styles.input} placeholder="Last Name" value={lastName} onChange={handleLastnameChange} /> */}
        <input type="text" className={styles.input} placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" className={styles.input} placeholder="Password" value={password} onChange={handlePasswordChange} />
        {/* <input type="email" className={styles.input} placeholder="Email" value={email} onChange={handleEmailChange} /> Added Email input */}
        {/* <input type="text" className={styles.input} placeholder="Registration Number" value={registrationNumber} onChange={handleRegistrationNumberChange} /> Added Registration Number input */}
        <button className={styles.button} type="submit">Login</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default LoginPage;
