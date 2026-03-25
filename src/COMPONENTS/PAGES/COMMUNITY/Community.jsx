// src/pages/CommunityForumsPage.jsx - Dynamic, responsive, animated replication of freeCodeCamp forum
import React, { useState, useEffect } from 'react'; // ✅ Added useEffect
import { Container, Row, Col, Form, Button, Card, Image, Modal } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa'; // ✅ Removed unused: FaSearch, FaUsers, FaReply, FaEye, FaImage, FaVideo
import { FaPlus } from 'react-icons/fa';
import './Community.css';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// ✅ Removed unused: Link


const Community = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [mediaFile, setMediaFile] = useState(null);
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
      authorName: user.displayName || 'Anonymous',
      authorPhoto: user.photoURL || '',
      mediaUrl,
      mediaType: mediaFile ? mediaFile.type : null,
      createdAt: serverTimestamp(),
      replyCount: 0
    });

    toast.success("Thread created successfully!");
    setShowCreateModal(false);
    setNewThread({ title: '', content: '' });
    setMediaFile(null);
  };

  return (
    <div className="community-forums">
      {/* Header */}
      <div className="forums-header bg-teal text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">Community Forums</h1>
          <p className="lead mb-0">Real-time discussions • {onlineCount} musicians online</p>
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
                  <h5>{thread.title}</h5>
                  <p className="text-muted small">
                    by {thread.authorName} • <FaClock className="me-1" />
                    {thread.createdAt?.toDate ? thread.createdAt.toDate().toLocaleString() : 'Just now'}
                  </p>
                  <p>{thread.content}</p>
                  {thread.mediaUrl && (
                    thread.mediaType?.startsWith('image') ?
                      <Image src={thread.mediaUrl} fluid className="media-preview" /> :
                      <video src={thread.mediaUrl} controls className="media-preview w-100" />
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* Create Thread Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={newThread.title} onChange={(e) => setNewThread({ ...newThread, title: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={5} value={newThread.content} onChange={(e) => setNewThread({ ...newThread, content: e.target.value })} required />
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
    </div>
  );
};

export default Community; // ✅ Added missing export