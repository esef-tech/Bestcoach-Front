// src/pages/CommunityForumsPage.jsx - Dynamic, responsive, animated replication of freeCodeCamp forum
import React, { useState, useEffect } from 'react'; // ✅ Added useEffect
import { Container, Row, Col, Form, Button, Card, Image, Modal } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa'; // ✅ Removed unused: FaSearch, FaUsers, FaReply, FaEye, FaImage, FaVideo
import { FaPlus } from 'react-icons/fa';
import './Community.css';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, deleteDoc, arrayUnion, doc, updateDoc, setDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {  FaReply, FaUsers,  FaEye, FaHeart, FaShareAlt, FaTrash, FaImage, FaVideo } from 'react-icons/fa';

// ✅ Removed unused: Link


const Community = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [mediaFile, setMediaFile] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null); // for reply modal
  const [replyContent, setReplyContent] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(setUser);

    const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
    const unsubscribeThreads = onSnapshot(q, (snapshot) => {
      setThreads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const onlineQuery = collection(db, 'onlineUsers');
    const unsubscribeOnline = onSnapshot(onlineQuery, (snap) => {
      setOnlineCount(snap.size);
    });


    return () => {
      unsubscribeAuth();
      unsubscribeThreads();
      unsubscribeOnline();
    };
  }, []);

// Create new thread
  const createThread = async () => {
    if (!user) {
      toast.warning("You must be logged in to create a thread.");
      return;
    }

    let mediaUrl = '';
    if (mediaFile) {
      const mediaRef = ref(storage, `thread-attachments/${Date.now()}_${mediaFile.name}`);
      await uploadBytes(mediaRef, mediaFile);
      mediaUrl = await getDownloadURL(mediaRef);
    }

    await addDoc(collection(db, 'threads'), {
      title: newThread.title,
      content: newThread.content,
      authorId: user.uid,
      authorName: user.displayName?.split(' ')[0] || 'User',
      authorPhoto: user.photoURL || '',
      mediaUrl,
      mediaType: mediaFile ? mediaFile.type : null,
      createdAt: serverTimestamp(),
      likes: 0,
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
    if (authorId !== user?.uid) return;
    if (!window.confirm("Delete this thread permanently?")) return;

    await deleteDoc(doc(db, 'threads', threadId));
    toast.success("Thread deleted");
  };


  // Like a thread
  // Like thread - protected
  const toggleLike = async (threadId, likedBy) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const threadRef = doc(db, 'threads', threadId);
    const alreadyLiked = likedBy?.includes(user.uid) || false;

    await updateDoc(threadRef, {
      likes: alreadyLiked ? -1 : 1,
      likedBy: alreadyLiked 
        ? likedBy.filter(id => id !== user.uid) 
        : arrayUnion(user.uid)
    });
  };

  // Post reply (real-time)
 // Post reply - protected
  const postReply = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    if (!selectedThreadId || !replyContent.trim()) return;

    const replyRef = collection(db, 'threads', selectedThreadId, 'replies');
    await addDoc(replyRef, {
      content: replyContent,
      authorId: user.uid,
      authorName: user.displayName?.split(' ')[0] || 'User',
      authorPhoto: user.photoURL || '',
      createdAt: serverTimestamp()
    });

    const threadRef = doc(db, 'threads', selectedThreadId);
    await updateDoc(threadRef, { replyCount: (threads.find(t => t.id === selectedThreadId)?.replyCount || 0) + 1 });

    toast.success("Reply posted successfully!");
    setReplyContent('');
    setShowReplyModal(false);
  };

  useEffect(() => {
    // Auth listener
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Add user to onlineUsers when logged in
        setDoc(doc(db, 'onlineUsers', currentUser.uid), {
          onlineAt: serverTimestamp(),
          displayName: currentUser.displayName || 'User'
        });
      }
    });

    // Real-time threads
    const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
    const unsubscribeThreads = onSnapshot(q, (snapshot) => {
      setThreads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Real-time online count
    const onlineQuery = collection(db, 'onlineUsers');
    const unsubscribeOnline = onSnapshot(onlineQuery, (snap) => {
      setOnlineCount(snap.size);
    });

    // Cleanup when user leaves the page
    return () => {
      unsubscribeAuth();
      unsubscribeThreads();
      unsubscribeOnline();

      // Remove user from online when leaving the page
      if (auth.currentUser) {
        deleteDoc(doc(db, 'onlineUsers', auth.currentUser.uid));
      }
    };
  }, []);

// Real-time listeners
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(setUser);

    const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
    const unsubscribeThreads = onSnapshot(q, (snapshot) => {
      setThreads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const onlineQuery = collection(db, 'onlineUsers');
    const unsubscribeOnline = onSnapshot(onlineQuery, (snap) => setOnlineCount(snap.size));

    return () => {
      unsubscribeAuth();
      unsubscribeThreads();
      unsubscribeOnline();
    };
  }, []);

  // Share thread - protected
  const shareThread = (threadId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const link = `${window.location.origin}/community#thread-${threadId}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard! Share it anywhere.");
    });
  };


  



  return (
    <div className="community-forums">
      {/* Header */}
      <div className="forums-header  text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">Community Forums</h1>
          <p className="lead mb-0">
            <FaUsers className="me-2" /> 
            {onlineCount} musicians online
            <span className="online-dot ms-2"></span>
          </p>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col className="text-end mb-4">
            <Button variant="primary" size="lg" onClick={() => setShowCreateModal(true)}>
              <FaPlus className="me-2" /> Start New Thread
            </Button>
          </Col>
        </Row>

{threads.map((thread) => (
          <Card key={thread.id} className="mb-4 thread-card shadow-sm">
            <Card.Body>
              <Row>
                <Col md={1} className="text-center">
                  <img src={thread.authorPhoto || '/default-avatar.png'} alt="" className="rounded-circle" width="50" />
                </Col>
                <Col md={11}>
                  <div className="d-flex justify-content-between align-items-start">
                    <h5>{thread.title}</h5>
                    {thread.authorId === user?.uid && (
                      <Button variant="link" className="text-danger p-0" onClick={() => deleteThread(thread.id, thread.authorId)}>
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                  <p className="text-muted small">
                    by <strong>{thread.authorName}</strong> • <FaClock className="me-1" />
                    {thread.createdAt?.toDate ? thread.createdAt.toDate().toLocaleString() : 'Just now'}
                  </p>
                  <p>{thread.content}</p>


               {/* Media Preview with Icons */}
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
                  {/* Actions */}
                  {/* Action Bar */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex gap-4">
                      <Button 
                        variant="link" 
                        className={`like-btn ${thread.likedBy?.includes(user?.uid) ? 'liked' : ''}`}
                        onClick={() => toggleLike(thread.id, thread.likedBy || [])}
                      >
                        <FaHeart className="me-1" /> {thread.likes || 0}
                      </Button>

                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSelectedThreadId(thread.id);
                          setShowReplyModal(true);
                        }}
                      >
                        <FaReply className="me-1" /> {thread.replyCount || 0}
                      </Button>

                      <Button variant="link" onClick={() => {
                        navigator.clipboard.writeText(window.location.href + `#thread-${thread.id}`);
                        toast.success("Link copied to clipboard!");
                      }}>
                        <Button variant="link" onClick={() => shareThread(thread.id)}></Button>
                        <FaShareAlt className="me-1" /> Share
                      </Button>
                    </div>

                    <div className="text-muted small">
                      <FaEye className="me-1" /> {thread.views || 0} views
                    </div>
                  </div>

                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* Create Thread Modal */}
      {/* Create Thread Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={newThread.title} onChange={(e) => setNewThread({...newThread, title: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={5} value={newThread.content} onChange={(e) => setNewThread({...newThread, content: e.target.value})} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Attach Image or Video (optional)</Form.Label>
              <Form.Control type="file" accept="image/*,video/*" onChange={(e) => setMediaFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={createThread}>Post Thread</Button>
        </Modal.Footer>
      </Modal>
      {/* Reply Modal */}
      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                value={replyContent} 
                onChange={(e) => setReplyContent(e.target.value)} 
                placeholder="Write your reply..."
                required 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplyModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={postReply}>Post Reply</Button>
        </Modal.Footer>
      </Modal>

{/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <p>You must be logged in to like, comment, or share threads.</p>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowLoginPrompt(false);
              // Trigger your existing login modal here
              // Example: document.dispatchEvent(new Event('openLoginModal'));
              toast.info("Opening login modal...");
            }}
          >
            Login or Sign Up Now
          </Button>
        </Modal.Body>
      </Modal>




    </div>
  );
};

export default Community; // ✅ Added missing export