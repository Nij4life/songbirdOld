import React from 'react';
import PropTypes from 'prop-types';

export default function Victory({ points }) {
  return (
    <>
      <div className="victory d-block">
        <h2>Поздравляем!</h2>
        <h3>
          Вы прошли викторину и набрали
          {`  ${points}  `}
          из 30 возможных баллов.
        </h3>
      </div>
      <div className="next-level">
        <button
          className="active next-level__btn"
          type="button"
          onClick={() => window.location.reload()}
        >
          Попробовать еще раз!
        </button>
      </div>
    </>
  );
}

Victory.propTypes = {
  points: PropTypes.number.isRequired,
};
