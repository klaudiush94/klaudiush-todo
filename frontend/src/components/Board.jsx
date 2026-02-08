import React, { useState, useEffect } from 'react';
import { getBoard, createCard, updateCard, deleteCard } from '../api';
import Section from './Section';
import AddCardModal from './AddCardModal';

export default function Board({ user, onLogout }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      setLoading(true);
      const board = await getBoard();
      setSections(board);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = (section_id) => {
    setSelectedCard(null);
    setSelectedSection(section_id);
    setShowModal(true);
  };

  const handleEditCard = (card) => {
    setSelectedCard(card);
    setSelectedSection(null);
    setShowModal(true);
  };

  const handleSaveCard = async (cardData) => {
    try {
      if (cardData.id) {
        // Update existing card
        await updateCard(cardData.id, cardData.title, cardData.content, cardData.section_id);
      } else {
        // Create new card
        await createCard(cardData.section_id, cardData.title, cardData.content);
      }
      await fetchBoard();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      await deleteCard(cardId);
      await fetchBoard();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading board...</div>;

  const section_id = selectedCard ? selectedCard.section_id : selectedSection;

  return (
    <>
      <header>
        <h1>📋 Klaudiush Todo</h1>
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button className="btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}

      <div className="board-container">
        {sections.map(section => (
          <Section
            key={section.id}
            section={section}
            onAddCard={handleAddCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>

      {showModal && (
        <AddCardModal
          sections={sections}
          card={selectedCard}
          onSave={handleSaveCard}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
