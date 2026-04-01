// src/pages/CommunityForumsPage.jsx - FINAL CLEAN VERSION (Firebase + All Requested Features)
// Copy and paste this entire file to replace your current CommunityForumsPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Image, Modal, Badge, InputGroup } from 'react-bootstrap';
import { FaClock, FaPlus, FaReply, FaUsers, FaEye, FaHeart, FaShareAlt, FaTrash, FaImage, FaVideo } from 'react-icons/fa';
import './Community.css';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  deleteDoc, 
  arrayUnion, 
  doc, 
  updateDoc, 
  setDoc, 
  where, 
  increment, 
  arrayRemove, 
  limit, 
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../../context/AuthContext'
import Seo from '../../Seo';
import {useSession} from '../../../context/SessionContext'

const CommunityForumsPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [mediaFile, setMediaFile] = useState(null);
  const [expandedThreadId, setExpandedThreadId] = useState(null);
  const [commentsByThread, setCommentsByThread] = useState({});
  const [newCommentText, setNewCommentText] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session, csrfToken, validateCSRF, savePreferences, getPreferences } = useSession();

  const viewedThreadsRef = useRef(new Set());

  // ====================== CLEAN FIREBASE REAL-TIME LISTENERS ======================
  useEffect(() => {
    // Auth listener
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    // Real-time Threads (with LIMIT as requested)
    const threadsQuery = query(
      collection(db, 'threads'), 
      orderBy('createdAt', 'desc'), 
      limit(50)
    );
    const unsubscribeThreads = onSnapshot(threadsQuery, (snapshot) => {
      setThreads(snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })));
    });

    // Real-time Online Users (presence with lastSeen filter)
    const presenceRef = collection(db, 'onlineUsers');
    const onlineQuery = query(
      presenceRef,
      where('lastSeen', '>', new Date(Date.now() - 60000))
    );
    const unsubscribeOnline = onSnapshot(onlineQuery, (snapshot) => {
      setOnlineCount(snapshot.docs.length);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeThreads();
      unsubscribeOnline();
    };
  }, []);

  // Join/Leave presence when authenticated
  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    const userPresenceDoc = doc(db, 'onlineUsers', currentUser.uid);
    setDoc(userPresenceDoc, {
      uid: currentUser.uid,
      username: user?.displayName || currentUser.email || 'User',
      lastSeen: serverTimestamp()
    }, { merge: true });

    return () => {
      deleteDoc(userPresenceDoc).catch(() => {});
    };
  }, [isAuthenticated, currentUser, user]);

  // Real-time comments listener (only for currently expanded thread)
  useEffect(() => {
    if (!expandedThreadId || !isAuthenticated) return;

    const commentsRef = collection(db, 'threads', expandedThreadId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    const unsubscribeComments = onSnapshot(commentsQuery, (snap) => {
      setCommentsByThread(prev => ({
        ...prev,
        [expandedThreadId]: snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }));
    });

    return unsubscribeComments;
  }, [expandedThreadId, isAuthenticated]);

  // Safe real-time Views increment (prevents infinite loop)
  useEffect(() => {
    threads.forEach((thread) => {
      if (!viewedThreadsRef.current.has(thread.id)) {
        viewedThreadsRef.current.add(thread.id);
        const threadRef = doc(db, 'threads', thread.id);
        updateDoc(threadRef, { views: increment(1) }).catch(() => {});
      }
    });
  }, [threads]);

  // ====================== AUTH GUARD ======================
  const requireAuth = (callback) => {
    if (!isAuthenticated || !currentUser) {
      setShowAuthModal(true);
      toast.warning("You must be logged in to perform this action.");
      return false;
    }
    callback();
    return true;
  };

  // ====================== ACTIONS ======================
  const handleLike = async (threadId) => {
    if (!validateCSRF(csrfToken)) return;
    requireAuth(async () => {
      const threadRef = doc(db, 'threads', threadId);
      const threadSnap = await getDoc(threadRef);
      if (!threadSnap.exists()) return;

      const likedBy = threadSnap.data().likedBy || [];
      if (likedBy.includes(currentUser.uid)) {
        await updateDoc(threadRef, {
          likes: increment(-1),
          likedBy: arrayRemove(currentUser.uid)
        });
        toast.info("Like removed");
      } else {
        await updateDoc(threadRef, {
          likes: increment(1),
          likedBy: arrayUnion(currentUser.uid)
        });
        toast.success("Thread liked ❤️");
      }
    });
  };

  const handleCommentClick = async (threadId) => {
    if (!validateCSRF(csrfToken)) return;
    requireAuth(async () => {
      setExpandedThreadId(prev => (prev === threadId ? null : threadId));
      // Increment view when comments are opened
      const threadRef = doc(db, 'threads', threadId);
      await updateDoc(threadRef, { views: increment(1) }).catch(() => {});
    });
  };

  const handlePostComment = async (threadId) => {
    if (!validateCSRF(csrfToken)) return;
    if (!newCommentText.trim()) return;
    requireAuth(async () => {
      const commentsRef = collection(db, 'threads', threadId, 'comments');
      await addDoc(commentsRef, {
        userId: currentUser.uid,
        username: user?.displayName?.split(' ')[0] || currentUser.email,
        text: newCommentText.trim(),
        createdAt: serverTimestamp()
      });
      setNewCommentText('');
      toast.success("Comment posted!");
    });
  };

  const handleDeleteComment = async (threadId, commentId) => {
    if (!validateCSRF(csrfToken)) return;
    requireAuth(async () => {
      await deleteDoc(doc(db, 'threads', threadId, 'comments', commentId));
      toast.success("Comment deleted");
    });
  };

  const handleCopyLink = (threadId) => {
    if (!validateCSRF(csrfToken)) return;
    requireAuth(() => {
      const link = `${window.location.origin}/community/thread/${threadId}`;
      navigator.clipboard.writeText(link).then(() => {
        toast.success("✅ Thread link copied to clipboard!");
      });
    });
  };

  const openCreateModal = () => {
    requireAuth(() => setShowCreateModal(true));
  };

  // Create new thread (with media support)
  const createThread = async () => {
    if (!newThread.title.trim() || !newThread.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    let mediaUrl = '';
    if (mediaFile) {
      const mediaRef = ref(storage, `thread-attachments/${Date.now()}_${mediaFile.name}`);
      await uploadBytes(mediaRef, mediaFile);
      mediaUrl = await getDownloadURL(mediaRef);
    }

    await addDoc(collection(db, 'threads'), {
      title: newThread.title.trim(),
      content: newThread.content.trim(),
      authorId: currentUser.uid,
      authorName: user?.displayName?.split(' ')[0] || 'User',
      authorPhoto: user?.photoURL || '',
      mediaUrl,
      mediaType: mediaFile ? mediaFile.type : null,
      createdAt: serverTimestamp(),
      likes: 0,
      views: 0,
      likedBy: [],
      replyCount: 0
    });

    toast.success("Thread posted successfully!");
    setShowCreateModal(false);
    setNewThread({ title: '', content: '' });
    setMediaFile(null);
  };

  // Delete own thread
  const deleteThread = async (threadId, authorId) => {
    if (authorId !== currentUser?.uid) return;
    if (!window.confirm("Delete this thread permanently?")) return;
    await deleteDoc(doc(db, 'threads', threadId));
    toast.success("Thread deleted");
  };

//Cookies && Sessions Here
// Track last visited page
  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/community' });
    }
  }, [session, savePreferences, getPreferences]);

  



  // ====================== RENDER ======================
  return (
    
<React.Fragment>
    <Seo 
      title="Community Forums | Bestcoach Music"
      description="Real-time music community. Share threads, like posts, comment, and see who's online right now."
      keywords="music forum, bestcoach community, musician threads, real-time chat, music discussion"
    />
    

    <div className="community-forums">
      {/* Header */}
      <div className="forums-header text-white py-5 text-center">
        <Container className="py-4">
          <h1 className="display-4 fw-bold">Welcome to the Bestcoach Music Community </h1>
        </Container>
      </div>

      <Container className="py-4">
  <Row className="mb-4 align-items-center justify-content-center g-3">
    {/* Title - centered on all screens, smaller on mobile */}
    <Col xs={12} md={6} className="text-center text-md-start">
      <h1 className="display-5 fw-bold mb-0 mobile-title">
        Share threads, like and comment
      </h1>
    </Col>

    {/* Online Badge + Post Button - stacked on mobile, side-by-side on larger screens */}
    <Col xs={12} md="auto" className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
      {/* Online Users Badge */}
      <Badge 
        bg="success" 
        className="online-badge fs-6 px-4 py-2 d-flex align-items-center gap-2"
      >
        <FaUsers className="me-1" /> 
        <span className="fw-semibold">{onlineCount} users online now</span>
      </Badge>

      {/* Post a Thread Button - full width on mobile */}
      <Button 
        variant="success" 
        size="lg" 
        className="post-thread-btn w-100 w-md-auto d-flex align-items-center justify-content-center gap-2"
        onClick={openCreateModal}
      >
        <FaPlus /> Post a Thread
      </Button>
    </Col>
  </Row>

        {/* THREADS */}
        {threads.map((thread) => {
          const threadComments = commentsByThread[thread.id] || [];
          return (
            <Card key={thread.id} className="mb-4 shadow" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <Card.Body>
                <Row>
                  <Col md={1} className="text-center">
                    <img 
                      src={thread.authorPhoto || '/default-avatar.png'} 
                      alt="avatar" 
                      className="rounded-circle" 
                      width="50" 
                    />
                  </Col>
                  <Col md={11}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h5>{thread.title}</h5>
                      {thread.authorId === currentUser?.uid && (
                        <Button 
                          variant="link" 
                          className="text-danger p-0" 
                          onClick={() => deleteThread(thread.id, thread.authorId)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                    <p className="text-muted small">
                      by <strong>{thread.authorName}</strong> • <FaClock className="me-1" />
                      {thread.createdAt?.toDate ? thread.createdAt.toDate().toLocaleString() : 'Just now'}
                    </p>
                    <Card.Text className="lead">{thread.content}</Card.Text>

                    {/* Media Preview */}
                    {thread.mediaUrl && (
                      <div className="mb-3">
                        {thread.mediaType?.startsWith('image') ? (
                          <>
                            <FaImage className="text-primary me-2" />
                            <Image src={thread.mediaUrl} fluid className="media-preview" />
                          </>
                        ) : (
                          <>
                            <FaVideo className="text-danger me-2" />
                            <video src={thread.mediaUrl} controls className="media-preview w-100" />
                          </>
                        )}
                      </div>
                    )}

                    {/* Real-time Views */}
                    <div className="d-flex align-items-center text-muted mb-3">
                      <FaEye className="me-1" style={{ color: '#fd7e14', fontSize: '1.4rem' }} />
                      <span className="ms-2 fw-bold" style={{ color: '#fd7e14' }}>
                        {thread.views || 0}
                      </span>
                      <span className="ms-1">views</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              {/* Action Bar - RED / TEAL / ORANGE + Animation */}
              <Card.Footer className="bg-light py-3">
                <Row className="text-center">
                  {/* Like - RED */}
                  <Col xs={4} className="border-end">
                    <div
                      onClick={() => handleLike(thread.id)}
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      className="d-flex align-items-center justify-content-center gap-2 hover-scale"
                    >
                      <span style={{ color: 'red', fontSize: '1.9rem' }}>
                        <FaHeart />
                      </span>
                      <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>
                        {thread.likes || 0}
                      </span>
                    </div>
                  </Col>

                  {/* Reply - TEAL */}
                  <Col xs={4} className="border-end">
                    <div
                      onClick={() => handleCommentClick(thread.id)}
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      className="d-flex align-items-center justify-content-center gap-2 hover-scale"
                    >
                      <span style={{ color: 'teal', fontSize: '1.9rem' }}>
                        <FaReply />
                      </span>
                      <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>
                        {threadComments.length}
                      </span>
                    </div>
                  </Col>

                  {/* Share - ORANGE */}
                  <Col xs={4}>
                    <div
                      onClick={() => handleCopyLink(thread.id)}
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      className="d-flex align-items-center justify-content-center gap-2 hover-scale"
                    >
                      <span style={{ color: 'orange', fontSize: '1.9rem' }}>
                        <FaShareAlt />
                      </span>
                      <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>
                        Share
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Footer>

              {/* Expanded Real-time Comments */}
              {expandedThreadId === thread.id && (
                <Card.Body className="bg-white border-top">
                  <h6 className="mb-3">Comments ({threadComments.length})</h6>
                  {threadComments.map((c) => (
                    <div key={c.id} className="mb-3 p-3 border rounded bg-light">
                      <div className="d-flex justify-content-between">
                        <strong>{c.username}</strong>
                        {c.userId === currentUser.uid && (
                          <Button
                            variant="link"
                            size="sm"
                            className="text-danger p-0"
                            onClick={() => handleDeleteComment(thread.id, c.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <p className="mb-1">{c.text}</p>
                      <small className="text-muted">
                        {c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleString() : ''}
                      </small>
                    </div>
                  ))}

                  <InputGroup className="mt-3">
                    <Form.Control
                      placeholder="Write a comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <Button 
                      variant="teal" 
                      onClick={() => handlePostComment(thread.id)}
                      style={{ backgroundColor: 'teal', color: 'white' }}
                    >
                      Post
                    </Button>
                  </InputGroup>
                </Card.Body>
              )}
            </Card>
          );
        })}

        {/* AUTH MODAL */}
        <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>🔒 Login or Sign Up Required</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <p className="lead">You must be logged in to like, comment, share threads, or post new threads.</p>
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" size="lg" href="/login">Log In</Button>
              <Button variant="outline-primary" size="lg" href="/signup">Create Free Account</Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* CREATE THREAD MODAL (kept from your original - improved) */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>New Thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  value={newThread.title} 
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  value={newThread.content} 
                  onChange={(e) => setNewThread({ ...newThread, content: e.target.value })} 
                  required 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Attach Image or Video (optional)</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={(e) => setMediaFile(e.target.files[0])} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={createThread}>Post Thread</Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <style>{`
        .hover-scale:hover { transform: scale(1.15); }
        .btn-teal { background-color: teal; color: white; }
        .media-preview { max-height: 400px; border-radius: 8px; }
      `}</style>
    </div>
    </React.Fragment>
  );
};

export default CommunityForumsPage;