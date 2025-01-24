import React, { useState } from 'react';
import style from './CommentPopup.module.css';

function CommentPopup({ comments, onClose, onSubmit }) {
  const [newComment, setNewComment] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment('');
    }
  };

  return (
    <div className={style.popup}>
      <div className={style.popupContent}>
        <h2>Comments</h2>
        <div className={style.commentsList}>
          {comments.map(comment => (
            <div key={comment._id} className={style.comment}>
              <p>{comment.text}</p>
              <span>{formatDate(comment.date)}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <div className={style.buttons}>
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit">Add Comment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentPopup;