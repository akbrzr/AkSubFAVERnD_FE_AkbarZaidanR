import React, { useState } from 'react';

const PostForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, publicationDate, author, category });
    setTitle('');
    setPublicationDate('');
    setAuthor('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Publication Date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Business">Business</option>
      </select>
      <button className='button-post' type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
