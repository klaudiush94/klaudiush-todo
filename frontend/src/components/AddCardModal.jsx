import React, { useState, useEffect } from 'react';

export default function AddCardModal({ sections, card, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [section_id, setSectionId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setContent(card.content);
      setSectionId(card.section_id);
    } else if (sections.length > 0) {
      setSectionId(sections[0].id);
    }
  }, [card, sections]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await onSave({
        id: card?.id,
        title: title.trim(),
        content: content.trim(),
        section_id: parseInt(section_id)
      });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{card ? 'Edit Card' : 'Add Card'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter card description"
            />
          </div>

          <div className="form-group">
            <label>Section</label>
            <select value={section_id} onChange={(e) => setSectionId(e.target.value)}>
              {sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {card ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
