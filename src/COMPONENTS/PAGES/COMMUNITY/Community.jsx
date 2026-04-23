// src/COMPONENTS/PAGES/COMMUNITY/CommunityForumsPage.jsx - FINAL FIXED VERSION (Media uploads work)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Card, Image, Modal, Badge, InputGroup } from 'react-bootstrap';
import { 
  FaClock, FaPlus, FaReply, FaUsers, FaEye, FaHeart, 
  FaShareAlt, FaTrash, FaImage, FaVideo, FaEdit 
} from 'react-icons/fa';
import './Community.css';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../../firebase';
import {
  collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, deleteDoc,
  arrayUnion, doc, updateDoc, setDoc, where, increment, arrayRemove, limit, getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../../context/AuthContext';
import Seo from '../../Seo';

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
  const [showLikersModal, setShowLikersModal] = useState(false);
  const [selectedLikers, setSelectedLikers] = useState([]);
  const [editingThreadId, setEditingThreadId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [posting, setPosting] = useState(false);

  const viewedThreadsRef = useRef(new Set());
  const abortControllerRef = useRef(null);

  // ====================== REAL-TIME LISTENERS ======================
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(setUser);

    const threadsQuery = query(collection(db, 'threads'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribeThreads = onSnapshot(threadsQuery, (snap) => {
      setThreads(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const onlineQuery = query(collection(db, 'onlineUsers'), where('lastSeen', '>', new Date(Date.now() - 60000)));
    const unsubscribeOnline = onSnapshot(onlineQuery, (snap) => setOnlineCount(snap.docs.length));

    return () => { unsubscribeAuth(); unsubscribeThreads(); unsubscribeOnline(); };
  }, []);

  // Presence heartbeat
  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;
    const presenceDoc = doc(db, 'onlineUsers', currentUser.uid);
    const heartbeat = () => {
      setDoc(presenceDoc, {
        uid: currentUser.uid,
        username: user?.displayName || currentUser.email?.split('@')[0] || 'User',
        lastSeen: serverTimestamp()
      }, { merge: true });
    };
    heartbeat();
    const interval = setInterval(heartbeat, 30000);
    return () => { clearInterval(interval); deleteDoc(presenceDoc).catch(() => {}); };
  }, [isAuthenticated, currentUser, user]);

  // Real-time comments
  useEffect(() => {
    if (!expandedThreadId) return;
    const q = query(collection(db, 'threads', expandedThreadId, 'comments'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setCommentsByThread(prev => ({ ...prev, [expandedThreadId]: snap.docs.map(d => ({ id: d.id, ...d.data() })) }));
    });
    return unsub;
  }, [expandedThreadId]);

  // Safe views increment
  useEffect(() => {
    threads.forEach(thread => {
      if (!viewedThreadsRef.current.has(thread.id)) {
        viewedThreadsRef.current.add(thread.id);
        updateDoc(doc(db, 'threads', thread.id), { views: increment(1) }).catch(() => {});
      }
    });
  }, [threads]);

  // ====================== ACTIONS ======================
  const requireAuth = useCallback((callback) => {
    if (!isAuthenticated || !currentUser) {
      setShowAuthModal(true);
      toast.warning('You must be logged in');
      return false;
    }
    callback();
    return true;
  }, [isAuthenticated, currentUser]);

  const createThread = async () => {
    if (!newThread.title.trim() || !newThread.content.trim()) {
      return toast.error('Title and content are required');
    }

    setPosting(true);
    abortControllerRef.current = new AbortController();

    try {
      let mediaUrl = '';
      if (mediaFile) {
        console.log('📤 Uploading media:', mediaFile.name);
        const mediaRef = ref(storage, `thread-attachments/${Date.now()}_${mediaFile.name}`);
        await uploadBytes(mediaRef, mediaFile);
        mediaUrl = await getDownloadURL(mediaRef);
        console.log('✅ Media uploaded:', mediaUrl);
      }

      const newThreadData = {
        title: newThread.title.trim(),
        content: newThread.content.trim(),
        authorId: currentUser.uid,
        authorName: user?.displayName || currentUser.email?.split('@')[0] || 'User',
        authorPhoto: user?.photoURL || '',
        mediaUrl,
        mediaType: mediaFile ? mediaFile.type : null,
        createdAt: serverTimestamp(),
        likes: 0,
        views: 0,
        likedBy: [],
        replyCount: 0
      };

      await addDoc(collection(db, 'threads'), newThreadData);
      console.log('✅ Thread saved to Firestore');

      toast.success('Thread posted successfully! 🎉');
      setShowCreateModal(false);
      setNewThread({ title: '', content: '' });
      setMediaFile(null);
    } catch (error) {
      console.error('🔥 FULL POST ERROR:', error);
      if (error.name === 'AbortError') {
        toast.info('Posting cancelled');
      } else {
        toast.error('Failed to post thread. Check console (F12) for details.');
      }
    } finally {
      setPosting(false);
      abortControllerRef.current = null;
    }
  };

  const cancelPosting = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setPosting(false);
    setShowCreateModal(false);
  };

  const handleLike = async (threadId) => {
    requireAuth(async () => {
      const threadRef = doc(db, 'threads', threadId);
      const snap = await getDoc(threadRef);
      if (!snap.exists()) return;
      const data = snap.data();
      const likedBy = data.likedBy || [];
      const alreadyLiked = likedBy.some(l => l.uid === currentUser.uid);

      if (alreadyLiked) {
        await updateDoc(threadRef, { likes: increment(-1), likedBy: arrayRemove(likedBy.find(l => l.uid === currentUser.uid)) });
        toast.info('Like removed');
      } else {
        await updateDoc(threadRef, { likes: increment(1), likedBy: arrayUnion({ uid: currentUser.uid, name: user?.displayName || currentUser.email?.split('@')[0] || 'User' }) });
        toast.success('❤️ Liked!');
      }
    });
  };

  const showLikers = (thread) => {
    setSelectedLikers(thread.likedBy || []);
    setShowLikersModal(true);
  };

  const handleCommentClick = (threadId) => requireAuth(() => setExpandedThreadId(prev => prev === threadId ? null : threadId));

  const handlePostComment = async (threadId) => {
    if (!newCommentText.trim()) return;
    requireAuth(async () => {
      await addDoc(collection(db, 'threads', threadId, 'comments'), {
        userId: currentUser.uid,
        username: user?.displayName || currentUser.email?.split('@')[0] || 'User',
        text: newCommentText.trim(),
        createdAt: serverTimestamp()
      });
      setNewCommentText('');
      toast.success('Comment posted!');
    });
  };

  const handleEditComment = (threadId, comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const saveEditedComment = async (threadId) => {
    if (!editText.trim()) return;
    await updateDoc(doc(db, 'threads', threadId, 'comments', editingCommentId), { text: editText });
    setEditingCommentId(null);
    setEditText('');
    toast.success('Comment updated');
  };

  const deleteComment = async (threadId, commentId) => {
    if (window.confirm('Delete this comment?')) {
      await deleteDoc(doc(db, 'threads', threadId, 'comments', commentId));
      toast.success('Comment deleted');
    }
  };

  const handleCopyLink = (threadId) => {
    requireAuth(() => {
      const link = `${window.location.origin}/community/thread/${threadId}`;
      navigator.clipboard.writeText(link).then(() => toast.success('✅ Link copied!'));
    });
  };

  const startEditThread = (thread) => {
    const created = thread.createdAt?.toDate ? thread.createdAt.toDate() : new Date();
    if (Date.now() - created.getTime() > 86400000) return toast.warning('Editing window closed (24h)');
    setEditingThreadId(thread.id);
    setNewThread({ title: thread.title, content: thread.content });
    setShowCreateModal(true);
  };

  const saveEditedThread = async () => {
    if (!editingThreadId) return;
    await updateDoc(doc(db, 'threads', editingThreadId), {
      title: newThread.title,
      content: newThread.content
    });
    setEditingThreadId(null);
    setShowCreateModal(false);
    toast.success('Thread updated in real-time');
  };

  const deleteThread = async (threadId, authorId) => {
    if (authorId !== currentUser?.uid) return;
    if (window.confirm('Delete this thread permanently?')) {
      await deleteDoc(doc(db, 'threads', threadId));
      toast.success('Thread deleted');
    }
  };

  // ====================== RENDER ======================
  return (
    <>
      <Seo title="Community Forums | Bestcoach Music" description="Real-time music community. Post threads, like, comment, and see who's online." />
      <div className="community-forums">
        <div className="forums-header text-white py-5 text-center">
          <Container className="py-4">
            <h1 className="display-4 fw-bold">Welcome to the Bestcoach Music Community</h1>
          </Container>
        </div>

        <Container className="py-4">
          <Row className="mb-4 align-items-center justify-content-center g-3">
            <Col xs={12} md={6} className="text-center text-md-start">
              <h1 className="display-5 fw-bold mb-0">Share threads, like and comment</h1>
            </Col>
            <Col xs={12} md="auto" className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
              <Badge bg="success" className="online-badge fs-6 px-4 py-2 d-flex align-items-center gap-2">
                <FaUsers /> <span>{onlineCount} users online now</span>
              </Badge>
              <Button variant="success" size="lg" className="post-thread-btn" onClick={() => requireAuth(() => setShowCreateModal(true))}>
                <FaPlus /> Post a Thread
              </Button>
            </Col>
          </Row>

          {/* THREADS LIST */}
          {threads.map((thread) => {
            const threadComments = commentsByThread[thread.id] || [];
            const isOwner = thread.authorId === currentUser?.uid;
            const createdDate = thread.createdAt?.toDate ? thread.createdAt.toDate() : new Date();
            const canEdit = isOwner && (Date.now() - createdDate.getTime() < 86400000);

            return (
              <Card key={thread.id} className="mb-4 shadow thread-card">
                <Card.Body>
                  <Row>
                    <Col md={1} className="text-center">
                      <Image src={thread.authorPhoto || '/default-avatar.png'} roundedCircle width="50" />
                    </Col>
                    <Col md={11}>
                      <div className="d-flex justify-content-between align-items-start">
                        <h5>{thread.title}</h5>
                        {isOwner && (
                          <div>
                            {canEdit && <Button variant="link" size="sm" onClick={() => startEditThread(thread)}><FaEdit /></Button>}
                            <Button variant="link" className="text-danger" onClick={() => deleteThread(thread.id, thread.authorId)}><FaTrash /></Button>
                          </div>
                        )}
                      </div>
                      <p className="text-muted small">
                        by <strong>{thread.authorName}</strong> • <FaClock className="me-1" />
                        {createdDate.toLocaleString()}
                      </p>
                      <Card.Text>{thread.content}</Card.Text>

                      {thread.mediaUrl && (
                        <div className="mb-3">
                          {thread.mediaType?.startsWith('image') ? (
                            <>
                              <FaImage className="text-primary me-2" style={{ fontSize: '1.3rem' }} />
                              <Image src={thread.mediaUrl} fluid className="media-preview" />
                            </>
                          ) : (
                            <>
                              <FaVideo className="text-danger me-2" style={{ fontSize: '1.3rem' }} />
                              <video src={thread.mediaUrl} controls className="media-preview w-100" />
                            </>
                          )}
                        </div>
                      )}

                      <div className="d-flex align-items-center text-muted mb-3" onClick={() => showLikers(thread)} style={{ cursor: 'pointer' }}>
                        <FaEye className="me-1" style={{ color: '#fd7e14' }} />
                        <span className="fw-bold" style={{ color: '#fd7e14' }}>{thread.views || 0} views</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>

                <Card.Footer className="bg-light py-3">
                  <Row className="text-center">
                    <Col xs={4} className="border-end">
                      <div onClick={() => handleLike(thread.id)} className="d-flex align-items-center justify-content-center gap-2 hover-scale" style={{ cursor: 'pointer' }}>
                        <span style={{ color: 'red', fontSize: '1.9rem' }}><FaHeart /></span>
                        <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>{thread.likes || 0}</span>
                      </div>
                    </Col>
                    <Col xs={4} className="border-end">
                      <div onClick={() => handleCommentClick(thread.id)} className="d-flex align-items-center justify-content-center gap-2 hover-scale" style={{ cursor: 'pointer' }}>
                        <span style={{ color: 'teal', fontSize: '1.9rem' }}><FaReply /></span>
                        <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>{threadComments.length}</span>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div onClick={() => handleCopyLink(thread.id)} className="d-flex align-items-center justify-content-center gap-2 hover-scale" style={{ cursor: 'pointer' }}>
                        <span style={{ color: 'orange', fontSize: '1.9rem' }}><FaShareAlt /></span>
                        <span className="fw-bold fs-5" style={{ color: '#fd7e14' }}>Share</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Footer>

                {expandedThreadId === thread.id && (
                  <Card.Body className="bg-white border-top">
                    <h6>Comments ({threadComments.length})</h6>
                    {threadComments.map(c => (
                      <div key={c.id} className="mb-3 p-3 border rounded">
                        <div className="d-flex justify-content-between">
                          <strong>{c.username}</strong>
                          {c.userId === currentUser?.uid && (
                            <div>
                              <Button variant="link" size="sm" onClick={() => handleEditComment(thread.id, c)}><FaEdit /></Button>
                              <Button variant="link" size="sm" className="text-danger" onClick={() => deleteComment(thread.id, c.id)}>Delete</Button>
                            </div>
                          )}
                        </div>
                        {editingCommentId === c.id ? (
                          <>
                            <Form.Control as="textarea" value={editText} onChange={e => setEditText(e.target.value)} />
                            <Button size="sm" onClick={() => saveEditedComment(thread.id)}>Save</Button>
                            <Button size="sm" variant="secondary" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                          </>
                        ) : <p>{c.text}</p>}
                      </div>
                    ))}
                    <InputGroup className="mt-3">
                      <Form.Control placeholder="Write a comment..." value={newCommentText} onChange={e => setNewCommentText(e.target.value)} />
                      <Button variant="teal" onClick={() => handlePostComment(thread.id)}>Post</Button>
                    </InputGroup>
                  </Card.Body>
                )}
              </Card>
            );
          })}
        </Container>

        {/* Create Thread Modal */}
        <Modal show={showCreateModal} onHide={cancelPosting} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editingThreadId ? 'Edit Thread' : 'New Thread'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={newThread.title} onChange={e => setNewThread({ ...newThread, title: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={5} value={newThread.content} onChange={e => setNewThread({ ...newThread, content: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Attach Image/Video (optional)</Form.Label>
                <Form.Control type="file" accept="image/*,video/*" onChange={e => setMediaFile(e.target.files[0])} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelPosting} disabled={posting}>Cancel</Button>
            <Button variant="primary" disabled={posting} onClick={editingThreadId ? saveEditedThread : createThread}>
              {posting ? 'Posting...' : editingThreadId ? 'Save Changes' : 'Post Thread'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Likers Modal */}
        <Modal show={showLikersModal} onHide={() => setShowLikersModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>❤️ Liked by</Modal.Title></Modal.Header>
          <Modal.Body>
            {selectedLikers.length === 0 ? <p>No likes yet</p> : selectedLikers.map((liker, i) => <p key={i}>❤️ {liker.name}</p>)}
          </Modal.Body>
        </Modal>

        {/* Auth Modal */}
        <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Login Required</Modal.Title></Modal.Header>
          <Modal.Body className="text-center">
            <p>You must be logged in to post, like, or comment.</p>
            <Button href="/signin" className="me-2 text-light">Log In</Button>
            <Button href="/signup"  className="me-2 text-orange">Sign Up</Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CommunityForumsPage;