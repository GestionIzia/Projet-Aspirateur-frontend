import React from 'react';
import './Modal.css';
import defileur from '../assets/gauche-droite.png';

const Modal = ({ show, closeModal, htmlContent, urlOffer }) => {
    return (
        <div>
            <div className='card-modal-wrapper' style={{
                display: show ? 'block' : 'none',
                opacity: show ? '1' : '0'
            }}>
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
                        <div className='card-offer-description' dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </div>
                <div className='card-modal-footer'>
                    <form action={urlOffer} method="get" target="_blank">
                        <button className='card-modal-offer-btn' type="submit">Accéder à l'offre</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
