import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ STEP 1: Define the API URL
// If running on Vercel, it uses the environment variable.
// If running locally, it falls back to localhost:3000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Guestbook = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  // Fetch all posts from your NestJS Backend
  const fetchPosts = async () => {
    try {
      // ✅ STEP 2: Use the variable here
      const response = await axios.get(`${API_URL}/guestbook`);
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
      // ✅ STEP 3: Use the variable here too
      await axios.post(`${API_URL}/guestbook`, formData);
      setFormData({ name: '', message: '' }); // Reset form
      fetchPosts(); // Reload the list
    } catch (error) {
      alert("Error: Could not connect to backend!");
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