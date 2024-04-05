import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Modal from './components/Modal';
import CardLoading from './components/CardLoading';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cardInfos, setCardInfos] = useState([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Ajoutez l'état pour la requête de recherche

  const API_BASE_URL = 'http://localhost:5244/Scraping';

  const openModal = (urlOffer) => {
    // Trouver l'index de l'offre dans la liste filtrée
    const index = cardInfos.findIndex(card => card.UrlOffer === urlOffer);
    setSelectedOfferIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const wttjResponse = await axios.get(`${API_BASE_URL}/scrape-wttj`);
        const wttjJobOffers = wttjResponse.data.slice(0, 12);

        const linkedInResponse = await axios.get(`${API_BASE_URL}/scrape-linkedin`);
        const linkedInJobOffers = linkedInResponse.data.slice(0, 12);
        
        const sgResponse = await axios.get(`${API_BASE_URL}/scrape-sg`);
        const sgJobOffers = sgResponse.data.slice(0, 12);

        const combinedJobOffers = [...wttjJobOffers, ...linkedInJobOffers, ...sgJobOffers];

        setCardInfos(combinedJobOffers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };
    fetchJobOffers();
  }, []);

  // Fonction pour filtrer les offres en fonction de la localisation
  const filterOffers = (offers, query) => {
    if (!query) return offers;
  
    const keywords = query.trim().toLowerCase().split(/[ ,+]+/);
  
    return offers.filter(offer => {
      const { Location, ContractType, Date, CompanieName, JobTitle, WebSite } = offer;
      return keywords.every(keyword =>
        Location.toLowerCase().includes(keyword) ||
        ContractType.toLowerCase().includes(keyword) ||
        Date.toLowerCase().includes(keyword) ||
        CompanieName.toLowerCase().includes(keyword) ||
        JobTitle.toLowerCase().includes(keyword)||
        WebSite.toLowerCase().includes(keyword)
      );
    });
  };
  
  // Gérer le changement dans la barre de recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <div>
      <SearchBar onSearch={handleSearch} /> {/* Passer la fonction de recherche au composant SearchBar */}
      </div>
      <div className={`App ${showModal ? 'modal-open' : ''}`}>
        <div className="card-grid">
          {isLoading ? (
            Array.from({ length: 28 }).map((_, index) => (
              <CardLoading key={index} />
            ))
          ) : (
            // Filtrer les offres en fonction de la requête de recherche avant de les afficher
            filterOffers(cardInfos, searchQuery).map((cardInfo, index) => (
              <Card
                key={index}
                cardInfo={cardInfo}
                openModal={() => openModal(cardInfo.UrlOffer)} // Passer l'URL de l'offre à la fonction openModal
                isSelected={selectedOfferIndex === index}
              />
            ))
          )}
        </div>
        {showModal && (
          <Modal show={showModal} closeModal={closeModal} cardInfo={cardInfos[selectedOfferIndex]} />
        )}
      </div>
    </div>
  );
}

export default App;
