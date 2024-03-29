import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Card from './components/Card';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cardInfos, setCardInfos] = useState([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);
  const API_BASE_URL = 'http://localhost:5244/Scraping';

  const openModal = (index) => {
    setSelectedOfferIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        // Fetch WTTJ job offers
        const wttjResponse = await axios.get(`${API_BASE_URL}/scrape-wttj`);
        const wttjJobOffers = wttjResponse.data.slice(0, 12);

        // Fetch LinkedIn job offers
        const linkedInResponse = await axios.get(`${API_BASE_URL}/scrape-linkedin`);
        const linkedInJobOffers = linkedInResponse.data.slice(0, 12);

        // Combine WTTJ and LinkedIn job offers
        const combinedJobOffers = [...wttjJobOffers, ...linkedInJobOffers];

        // Update cardInfos state with combined job offers
        setCardInfos(combinedJobOffers);
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };
    fetchJobOffers();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div className={`App ${showModal ? 'modal-open' : ''}`}>
      <div className="card-grid">
        {cardInfos.map((cardInfo, index) => (
          <Card
            key={index}
            cardInfo={cardInfo}
            openModal={() => openModal(index)}
            isSelected={selectedOfferIndex === index}
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
