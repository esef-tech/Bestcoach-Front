// src/pages/SingleBlogPage.jsx - Fixed error handling for undefined id/full post view
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Get id from URL
import { FaCalendarAlt, FaUser } from 'react-icons/fa';



// Mock posts data (same as BlogPage - share via context or API in real app)
const posts = [ // Repeat array from BlogPage here or import shared data
  // ... all 12 posts with fullContent
];

const SingleBlogPage = () => {
  const { id } = useParams(); // Get post id from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Find post by id (simulate fetch)
    const foundPost = posts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setError('Post not found');
    }
    setLoading(false);
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;

  return (
    <Container className="py-5">
      <h1 className="text-orange mb-4 animate-fade-in">{post.title}</h1>
      <Image src={post.image} alt={post.title} fluid className="mb-4 rounded animate-zoom-in" />
      <div className="d-flex text-muted mb-4">
        <FaCalendarAlt className="me-2" /> {post.date}
        <FaUser className="ms-4 me-2" /> {post.author}
      </div>
      <div className="lead animate-fade-in" dangerouslySetInnerHTML={{ __html: post.fullContent }} />
    </Container>
  );
};

export default SingleBlogPage;