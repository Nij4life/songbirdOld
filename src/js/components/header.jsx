import './header.scss';
import React from 'react';
import PropTypes from 'prop-types';

function Logo() {
  return <div className="logo" />;
}

function Score({ points }) {
  return (
    <div className="score">
      <span>
        Score:
        {points}
      </span>
    </div>
  );
}

function Pagination({ data, level }) {
  return (
    <ul className="pagination d-flex rounded">
      {data.map((el, ind) => (
        <Page key={el.id} title={el.title} active={level === ind ? 'active' : ''} />
      ))}
    </ul>
  );
}

function Page({ title, active }) {
  return <li className={active ? `${active} page` : 'page'}>{title}</li>;
}

function Header({ data, points, level }) {
  return (
    <header className="header">
      <div className="top-panel d-flex">
        <h1>songbird</h1>
        <Logo />
        <Score points={points} />
      </div>
      <Pagination data={data} level={level} />
    </header>
  );
}

export default Header;

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  points: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};

Score.propTypes = {
  points: PropTypes.number.isRequired,
};

Pagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  level: PropTypes.number.isRequired,
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
};
