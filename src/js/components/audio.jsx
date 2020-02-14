import 'react-h5-audio-player/lib/styles.css';
import './audio.scss';
import AudioPlayer from 'react-h5-audio-player';
import React from 'react';
import PropTypes from 'prop-types';

function Audio({ src }) {
  return (
    <AudioPlayer
      autoPlay={false}
      src={src}
      showVolumeControl={false}
      showLoopControl={false}
      showJumpControls={false}
    />
  );
}

export default Audio;

Audio.propTypes = {
  src: PropTypes.string.isRequired,
};
