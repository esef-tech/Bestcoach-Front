// src/pages/Profile.jsx - Full Real-Time Profile (Picture + Name + Password + Dashboard + Logout)
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Form, Image, Spinner } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Profile.css';
import { ThemeContext } from '../../src/context/ThemeContext';
import { FaUserEdit, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState({ fullName: '', photoURL: '' });
  const [newFullName, setNewFullName] = useState('');
  const [uploading, setUploading] = useState(false);
  const { isDark } = useContext(ThemeContext);

  const user = auth.currentUser;

  // Real-time listener – syncs instantly with Navbar
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          fullName: data.fullName || user.displayName || 'User',
          photoURL: data.photoURL || user.photoURL || ''
        });
        setNewFullName(data.fullName || user.displayName || '');
      } else {
        // Create document if it doesn't exist
        setDoc(userRef, {
          fullName: user.displayName || 'User',
          photoURL: user.photoURL || '',
          email: user.email,
          createdAt: new Date()
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

// Update Full Name
  const handleUpdateName = async () => {
    if (!newFullName.trim() || !user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        fullName: newFullName.trim()
      });
      toast.success("Full name updated successfully!");
    } catch (err) {
      toast.error("Failed to update name.");
    }
  };

// Upload New Profile Picture
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const photoRef = ref(storage, `profile-pics/${user.uid}`);
      await uploadBytes(photoRef, file);
      const downloadURL = await getDownloadURL(photoRef);

      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: downloadURL
      });

      toast.success("Profile picture updated! Navbar will refresh automatically.");
    } catch (err) {
      toast.error("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    auth.signOut().then(() => {
      window.location.href = '/'; // Redirect to home + close profile
    });
    await signOut(auth);
    toast.success("Logged out successfully");
  };

  const handleResendVerification = async () => {
    if (user) {
      await sendEmailVerification(user);
      toast.success("Verification email resent! Check your inbox.");
    }
  };

  return (
    <Container className="py-5">
      <Card className={`shadow-lg ${isDark ? 'bg-dark text-white' : 'bg-white'}`}>
        <Card.Body className="text-center">
          {/* Profile Picture */}
          <div className="position-relative d-inline-block mb-4">
            <Image
              src={userData.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              roundedCircle
              width="150"
              height="150"
              className="border border-3 border-warning shadow"
            />
            <label className="position-absolute bottom-0 end-0 bg-warning text-dark rounded-circle p-2 cursor-pointer">
              📸
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadPhoto}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {uploading && <Spinner animation="border" size="sm" className="ms-2" />}

          {/* Full Name Edit */}
          <h3 className="mb-3">{userData.fullName}</h3>
          <div className="d-flex gap-2 justify-content-center mb-4">
            <Form.Control
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder="Edit Full Name"
              className="w-50"
            />
            <Button variant="primary" onClick={handleUpdateName}>
              <FaUserEdit className="me-2" />Save Name
            </Button>
          </div>

          {/* Email & Verification */}
          <p className="text-muted">{user?.email}</p>
          {!user?.emailVerified && (
            <Button variant="outline-warning" onClick={handleResendVerification} className="mb-3">
              <FaEnvelope className="me-2" /> Resend Verification Email
            </Button>
          )}

          {/* Logout */}
          <Button variant="danger" onClick={handleLogout} className="w-100 mt-3">
            <FaSignOutAlt className="me-2" /> Logout
          </Button>

        </Card.Body>
      </Card>
    </Container>
   
  );
};

export default Profile;