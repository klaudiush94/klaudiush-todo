import React from 'react';
import Card from './Card';

export default function Section({ section, onAddCard, onEditCard, onDeleteCard }) {
  return (
    <div className="section">
      <div className="section-header">
        <h3>{section.name}</h3>
      </div>
      <div className="cards-list">
        {section.cards && section.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </div>
      <button className="add-button" onClick={() => onAddCard(section.id)}>
        + Add Card
      </button>
    </div>
  );
}
