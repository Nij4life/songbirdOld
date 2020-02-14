import './answerList.scss';
import React from 'react';
import PropTypes from 'prop-types';

function Answer({ id, name, onClickHandler }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li className="answer-list__item">
      <button className="answer-list__btn" type="button" onClick={e => onClickHandler(id, e)}>
        <span key={name} />
        {name}
      </button>
    </li>
  );
}

function AnswersList({ list, onClick }) {
  return (
    <ul className="answer-list">
      {list.map(el => (
        <Answer key={el.id} id={el.id} name={el.name} onClickHandler={onClick} />
      ))}
    </ul>
  );
}

export default AnswersList;

AnswersList.propTypes = {
  onClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
};

Answer.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
