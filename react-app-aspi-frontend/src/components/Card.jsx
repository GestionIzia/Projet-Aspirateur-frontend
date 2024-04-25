import React, { useState } from 'react';
import close from '../assets/fermer.png';
import wttj from '../assets/welcome-to-the-jungle-squarelogo.png'
import linkedin from '../assets/LinkedIn_logo_initials.png'
import sg from '../assets/SG_Logo.png'
import bpce from '../assets/bpce-logo.jpg'
import hw from '../assets/HW-logo.jpg'
import unlike from '../assets/contour-en-forme-de-coeur.png'
import liked from '../assets/silhouette-de-forme-simple-de-coeur.png'
import push from'../assets/verifier-push.png'
import jobteaser from '../assets/verifier-jobteaser.png'
import diplome from '../assets/diplome.png'
import horloge from '../assets/horloge.png'
import lieu from '../assets/lieu.png'
import './Card.css'

function Card({ openModal, cardInfo, isSelected }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showName, setShowName] = useState(false);

  const {WebSite, JobTitle, CompanieName, Location, Date, ContractType, UrlOffer, HtmlContent, Type } = cardInfo;

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
  };

  const getLikeImage = () => {
    return isLiked ? liked : unlike;
  };

  const handleMouseEnter = () => {
    setShowName(true);
  };

  const handleMouseLeave = () => {
    setShowName(false);
  };

  const getLogo = () => {
    if (WebSite === "WTTJ") {
      return wttj;
    } else if (WebSite === "Linkedin") {
      return linkedin;
    } else if (WebSite === "SG") {
      return sg;
    } else if (WebSite === "BPCE") {
      return bpce;
    } else if (WebSite === "HW") {
      return hw;
    } else {
      return ''; // Retourner une chaîne vide si le site Web n'est pas reconnu
    }
  }

  return (
    
  <div className={`card-izia ${isSelected ? 'selected' : ''}`} onClick={() => openModal(UrlOffer)}>
      <div className='card-contener-izia'></div>
      <div className='card-header-izia'>
        <button className='btn-close-izia'>
          <img className='btn-close-img-izia' src={close} alt="Close" />
        </button>
      </div>
      <div className='card-contain-izia'>
        <div className='card-presentation-izia'>
          <div className='card-jobtitle-izia'>
            <h1 className='h1-izia'>{JobTitle}</h1> 
          </div>

        </div>
        <div className='card-body-izia'>
          <div className='card-companie-izia'>{CompanieName}</div>
          <div className='card-infos-izia'>
            <div className='div-infos-izia'>
              <img className='card-location-img-izia' src={lieu} alt="Location Icon"/>
              <a className='card-location-izia'>{Location}</a>
            </div>
            <div className='div-infos-izia'>
              <img className='card-date-img-izia' src={horloge} alt="Date Icon"/>
              <a className='card-date-izia'>{Date}</a>
            </div>
            <div className='div-infos-izia'>
              <img className='card-contract-type-img-izia' src={diplome} alt="Contract Type Icon"/>
              <a className='card-contract-type-izia'>{ContractType}</a>
            </div>
          </div>
        </div>
      </div>
      <div className='card-margin-izia'>
      <div className='card-items-izia'>
        <button className='btn-card-like-izia' onClick={toggleLike}>
          <img className='card-like-img-izia' src={getLikeImage()} alt={isLiked ? 'Liked' : 'Not Liked'}/>
        </button>
        <img className='card-push-img-izia' src={push} alt="Push Icon"/>
        <img
          className='card-jobteaser-img-izia'
          src={jobteaser}
          alt="Jobteaser Icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {showName && <span className="Name-tooltip"></span>}
        </div>
        <div className='card-companie-logo-izia'>
            <img className='card-companie-logo-img-izia' src={getLogo()} alt="Company Logo"/>
          </div>
      </div>
    </div>
  );
}

export default Card;
