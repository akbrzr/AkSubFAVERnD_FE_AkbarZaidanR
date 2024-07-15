import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './index.css';
import logo from "/logo.svg";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handleAddPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (postId, updatedPost) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
  };

  const handleDeleteAllPosts = () => {
    setPosts([]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedPosts = filteredPosts.sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'title') {
      return factor * a.title.localeCompare(b.title);
    } else if (sortBy === 'publicationDate') {
      return factor * (new Date(a.publicationDate) - new Date(b.publicationDate));
    } else if (sortBy === 'author') {
      return factor * a.author.localeCompare(b.author);
    } else if (sortBy === 'category') {
      return factor * a.category.localeCompare(b.category);
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className='header'>
        <img className='logo' src={logo} alt="" />
        <h1>Database of Article Filemagz</h1>
      </div>

      <div className='garis'></div>

      <div className='input-container'>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : '+ Add New Article'}
        </button>
        {showForm && <PostForm onAdd={handleAddPost} />}
      </div>

      <div className='search-container'>
        <p>Total Article : {posts.length}</p>

        <div className='search'>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <PostList
        posts={currentPosts}
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
        onSort={handleSort}
      />

      <div className='page'>
        <div className='page-num'>
          {currentPage > 1 && (
            <button onClick={prevPage}>Previous</button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => goToPage(index + 1)}>
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={nextPage}>Next</button>
          )}
        </div>
        <button className='deleteall' onClick={handleDeleteAllPosts}>Delete All Article</button>
      </div>
    </div>
  );
};

export default App;
