import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Card from './components/Card';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cardInfos, setCardInfos] = useState([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(null); // Nouvel état pour stocker l'index de la carte sélectionnée
  const API_BASE_URL = 'http://localhost:5244/Scraping';

  const openModal = (index) => { // Prend en argument l'index de la carte sélectionnée
    setSelectedOfferIndex(index); // Met à jour l'index de la carte sélectionnée
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/scrape-html-content`);
        if (response.data && response.data.length > 0) {
          setCardInfos(response.data.slice(0, 12));
        }
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };
    fetchJobOffers();
  }, []);

  return (
    <div className={`App ${showModal ? 'modal-open' : ''}`}>
      <div className="card-grid">
        {cardInfos.map((cardInfo, index) => (
          <Card
            key={index}
            cardInfo={cardInfo}
            openModal={() => openModal(index)} // Passe l'index de la carte lorsqu'elle est sélectionnée
            isSelected={selectedOfferIndex === index} // Ajoute une prop isSelected avec une valeur booléenne
          />
        ))}
      </div>
      {showModal && (
        <Modal show={showModal} closeModal={closeModal} cardInfo={cardInfos[selectedOfferIndex]} />
      )}
    </div>
  );
}

export default App;
