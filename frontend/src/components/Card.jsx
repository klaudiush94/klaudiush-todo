import React from 'react';

export default function Card({ card, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card">
      <div className="card-title">{card.title}</div>
      {card.content && <div className="card-content">{card.content}</div>}
      <div className="card-meta">
        by {card.created_by_name} • {formatDate(card.created_at)}
      </div>
      <div className="card-actions">
        <button className="btn-primary" onClick={() => onEdit(card)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    </div>
  );
}
