import React, { useState } from 'react';
import Post from './Post';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const PostList = ({ posts, onDelete, onEdit, onSort }) => {
  const [sortConfig, setSortConfig] = useState({
    field: '',
    direction: 'asc',
  });

  const requestSort = (field) => {
    let direction = 'asc';
    if (sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ field, direction });
    onSort(field, direction);
  };

  const getSortIcon = (field) => {
    if (sortConfig.field === field) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='title' onClick={() => requestSort('title')}>
              Title
              {getSortIcon('title')}
            </th>
            <th className='date' onClick={() => requestSort('publicationDate')}>
              Publication Date
              {getSortIcon('publicationDate')}
            </th>
            <th className='author' onClick={() => requestSort('author')}>
              Author
              {getSortIcon('author')}
            </th>
            <th className='category' onClick={() => requestSort('category')}>
              Category
              {getSortIcon('category')}
            </th>
            <th className='action'>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
