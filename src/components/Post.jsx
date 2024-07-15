import React, { useState } from 'react';

const Post = ({ post, onDelete, onEdit }) => {
  const { id, title, publicationDate, author, category } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPublicationDate, setEditedPublicationDate] = useState(publicationDate);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedCategory, setEditedCategory] = useState(category);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, {
      title: editedTitle,
      publicationDate: editedPublicationDate,
      author: editedAuthor,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <tr className='edit-input'>
      <td>
        {isEditing ? (
          <input className='title'
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          title
        )}
      </td>
      <td>
        {isEditing ? (
          <input className='date'
            type="date"
            value={editedPublicationDate}
            onChange={(e) => setEditedPublicationDate(e.target.value)}
          />
        ) : (
          publicationDate
        )}
      </td>
      <td>
        {isEditing ? (
          <input className='author'
            type="text"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
          />
        ) : (
          author
        )}
      </td>
      <td>
        {isEditing ? (
          <select className='category'
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
        ) : (
          category
        )}
      </td>
      <td className='container-button-save'>
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        )}
        <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Post;
