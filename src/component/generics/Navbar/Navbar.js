// import React, { useState } from 'react';
// import styles from "../../generics/Navbar/Navbar.module.css";
// import { Link, useNavigate } from 'react-router-dom';
// import LogoImage from '../../../assets/images/logo.png';
// // import HomePage from '../../pages/HomePage/Home';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem('USER_SESSION');
//     navigate('/');
//   };

//   return (
//     <div className={styles.navbar}>
//       <div className={styles.logoContainer}>
//         <img src={LogoImage} alt='application-logo' className={styles.logoImage} /> 
//       </div>
//       <div className={styles.navbarLinksContainer}>
//         <Link to={'/home'} className={styles.navbarLink}>Home</Link>
//         <Link to={'/table'} className={styles.navbarLink}>Table</Link>
//         <Link to={'/about'} className={styles.navbarLink}>About</Link>
//         <Link to={'/profile'} className={styles.navbarLink}>Profile</Link>
//       </div>
//       <div className={styles.userProfileContainer}>
//         <div className={`dropdown ${styles.dropdown}`}>
//           <button
//             className={`btn btn-primary ${styles.dropdownToggle}`}
//             type="button"
//             data-toggle="dropdown"
//             onClick={toggleDropdown}
//           >
//             <img src={LogoImage} alt='user-profile' className={styles.userProfileImage} /> 
//           </button>
//           {isOpen && (
//             <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//               <li>
//                 <button className={`dropdown-item ${styles.dropdownItem}`} onClick={handleSignOut}>
//                   Sign out
//                 </button>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//       {/* <HomePage />  */}
//     </div>
//   );
// };

// export default Navbar;












import React, { useState } from 'react';
import styles from "../../generics/Navbar/Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../../../assets/images/logo.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('USER_SESSION');
    navigate('/');
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const avatars = [
    // stringAvatar('Awani Panwar'),
    stringAvatar('Awani Panwar'),
    // stringAvatar('Tim Neutkens')
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={LogoImage} alt='application-logo' className={styles.logoImage} /> 
      </div>
      <div className={styles.navbarLinksContainer}>
        <Link to={'/home'} className={styles.navbarLink}>Home</Link>
        <Link to={'/table'} className={styles.navbarLink}>Table</Link>
        <Link to={'/about'} className={styles.navbarLink}>About</Link>
        <Link to={'/profile'} className={styles.navbarLink}>Profile</Link>
        <Link to={'/quotes'} className={styles.navbarLink}>Quotes</Link>
      </div>
      <div className={styles.userProfileContainer}>
        <div className={`dropdown ${styles.dropdown}`}>
          <button
            className={`btn btn-primary ${styles.dropdownToggle}`}
            type="button"
            data-toggle="dropdown"
            onClick={toggleDropdown}
          >
            <Stack direction="row" spacing={2}>
              {avatars.map((avatar, index) => (
                <Avatar key={index} {...avatar} />
              ))}
            </Stack>
          </button>
          {isOpen && (
            <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
              <li>
                <button className={`dropdown-item ${styles.dropdownItem}`} onClick={handleSignOut}>
                  Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

