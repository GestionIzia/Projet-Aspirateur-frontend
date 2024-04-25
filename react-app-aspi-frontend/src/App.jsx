import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Modal from './components/Modal';
import CardLoading from './components/CardLoading';
import FiltersModal from './components/FiltersModal';
import { sortCardsByDate } from './helpers/dateUtils';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [cardInfos, setCardInfos] = useState([]);
    const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const API_BASE_URL = 'http://localhost:5244/Scraping';

    const openModal = (urlOffer) => {
        const index = cardInfos.findIndex(card => card.UrlOffer === urlOffer);
        setSelectedOfferIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openFiltersModal = () => {
        setSelectedFilters([]);
        setShowFiltersModal(true);
    };

    const closeFiltersModal = () => {
        setShowFiltersModal(false);
    };

    const handleFilterChange = (filters) => {
        setSelectedFilters(filters);
    };
   useEffect(() => {
        const handleScroll = () => {
            const modal = document.querySelector('.card-modal-wrapper');
            const description = document.querySelector('.card-offer-description');
            const scrollPosition = window.scrollY;
    
            // Hauteur de décalage désirée pour le modal lorsque le scroll est en haut
            const desiredOffset = 150; // Ajustez selon vos besoins
    
            if (modal) { // Vérifier si l'élément modal existe
                if (scrollPosition <= 0) {
                    // Ajustez la position du modal
                    modal.style.top = desiredOffset + 'px';
                
                } else {
                    // Réinitialisez la position du modal
                    modal.style.top = '30px'; // Réinitialisez la position pour qu'elle soit gérée par les styles CSS par défaut ou par d'autres règles CSS
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const wttjResponse = await axios.get(`${API_BASE_URL}/scrape-wttj`);
                const wttjJobOffers = wttjResponse.data.slice(0, 5);

                const linkedInResponse = await axios.get(`${API_BASE_URL}/scrape-linkedin`);
                const linkedInJobOffers = linkedInResponse.data.slice(0, 50);

                const sgResponse = await axios.get(`${API_BASE_URL}/scrape-sg`);
                const sgJobOffers = sgResponse.data.slice(0, 50);

                const bpceResponse = await axios.get(`${API_BASE_URL}/scrape-bpce`);
                const bpceJobOffers = bpceResponse.data.slice(0, 50);

                const hwResponse = await axios.get(`${API_BASE_URL}/scrape-hw`);
                const hwJobOffers = hwResponse.data.slice(0, 50);

                const combinedJobOffers = [...wttjJobOffers, ...linkedInJobOffers, ...sgJobOffers, ...bpceJobOffers, ...hwJobOffers];
                const sortedOffers = sortCardsByDate(combinedJobOffers);
                console.log({sortedOffers});

                setCardInfos(sortedOffers);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching job offers:', error);
                setIsLoading(false);
            }
        };
        fetchJobOffers();
    }, []);
 
    
    
    
    const filterOffers = (offers, query) => {
        if (!query && selectedFilters.length === 0) return offers;

        const keywords = query.trim().toLowerCase().split(/[,+]+/);
        const isSelectedJobboard = selectedFilters.includes('jobboard');
        const isSelectedCareerCenter = selectedFilters.includes('careerscenter');

        return offers.filter(offer => {
            const { Location, ContractType, Date, CompanieName, JobTitle, WebSite, Type, HtmlContent } = offer;

            if (isSelectedJobboard && isSelectedCareerCenter) {
                return true;
            }

            if (isSelectedJobboard && Type === 1) {
                return true;
            }

            if (isSelectedCareerCenter && Type === 2) {
                return true;
            }

            const contentKeywords = HtmlContent?.toLowerCase().split(/\s+/) ?? [];

            return keywords.some(keyword =>
                Location.toLowerCase().includes(keyword) ||
                ContractType.toLowerCase().includes(keyword) ||
                Date.toLowerCase().includes(keyword) ||
                CompanieName.toLowerCase().includes(keyword) ||
                JobTitle.toLowerCase().includes(keyword) ||
                WebSite.toLowerCase().includes(keyword) ||
                contentKeywords.includes(keyword)
            );
        });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} onOpenFilters={openFiltersModal} />
            <FiltersModal show={showFiltersModal} onClose={closeFiltersModal} onFilterChange={handleFilterChange} />
            <div className={`App ${showModal ? 'modal-open' : ''}`}>
                <div className="card-grid">
                    {isLoading ? (
                        Array.from({ length: 28 }).map((_, index) => (
                            <CardLoading key={index} />
                        ))
                    ) : (
                        filterOffers(cardInfos, searchQuery).map((cardInfo, index) => (
                            <Card
                                key={index}
                                cardInfo={cardInfo}
                                openModal={() => openModal(cardInfo.UrlOffer)}
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
