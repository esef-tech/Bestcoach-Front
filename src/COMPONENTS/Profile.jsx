// src/pages/Profile.jsx - Full Real-Time Profile (Picture + Name + Password + Dashboard + Logout)
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Alert, Image, Row, Col,} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({ name: '', country: '', language: '', profilePicture: '' });
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Real-time listener + auto-create document if missing
  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = doc(db, 'users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);
        setNewName(data.name || '');
      } else {
        // Auto-create user document on first visit
        await setDoc(userRef, {
          name: auth.currentUser.email.split('@')[0],
          email: auth.currentUser.email,
          country: '',
          language: '',
          profilePicture: '',
          createdAt: new Date().toISOString()
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Upload Profile Picture
  const handleUploadPicture = async () => {
    if (!profilePicFile || !auth.currentUser) return;
    setLoading(true);
    try {
      const storageRef = ref(storage, `profile-pics/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, profilePicFile);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, 'users', auth.currentUser.uid), { profilePicture: url });
      setMessage('Profile picture updated successfully!');
    } catch (err) {
      setMessage('Upload failed: ' + err.message);
    }
    setLoading(false);
  };

  // Update Name
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), { name: newName });
      setMessage('Profile updated in real-time!');
    } catch (err) {
      setMessage('Update failed: ' + err.message);
    }
    setLoading(false);
  };

  // Change Password (same as before)
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return;
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Password changed successfully!');
      setNewPassword('');
      setCurrentPassword('');
    } catch (err) {
      setMessage('Password change failed: ' + err.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = '/'; // Redirect to home + close profile
    });
  };


  return (
    <Container fluid className="profile-container">
      <Card className="profile-card">
        <Row className="g-0">
          <Col md={5} className="text-center p-4">
            <div className="profile-pic-container">
              <Image 
                src={userProfile.profilePicture || 'https://via.placeholder.com/150'} 
                roundedCircle 
                className="profile-pic" 
              />
            </div>
            <Form.Control type="file" accept="image/*" onChange={e => setProfilePicFile(e.target.files[0])} className="mt-3" />
            <Button variant="primary" onClick={handleUploadPicture} disabled={!profilePicFile || loading} className="mt-3 w-100">
              {loading ? 'Uploading...' : 'Upload Picture'}
            </Button>
          </Col>

          <Col md={7} className="p-4">
            <h2 className="text-center mb-4">Welcome, {userProfile.name || auth.currentUser?.email?.split('@')[0]}</h2>

            <Form.Group className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control value={newName} onChange={e => setNewName(e.target.value)} />
            </Form.Group>

            <div className="password-section">
              <h5>Change Password</h5>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={handleChangePassword} className="w-100">Update Password</Button>
            </div>

            <Button variant="success" onClick={handleUpdateProfile} disabled={loading} className="w-100 mt-4 mb-3">
              {loading ? 'Saving...' : 'Update Profile'}
            </Button>

            {message && <Alert variant="info" className="mt-3">{message}</Alert>}

            <Button variant="danger" className="w-100" onClick={handleLogout}>Log Out</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;