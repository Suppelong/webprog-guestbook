import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Guestbook = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  // Fetch all posts from your NestJS Backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/guestbook');
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => { 
    fetchPosts(); 
  }, []);

  // Handle submitting a new guestbook entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/guestbook', formData);
      setFormData({ name: '', message: '' }); // Reset form
      fetchPosts(); // Reload the list
    } catch (error) {
      alert("Error: Make sure your NestJS backend is running on port 3000!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Sign the Guestbook</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <textarea 
          placeholder="Message" 
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})} 
          required 
        />
        <button type="submit">Post Message</button>
      </form>

      <hr />
      <h3>Messages</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.name}:</strong> {post.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guestbook;