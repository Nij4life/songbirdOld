import './question.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Audio from './audio';

function Question({ random, guessed, imageClosed }) {
  const { audio, image, name } = random;
  return (
    <div className="question rounded">
      <img className="bird-image" src={guessed ? image : imageClosed} alt="Bird" />
      <div className="question__body">
        <p className="bird-name">{guessed ? name : '*'.repeat(name.length)}</p>
        <Audio key={name} src={audio} />
        {/* ref={c => (this.Player = c)} */}
      </div>
    </div>
  );
}

export default Question;

Question.propTypes = {
  random: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    audio: PropTypes.string,
  }).isRequired,
  guessed: PropTypes.bool.isRequired,
  imageClosed: PropTypes.string.isRequired,
};
