import React from 'react';
import './Modal.css';
import defileur from '../assets/gauche-droite.png';

const Modal = ({ show, closeModal, cardInfo }) => {
  const { CompanieName, JobTitle, ContractType, Location, Date, UrlOffer, HtmlContent } = cardInfo;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
      alert('Lien copié dans le presse-papiers !');
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      alert('Une erreur est survenue lors de la copie du lien dans le presse-papiers.');
    }
  };

  return (
    <div>
      <div className='card-modal-wrapper' style={{ display: show ? 'block' : 'none', opacity: show ? '1' : '0' }}>
        <div className='card-modal-margin'>
          <button className='card-modal-defileur-btn' onClick={closeModal}>
            <img className='card-modal-defileur-img' src={defileur} alt="Défileur"/>
          </button>
        </div>
        <div className='card-modal-header'>
          <h2>Descriptif de l'offre</h2>
          <span className='card-close-modal-btn' onClick={closeModal}>X</span>
        </div>
        <div className='card-modal-body'>
          <div className='card-offer-description-wrapper'>          
            <div className='card-offer-description' dangerouslySetInnerHTML={{ __html: HtmlContent }} />
          </div>
        </div>
        <div className='card-modal-footer'>
            <button className='card-modal-offer-btn' onClick={() => copyToClipboard(UrlOffer)}>Copier le lien de l'offre</button>
        </div>
      </div>
    </div>
  );      
};

export default Modal;
