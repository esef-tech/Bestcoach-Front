// src/pages/Profile.jsx - Full Real-Time Profile (Picture + Name + Password + Dashboard + Logout)
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Alert, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
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

  // Real-time listener (updates instantly when anything changes in Firestore)
  useEffect(() => {
    if (!auth.currentUser) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile({
          name: data.name || '',
          country: data.country || '',
          language: data.language || '',
          profilePicture: data.profilePicture || ''
        });
        setNewName(data.name || '');
      }
    });

    return () => unsubscribe();
  }, []);

  // Upload Profile Picture
  const handleUploadPicture = async () => {
    if (!profilePicFile) return;
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

  // Update Profile (Name + Everything)
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: newName,
        updatedAt: new Date().toISOString()
      });
      setMessage('Profile updated successfully in real-time!');
    } catch (err) {
      setMessage('Update failed: ' + err.message);
    }
    setLoading(false);
  };

  // Change Password
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

  const handleLogout = () => auth.signOut();

  return (
    <Container fluid className="profile-container">
      <Card className="profile-card">
        <Row className="g-0">
          {/* Profile Picture Section */}
          <Col md={5} className="text-center p-4">
            <div className="profile-pic-container">
              <Image 
                src={userProfile.profilePicture || 'https://via.placeholder.com/150'} 
                roundedCircle 
                className="profile-pic" 
                alt="Profile"
              />
            </div>
            <Form.Control 
              type="file" 
              accept="image/*" 
              onChange={e => setProfilePicFile(e.target.files[0])} 
              className="mt-3" 
            />
            <Button 
              variant="primary" 
              onClick={handleUploadPicture} 
              disabled={!profilePicFile || loading}
              className="mt-3 w-100"
            >
              {loading ? 'Uploading...' : 'Upload Picture'}
            </Button>
          </Col>

          {/* Profile Details & Dashboard */}
          <Col md={7} className="p-4">
            <h2 className="text-center mb-4">Welcome, {userProfile.name || auth.currentUser?.email.split('@')[0]}</h2>
            
            {/* Dashboard Summary */}
            <div className="dashboard-box mb-4 p-3">
              <h5>Your Dashboard</h5>
              <p><strong>Enrolled Courses:</strong> 0</p>
              <p><strong>Purchases:</strong> 0</p>
              <p><strong>Active Rentals:</strong> 0</p>
              <Button variant="outline-primary" size="sm" as={Link} to="/shop">Browse Courses</Button>
            </div>

            {/* Edit Name */}
            <Form.Group className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                placeholder="Your full name" 
              />
            </Form.Group>

            {/* Change Password */}
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
              <Button variant="primary" onClick={handleChangePassword} disabled={loading} className="w-100">
                Update Password
              </Button>
            </div>

            {/* Update Profile Button */}
            <Button 
              variant="success" 
              onClick={handleUpdateProfile} 
              disabled={loading} 
              className="w-100 mt-4 mb-3"
            >
              {loading ? 'Saving...' : 'Update Profile'}
            </Button>

            {message && <Alert variant="info" className="mt-3">{message}</Alert>}

            {/* Logout */}
            <Button variant="danger" onClick={handleLogout} className="w-100">Log Out</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;