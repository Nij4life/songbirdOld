import './information.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Audio from './audio';

function Information({ currentBirds, current }) {
  if (current < 0) {
    return (
      <div className="information">
        <p className="information__text">Послушайте плеер.</p>
        <p className="information__text">Выберите птицу из списка</p>
      </div>
    );
  }

  const { name, species, description, image, audio } = currentBirds[current - 1];
  return (
    <div className="information">
      <div className="information__data">
        <img className="bird-image" src={image} alt="Bird" />
        <div>
          <p className="bird-name">{name}</p>
          <p className="bird-species">{species}</p>
          <Audio key={name} src={audio} />
        </div>
      </div>
      <p className="information__text">{description}</p>
    </div>
  );
}

export default Information;

Information.propTypes = {
  currentBirds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      species: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      audio: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.number.isRequired,
};
