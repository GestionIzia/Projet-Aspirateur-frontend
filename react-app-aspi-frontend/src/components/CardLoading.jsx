import React from 'react';
import './CardLoading.css'; // Assurez-vous d'avoir les styles pour le chargement

function CardLoading() {
  return (
    <div className="card-loading">
      <div className="card-loading-content">
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default CardLoading;
