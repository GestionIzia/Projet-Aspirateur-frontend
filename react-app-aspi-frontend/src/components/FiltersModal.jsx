import React, { useState } from 'react';
import './FiltersModal.css';

const FiltersModal = ({ show, onClose, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedFilters([...selectedFilters, value]);
        } else {
            setSelectedFilters(selectedFilters.filter(filter => filter !== value));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        // Appeler la fonction de filtrage avec les filtres sélectionnés
        onFilterChange(selectedFilters);
        // Fermer le modal après la soumission du formulaire
        onClose();
    };

    return (
        <div className='filter-modal' style={{ display: show ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='btn-close' onClick={onClose}>X</div>
                <h1>Tous les filtres</h1>
                <form id='form-filters' onSubmit={handleSubmit}>
                    <div className='type-choice'>
                        <h2>Provenance des offres</h2>
                        <div>
                            <input type="checkbox" id="jobboard" value="jobboard" onChange={handleFilterChange}/>
                            <label htmlFor="jobboard">Jobboards</label>
                        </div>
                        <div>
                            <input type="checkbox" id="careerscenter" value="careerscenter" onChange={handleFilterChange}/>
                            <label htmlFor="careerscenter">Career Centers</label>
                        </div>
                    </div>
                    <button className='results' type='submit'>Explorer les offres</button>
                </form>
            </div>
        </div>
    );
};

export default FiltersModal;
