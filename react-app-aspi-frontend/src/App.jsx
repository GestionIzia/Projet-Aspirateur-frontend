import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Card from './components/Card.jsx';
import Modal from './components/Modal.jsx'; 

function App() {
  const [show, setShow] = useState(false);
  const [cardInfos, setCardInfos] = useState([]); 
  const [htmlContent, setHtmlContent] = useState('');

  const openModal = async (urlOffer) => {
    // Appel de l'API pour récupérer le contenu HTML de l'URL spécifique
    try {
      const response = await axios.get(`http://localhost:5244/Scraping/scrape-html-content?url=${encodeURIComponent(urlOffer)}`);
      setHtmlContent(response.data);
      setShow(true);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération du contenu HTML :', error);
    }
  };
  const closeModal = () => {
    setShow(false);
  };

  useEffect(() => {
    axios.get('http://localhost:5244/Scraping/scrape-job-offers')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setCardInfos(response.data.slice(0, 12)); // Prendre les douze premières cartes
        
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  return (
    <div className={`App ${show ? 'modal-open' : ''}`}>
      <div className="card-grid">
        {cardInfos.map((cardInfo, index) => (
          <Card key={index} cardInfo={cardInfo} openModal={openModal} />
        ))}
      </div>
      
      <Modal show={show} closeModal={closeModal} htmlContent={htmlContent} />
    </div>
  );
}

export default App;
