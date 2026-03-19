// src/components/Navbar.jsx - Updated with real-time Google/Microsoft/Apple OAuth, password strength indicator, enhanced OAuth styling, full countries/languages from backend
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, NavDropdown, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
//import { AiFillApple, AiFillFacebook } from 'react-icons/ai';
import { FaBriefcase, FaNewspaper, FaBlog, FaVideo, FaBookOpen, FaLifeRing, FaBoxOpen, FaRoad, FaUsers, FaUserCircle, FaPhone, FaMusic, FaMicrophoneAlt, FaShoppingCart } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsPeopleFill } from "react-icons/bs";
import Select from 'react-select';
import AIAgent from './AIAgent';
import './Navbar.css'; // Updated with OAuth styling + strength indicator
import { auth, db, googleProvider,  } from '../firebase'; //add later appleProvider, microsoftProvider
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  onAuthStateChanged, 
  updatePassword,
  //OAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FcAbout } from "react-icons/fc";

const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg';

const AppNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', country: null, language: null, password: '', confirmPassword: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [changePasswordForm, setChangePasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [countries] = useState([ /* 249 countries & territories - Alphabetically sorted by country name */
    { value: 'af', label: 'Afghanistan' }, { value: 'al', label: 'Albania' }, { value: 'dz', label: 'Algeria' }, { value: 'ad', label: 'Andorra' }, { value: 'ao', label: 'Angola' }, { value: 'ai', label: 'Anguilla' }, { value: 'aq', label: 'Antarctica' }, { value: 'ag', label: 'Antigua and Barbuda' }, { value: 'ar', label: 'Argentina' }, { value: 'am', label: 'Armenia' },
    { value: 'aw', label: 'Aruba' }, { value: 'au', label: 'Australia' }, { value: 'at', label: 'Austria' }, { value: 'az', label: 'Azerbaijan' }, { value: 'bs', label: 'Bahamas' }, { value: 'bh', label: 'Bahrain' }, { value: 'bd', label: 'Bangladesh' }, { value: 'bb', label: 'Barbados' }, { value: 'by', label: 'Belarus' }, { value: 'be', label: 'Belgium' },
    { value: 'bz', label: 'Belize' }, { value: 'bj', label: 'Benin' }, { value: 'bm', label: 'Bermuda' }, { value: 'bt', label: 'Bhutan' }, { value: 'bo', label: 'Bolivia' }, { value: 'ba', label: 'Bosnia and Herzegovina' }, { value: 'bw', label: 'Botswana' }, { value: 'bv', label: 'Bouvet Island' }, { value: 'br', label: 'Brazil' }, { value: 'bn', label: 'Brunei' },
    { value: 'bg', label: 'Bulgaria' }, { value: 'bf', label: 'Burkina Faso' }, { value: 'bi', label: 'Burundi' }, { value: 'kh', label: 'Cambodia' }, { value: 'cm', label: 'Cameroon' }, { value: 'ca', label: 'Canada' }, { value: 'cv', label: 'Cape Verde' }, { value: 'ky', label: 'Cayman Islands' }, { value: 'cf', label: 'Central African Republic' }, { value: 'td', label: 'Chad' },
    { value: 'cl', label: 'Chile' }, { value: 'cn', label: 'China' }, { value: 'cx', label: 'Christmas Island' }, { value: 'cc', label: 'Cocos Islands' }, { value: 'co', label: 'Colombia' }, { value: 'km', label: 'Comoros' }, { value: 'cg', label: 'Congo' }, { value: 'cd', label: 'Congo (DRC)' }, { value: 'ck', label: 'Cook Islands' }, { value: 'cr', label: 'Costa Rica' },
    { value: 'ci', label: 'Côte d\'Ivoire' }, { value: 'hr', label: 'Croatia' }, { value: 'cu', label: 'Cuba' }, { value: 'cy', label: 'Cyprus' }, { value: 'cz', label: 'Czech Republic' }, { value: 'dk', label: 'Denmark' }, { value: 'dj', label: 'Djibouti' }, { value: 'dm', label: 'Dominica' }, { value: 'do', label: 'Dominican Republic' }, { value: 'ec', label: 'Ecuador' },
    { value: 'eg', label: 'Egypt' }, { value: 'sv', label: 'El Salvador' }, { value: 'gq', label: 'Equatorial Guinea' }, { value: 'er', label: 'Eritrea' }, { value: 'ee', label: 'Estonia' }, { value: 'et', label: 'Ethiopia' }, { value: 'fk', label: 'Falkland Islands' }, { value: 'fo', label: 'Faroe Islands' }, { value: 'fj', label: 'Fiji' }, { value: 'fi', label: 'Finland' },
    { value: 'fr', label: 'France' }, { value: 'pf', label: 'French Polynesia' }, { value: 'tf', label: 'French Southern Territories' }, { value: 'ga', label: 'Gabon' }, { value: 'gm', label: 'Gambia' }, { value: 'ge', label: 'Georgia' }, { value: 'de', label: 'Germany' }, { value: 'gh', label: 'Ghana' }, { value: 'gi', label: 'Gibraltar' }, { value: 'gr', label: 'Greece' },
    { value: 'gl', label: 'Greenland' }, { value: 'gd', label: 'Grenada' }, { value: 'gg', label: 'Guernsey' }, { value: 'gt', label: 'Guatemala' }, { value: 'gu', label: 'Guam' }, { value: 'gn', label: 'Guinea' }, { value: 'gw', label: 'Guinea-Bissau' }, { value: 'gy', label: 'Guyana' }, { value: 'ht', label: 'Haiti' }, { value: 'hm', label: 'Heard Island and McDonald Islands' },
    { value: 'hn', label: 'Honduras' }, { value: 'hk', label: 'Hong Kong' }, { value: 'hu', label: 'Hungary' }, { value: 'is', label: 'Iceland' }, { value: 'in', label: 'India' }, { value: 'id', label: 'Indonesia' }, { value: 'ir', label: 'Iran' }, { value: 'iq', label: 'Iraq' }, { value: 'ie', label: 'Ireland' }, { value: 'im', label: 'Isle of Man' },
    { value: 'il', label: 'Israel' }, { value: 'it', label: 'Italy' }, { value: 'jm', label: 'Jamaica' }, { value: 'jp', label: 'Japan' }, { value: 'je', label: 'Jersey' }, { value: 'jo', label: 'Jordan' }, { value: 'kz', label: 'Kazakhstan' }, { value: 'ke', label: 'Kenya' }, { value: 'ki', label: 'Kiribati' }, { value: 'kp', label: 'North Korea' },
    { value: 'kr', label: 'South Korea' }, { value: 'kw', label: 'Kuwait' }, { value: 'kg', label: 'Kyrgyzstan' }, { value: 'la', label: 'Laos' }, { value: 'lv', label: 'Latvia' }, { value: 'lb', label: 'Lebanon' }, { value: 'ls', label: 'Lesotho' }, { value: 'lr', label: 'Liberia' }, { value: 'ly', label: 'Libya' }, { value: 'li', label: 'Liechtenstein' },
    { value: 'lt', label: 'Lithuania' }, { value: 'lu', label: 'Luxembourg' }, { value: 'mo', label: 'Macau' }, { value: 'mk', label: 'North Macedonia' }, { value: 'mg', label: 'Madagascar' }, { value: 'mw', label: 'Malawi' }, { value: 'my', label: 'Malaysia' }, { value: 'mv', label: 'Maldives' }, { value: 'ml', label: 'Mali' }, { value: 'mt', label: 'Malta' },
    { value: 'mh', label: 'Marshall Islands' }, { value: 'mq', label: 'Martinique' }, { value: 'mr', label: 'Mauritania' }, { value: 'mu', label: 'Mauritius' }, { value: 'yt', label: 'Mayotte' }, { value: 'mx', label: 'Mexico' }, { value: 'fm', label: 'Micronesia' }, { value: 'md', label: 'Moldova' }, { value: 'mc', label: 'Monaco' }, { value: 'mn', label: 'Mongolia' },
    { value: 'me', label: 'Montenegro' }, { value: 'ma', label: 'Morocco' }, { value: 'mz', label: 'Mozambique' }, { value: 'mm', label: 'Myanmar' }, { value: 'na', label: 'Namibia' }, { value: 'nr', label: 'Nauru' }, { value: 'np', label: 'Nepal' }, { value: 'nl', label: 'Netherlands' }, { value: 'nc', label: 'New Caledonia' }, { value: 'nz', label: 'New Zealand' },
    { value: 'ni', label: 'Nicaragua' }, { value: 'ne', label: 'Niger' }, { value: 'ng', label: 'Nigeria' }, { value: 'nu', label: 'Niue' }, { value: 'nf', label: 'Norfolk Island' }, { value: 'mp', label: 'Northern Mariana Islands' }, { value: 'no', label: 'Norway' }, { value: 'om', label: 'Oman' }, { value: 'pk', label: 'Pakistan' }, { value: 'pw', label: 'Palau' },
    { value: 'ps', label: 'Palestine' }, { value: 'pa', label: 'Panama' }, { value: 'pg', label: 'Papua New Guinea' }, { value: 'py', label: 'Paraguay' }, { value: 'pe', label: 'Peru' }, { value: 'ph', label: 'Philippines' }, { value: 'pn', label: 'Pitcairn Islands' }, { value: 'pl', label: 'Poland' }, { value: 'pt', label: 'Portugal' }, { value: 'qa', label: 'Qatar' },
    { value: 're', label: 'Réunion' }, { value: 'ro', label: 'Romania' }, { value: 'ru', label: 'Russia' }, { value: 'rw', label: 'Rwanda' }, { value: 'bl', label: 'Saint Barthélemy' }, { value: 'sh', label: 'Saint Helena' }, { value: 'kn', label: 'Saint Kitts and Nevis' }, { value: 'lc', label: 'Saint Lucia' }, { value: 'mf', label: 'Saint Martin' }, { value: 'pm', label: 'Saint Pierre and Miquelon' },
    { value: 'vc', label: 'Saint Vincent and the Grenadines' }, { value: 'ws', label: 'Samoa' }, { value: 'sm', label: 'San Marino' }, { value: 'st', label: 'São Tomé and Príncipe' }, { value: 'sa', label: 'Saudi Arabia' }, { value: 'sn', label: 'Senegal' }, { value: 'rs', label: 'Serbia' }, { value: 'sc', label: 'Seychelles' }, { value: 'sl', label: 'Sierra Leone' }, { value: 'sg', label: 'Singapore' },
    { value: 'sk', label: 'Slovakia' }, { value: 'si', label: 'Slovenia' }, { value: 'sb', label: 'Solomon Islands' }, { value: 'so', label: 'Somalia' }, { value: 'za', label: 'South Africa' }, { value: 'ss', label: 'South Sudan' }, { value: 'es', label: 'Spain' }, { value: 'lk', label: 'Sri Lanka' }, { value: 'sd', label: 'Sudan' }, { value: 'sr', label: 'Suriname' },
    { value: 'se', label: 'Sweden' }, { value: 'ch', label: 'Switzerland' }, { value: 'sy', label: 'Syria' }, { value: 'tw', label: 'Taiwan' }, { value: 'tj', label: 'Tajikistan' }, { value: 'tz', label: 'Tanzania' }, { value: 'th', label: 'Thailand' }, { value: 'tl', label: 'Timor-Leste' }, { value: 'tg', label: 'Togo' }, { value: 'tk', label: 'Tokelau' },
    { value: 'to', label: 'Tonga' }, { value: 'tt', label: 'Trinidad and Tobago' }, { value: 'tn', label: 'Tunisia' }, { value: 'tr', label: 'Turkey' }, { value: 'tm', label: 'Turkmenistan' }, { value: 'tc', label: 'Turks and Caicos Islands' }, { value: 'tv', label: 'Tuvalu' }, { value: 'ug', label: 'Uganda' }, { value: 'ua', label: 'Ukraine' }, { value: 'ae', label: 'United Arab Emirates' },
    { value: 'gb', label: 'United Kingdom' }, { value: 'us', label: 'United States' }, { value: 'um', label: 'United States Minor Outlying Islands' }, { value: 'uy', label: 'Uruguay' }, { value: 'uz', label: 'Uzbekistan' }, { value: 'vu', label: 'Vanuatu' }, { value: 'va', label: 'Vatican City' }, { value: 've', label: 'Venezuela' }, { value: 'vn', label: 'Vietnam' }, { value: 'vg', label: 'Virgin Islands (British)' },
    { value: 'vi', label: 'Virgin Islands (U.S.)' }, { value: 'wf', label: 'Wallis and Futuna' }, { value: 'eh', label: 'Western Sahara' }, { value: 'ye', label: 'Yemen' }, { value: 'zm', label: 'Zambia' }, { value: 'zw', label: 'Zimbabwe' }
  ]);
  const [languages] = useState([ /* 150+ languages - Alphabetically sorted by language name */
    { value: 'af', label: 'Afrikaans' }, { value: 'sq', label: 'Albanian' }, { value: 'am', label: 'Amharic' }, { value: 'ar', label: 'Arabic' }, { value: 'hy', label: 'Armenian' }, { value: 'as', label: 'Assamese' }, { value: 'az', label: 'Azerbaijani' }, { value: 'eu', label: 'Basque' }, { value: 'be', label: 'Belarusian' }, { value: 'bn', label: 'Bengali' },
    { value: 'bs', label: 'Bosnian' }, { value: 'br', label: 'Breton' }, { value: 'bg', label: 'Bulgarian' }, { value: 'my', label: 'Burmese' }, { value: 'ca', label: 'Catalan' }, { value: 'ny', label: 'Chichewa' }, { value: 'zh', label: 'Chinese (Mandarin)' }, { value: 'zh-hans', label: 'Chinese (Simplified)' }, { value: 'zh-hant', label: 'Chinese (Traditional)' }, { value: 'co', label: 'Corsican' },
    { value: 'hr', label: 'Croatian' }, { value: 'cs', label: 'Czech' }, { value: 'da', label: 'Danish' }, { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'en-gb', label: 'English (British)' }, { value: 'en-us', label: 'English (American)' }, { value: 'eo', label: 'Esperanto' }, { value: 'et', label: 'Estonian' }, { value: 'fo', label: 'Faroese' },
    { value: 'fi', label: 'Finnish' }, { value: 'fr', label: 'French' }, { value: 'fy', label: 'Frisian' }, { value: 'gl', label: 'Galician' }, { value: 'ka', label: 'Georgian' }, { value: 'de', label: 'German' }, { value: 'el', label: 'Greek' }, { value: 'gu', label: 'Gujarati' }, { value: 'ht', label: 'Haitian Creole' }, { value: 'ha', label: 'Hausa' },
    { value: 'he', label: 'Hebrew' }, { value: 'hi', label: 'Hindi' }, { value: 'hu', label: 'Hungarian' }, { value: 'is', label: 'Icelandic' }, { value: 'ig', label: 'Igbo' }, { value: 'id', label: 'Indonesian' }, { value: 'ga', label: 'Irish' }, { value: 'it', label: 'Italian' }, { value: 'ja', label: 'Japanese' }, { value: 'jv', label: 'Javanese' },
    { value: 'kk', label: 'Kazakh' }, { value: 'km', label: 'Khmer' }, { value: 'rw', label: 'Kinyarwanda' }, { value: 'ky', label: 'Kyrgyz' }, { value: 'lo', label: 'Lao' }, { value: 'la', label: 'Latin' }, { value: 'lv', label: 'Latvian' }, { value: 'lt', label: 'Lithuanian' }, { value: 'lb', label: 'Luxembourgish' }, { value: 'mk', label: 'Macedonian' },
    { value: 'mg', label: 'Malagasy' }, { value: 'ms', label: 'Malay' }, { value: 'ml', label: 'Malayalam' }, { value: 'mt', label: 'Maltese' }, { value: 'mi', label: 'Maori' }, { value: 'mr', label: 'Marathi' }, { value: 'mh', label: 'Marshallese' }, { value: 'mn', label: 'Mongolian' }, { value: 'ne', label: 'Nepali' }, { value: 'nb', label: 'Norwegian Bokmål' },
    { value: 'nn', label: 'Norwegian Nynorsk' }, { value: 'or', label: 'Odia (Oriya)' }, { value: 'om', label: 'Oromo' }, { value: 'ps', label: 'Pashto' }, { value: 'fa', label: 'Persian' }, { value: 'pi', label: 'Pali' }, { value: 'pl', label: 'Polish' }, { value: 'pt', label: 'Portuguese' }, { value: 'pt-br', label: 'Portuguese (Brazilian)' }, { value: 'pt-pt', label: 'Portuguese (European)' },
    { value: 'pa', label: 'Punjabi' }, { value: 'qu', label: 'Quechua' }, { value: 'ro', label: 'Romanian' }, { value: 'ru', label: 'Russian' }, { value: 'sa', label: 'Sanskrit' }, { value: 'sr', label: 'Serbian (Cyrillic)' }, { value: 'sr-latn', label: 'Serbian (Latin)' }, { value: 'sh', label: 'Serbo-Croatian' }, { value: 'sd', label: 'Sindhi' }, { value: 'si', label: 'Sinhala' },
    { value: 'sk', label: 'Slovak' }, { value: 'sl', label: 'Slovenian' }, { value: 'so', label: 'Somali' }, { value: 'es', label: 'Spanish' }, { value: 'es-mx', label: 'Spanish (Mexican)' }, { value: 'es-es', label: 'Spanish (Castilian)' }, { value: 'su', label: 'Sundanese' }, { value: 'sw', label: 'Swahili' }, { value: 'sv', label: 'Swedish' }, { value: 'tl', label: 'Tagalog' },
    { value: 'tg', label: 'Tajik' }, { value: 'ta', label: 'Tamil' }, { value: 'tt', label: 'Tatar' }, { value: 'te', label: 'Telugu' }, { value: 'th', label: 'Thai' }, { value: 'ti', label: 'Tigrinya' }, { value: 'to', label: 'Tongan' }, { value: 'tr', label: 'Turkish' }, { value: 'tk', label: 'Turkmen' }, { value: 'tw', label: 'Twi' },
    { value: 'ug', label: 'Uyghur' }, { value: 'uk', label: 'Ukrainian' }, { value: 'ur', label: 'Urdu' }, { value: 'uz', label: 'Uzbek' }, { value: 'vi', label: 'Vietnamese' }, { value: 'cy', label: 'Welsh' }, { value: 'xh', label: 'Xhosa' }, { value: 'yi', label: 'Yiddish' }, { value: 'yo', label: 'Yoruba' }, { value: 'zu', label: 'Zulu' }
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ level: 'weak', color: 'red', width: '25%' });

  // Real-time Firebase Auth Listener (replaces all token logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserProfile(userDoc.exists() ? userDoc.data() : { email: user.email });
      } else {
        setIsLoggedIn(false);
        setUserProfile({});
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time password strength
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    return score <= 2 ? { level: 'Weak', color: 'red', width: '25%' } :
           score === 3 ? { level: 'Medium', color: 'orange', width: '50%' } :
           { level: 'Strong', color: 'green', width: '100%' };
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target || { name: e.name, value: e.value };
    setSignupForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordStrength(calculateStrength(value));
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validate passwords match
    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      await handlePasswordChange(changePasswordForm.newPassword);
      setChangePasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setStatus({ loading: false, success: true, error: 'Password changed successfully!' });
      setShowChangePassword(false);
    } catch (err) {
      setErrors({ password: err.message });
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  // 1. Login with Email/Password
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ loading: true, success: false, error: '' });
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setStatus({ loading: false, success: true, error: '' });
      setShowLogin(false);
    } catch (err) {
      setErrors({ email: err.message });
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  // 7. Signup + Auto-create Profile in Firestore
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validate passwords match
    if (signupForm.password !== signupForm.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: signupForm.email,
        country: signupForm.country?.label,
        language: signupForm.language?.label,
        createdAt: new Date().toISOString(),
        profilePicture: ''
      });
      setStatus({ loading: false, success: true, error: '' });
      setShowSignup(false);
    } catch (err) {
      setErrors({ email: err.message });
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  // 2. Forgot Password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ loading: true, success: false, error: '' });
    try {
      await sendPasswordResetEmail(auth, forgotForm.email);
      setStatus({ loading: false, success: true, error: '' });
      setShowForgot(false);
    } catch (err) {
      setErrors({ email: err.message });
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Update password for currently logged-in user
  const handlePasswordChange = async (newPassword) => {
    if (!auth.currentUser) {
      setErrors({ password: 'No user logged in' });
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setStatus({ loading: false, success: true, error: 'Password updated successfully!' });
      setErrors({});
      return true;
    } catch (err) {
      setErrors({ password: err.message });
      setStatus({ loading: false, success: false, error: err.message });
      return false;
    }
  };

  // Real OAuth (Google, Microsoft, Apple)
  const handleGoogleLogin = () => signInWithPopup(auth, googleProvider);
  //const handleMicrosoftLogin = () => signInWithPopup(auth, microsoftProvider);
  //const handleAppleLogin = () => signInWithPopup(auth, appleProvider);
  //const handleFacebookLogin = () => signInWithPopup(auth, new OAuthProvider('facebook.com')); // if needed

  const handleLogout = () => auth.signOut();  

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm position-relative">
        <div className="animation-container">
          <span className="music-symbol">♪</span>
          <span className="music-symbol">♫</span>
          <span className="music-symbol">♬</span>
          <span className="music-symbol">♪</span>
          <span className="music-symbol">♫</span>
          <span className="music-symbol">♬</span>
          <span className="music-symbol">♪</span>
          <span className="music-symbol">♫</span>
        </div>
        <Container>
          <Navbar.Brand href="https://bestcoach-front.vercel.app/" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#007bff' }}>
            <img src={logoUrl} alt="Bestcoach Music Logo" style={{ height: '40px', marginRight: '10px' }} className="img-fluid" />
            Bestcoach Music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" smooth={true} duration={500} className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/community" smooth={true} duration={500} className="mx-2"><BsPeopleFill className="me-2 text-orange" />Community & Forums</Nav.Link>
              <NavDropdown title="Events" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss" smooth={true} duration={500}><FaMicrophoneAlt className="me-2 text-orange" />The Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme" smooth={true} duration={500}><FaMusic className="me-2 text-orange" />The Music Mentorship Experience</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/blog" smooth={true} duration={500}><FaBlog className="me-2 text-orange" />Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about" smooth={true} duration={500}><FcAbout className="me-2 text-orange" />About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/press" smooth={true} duration={500}><FaNewspaper className="me-2 text-orange" />Press</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team" smooth={true} duration={500}><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact" smooth={true} duration={500}><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers" smooth={true} duration={500}><FaBriefcase className="me-2 text-orange" />Careers At Bestcoach</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Features" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/package" smooth={true} duration={500}><FaBoxOpen className="me-2 text-orange" />Packages</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coach" smooth={true} duration={500}><FaUsers className="me-2 text-orange" />Coaches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/method" smooth={true} duration={500}><FaRoad className="me-2 text-orange" />Methods</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/shop" smooth={true} duration={500} className="mx-2"><FaShoppingCart className="me-2 text-orange" />Shop</Nav.Link>
              <NavDropdown title="Resources" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/webinars" smooth={true} duration={500}><FaVideo className="me-2 text-orange" />Webinars</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/help" smooth={true} duration={500}><FaLifeRing className="me-2 text-orange" />Help Centre</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/studio-tutorials" smooth={true} duration={500}><FaBookOpen className="me-2 text-orange" />Studio Tutorials</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
             {isLoggedIn ? (
    <>
      <Nav.Link as={Link} to="/profile" className="mx-2">
        <FaUserCircle className="me-2 text-orange" />
        {userProfile.name || auth.currentUser?.email?.split('@')[0] || 'Profile'}
      </Nav.Link>
      <Button variant="danger" onClick={handleLogout} className="me-2">
        Logout
      </Button>
    </>
  ) : (
    <Button variant="outline-primary" onClick={() => setShowLogin(true)} className="me-2">
      <FaUserCircle className="me-2 text-orange" /> Login / Signup
    </Button>
  )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Sign In</h3>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={loginForm.email} onChange={handleLoginChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={loginForm.password} onChange={handleLoginChange} required isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <p className="text-end text-orange cursor-pointer mb-3" onClick={() => { setShowLogin(false); setShowForgot(true); }}>Forgot password?</p>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Signing In...' : 'Sign In'}
            </Button>
            {status.success && <Alert variant="success">Logged in successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mb-3">
            Not a member? <span className="text-orange cursor-pointer" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign up here!</span>
          </p>
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</Button>
         {/* <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleMicrosoftLogin}><span style={{color: '#0078D4'}}>⊞</span> Sign in with Microsoft</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleAppleLogin}><AiFillApple /> Sign in with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3 oauth-btn" onClick={handleFacebookLogin}><AiFillFacebook /> Sign in with Facebook</Button>*/}
          <p className="text-center text-orange cursor-pointer" onClick={() => console.log('Get Support')}>Get Support</p>
          <AIAgent />
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-2">Excited to Join Bestcoach Music!</h3>
          <p className="text-center mb-4">Enter your email to create your account. You'll log in with this email to access bestcoach music.</p>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={signupForm.email} onChange={handleSignupChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Select options={countries} value={signupForm.country} onChange={(val) => handleSignupChange({ name: 'country', value: val })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Select options={languages} value={signupForm.language} onChange={(val) => handleSignupChange({ name: 'language', value: val })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={signupForm.password} onChange={handleSignupChange} required isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              {/* 3 & 8. Real-time Password Strength Indicator */}
              <div className="strength-bar mt-2" style={{ backgroundColor: passwordStrength.color, width: passwordStrength.width, height: '6px', borderRadius: '4px' }}></div>
              <small className="text-muted">Strength: <span style={{ color: passwordStrength.color }}>{passwordStrength.level}</span></small>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={signupForm.confirmPassword} onChange={handleSignupChange} required isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {status.success && <Alert variant="success">Signed up successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign up with Google</Button>
         {/* <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleMicrosoftLogin}><span style={{color: '#0078D4'}}>⊞</span> Sign up with Microsoft</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleAppleLogin}><AiFillApple /> Sign up with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3 oauth-btn" onClick={handleFacebookLogin}><AiFillFacebook /> Sign up with Facebook</Button>*/}
          <p className="text-center mb-2">
            Already have an account? <span className="text-orange cursor-pointer" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Sign in</span>
          </p>
          <p className="text-center text-muted">
            By continuing you agree to Bestcoach Music's <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/terms'}>Terms of use</span> and <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/privacy'}>Privacy Policy</span>
          </p>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgot} onHide={() => setShowForgot(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Forgot Password</h3>
          <p className="text-center mb-4">Enter your email to reset your password.</p>
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={forgotForm.email} onChange={handleForgotChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Sending...' : 'Reset Password'}
            </Button>
            {status.success && <Alert variant="success">Reset link sent! Check your email.</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mt-3">
            Back to <span className="text-orange cursor-pointer" onClick={() => { setShowForgot(false); setShowLogin(true); }}>Sign In</span>
          </p>
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Change Password</h3>
          <p className="text-center mb-4">Enter your new password.</p>
          <Form onSubmit={handleChangePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={changePasswordForm.newPassword} onChange={handleChangePasswordChange} required isInvalid={!!errors.newPassword} />
              <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={changePasswordForm.confirmPassword} onChange={handleChangePasswordChange} required isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Updating...' : 'Update Password'}
            </Button>
            {status.success && <Alert variant="success">Password updated successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mt-3">
            <span className="text-orange cursor-pointer" onClick={() => setShowChangePassword(false)}>Cancel</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;