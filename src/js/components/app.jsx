import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IMAGE, LEVEL } from '../lib/constants';
import birdsData from '../lib/birds';
import Header from './header';
import Question from './question';
import AnswersList from './answerList';
import Information from './information';
import Victory from './victory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      points: 0,
      tried: 0,
      answerId: null,
      win: false,
      level: LEVEL.START,
      random: this.getRandomBird(this.props),
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.updateStateFull = this.updateStateFull.bind(this);
  }

  onClickHandler(answerId, { target }) {
    const el = target.closest('.answer-list__item');
    if (!el) return null;

    const {
      guessed,
      random: { id },
    } = this.state;

    if (guessed) {
      this.setState({ answerId });
      return null;
    }

    const span = target.firstElementChild;

    if (id === answerId) {
      span.style.background = '#00bc8c';
      this.updateState(true, answerId);
    } else {
      this.updateState(false, answerId);
      span.style.background = '#d62c1a';
    }
    return null;
  }

  getRandomBird({ birds }) {
    const { level } = this.state ? this.state : { level: -1 };
    const max = birds[level + 1].data.length;
    return birds[level + 1].data[Math.floor(Math.random() * max)];
  }

  updateState(answerIsCorrect, answerId) {
    const { guessed } = this.state;
    if (answerIsCorrect) {
      this.setState(() => {
        return {
          guessed: true,
          answerId,
        };
      });
    } else if (!guessed) {
      this.setState(state => {
        return { tried: state.tried + 1, answerId };
      });
    }
  }

  updateStateFull() {
    const { level, guessed } = this.state;
    if (!guessed) return null;
    if (level === LEVEL.FINISH - 1) {
      this.setState(state => {
        return {
          win: true,
          points: state.tried > 5 ? state.points : state.points + 5 - state.tried,
        };
      });
      return null;
    }

    this.setState(state => {
      return {
        guessed: false,
        level: state.level + 1,
        points: state.tried > 5 ? state.points : state.points + 5 - state.tried,
        tried: 0,
        answerId: null,
        random: this.getRandomBird(this.props),
      };
    });

    return null;
  }

  render() {
    const { birds } = this.props;
    const { points, random, guessed, level, answerId, win } = this.state;
    const pagination = birds.map(el => {
      return {
        id: el.id,
        title: el.title,
      };
    });

    if (win) {
      return (
        <>
          <Header data={pagination} points={points} level={level} />
          <Victory points={points} />
        </>
      );
    }

    return (
      <>
        <Header data={pagination} points={points} level={level} />

        <Question random={random} guessed={guessed} imageClosed={IMAGE.CLOSED} />

        <div className={`${win ? 'd-none' : 'answer-block rounded'}`}>
          <AnswersList
            onClick={this.onClickHandler}
            list={birds[level].data.map(el => {
              return {
                id: el.id,
                name: el.name,
              };
            })}
          />
          <Information currentBirds={birds[level].data} current={answerId || -1} />
        </div>

        <div className={`${win ? 'd-none' : 'next-level'}`}>
          <button
            className={`${guessed ? 'active next-level__btn' : 'next-level__btn'}`}
            type="button"
            onClick={this.updateStateFull}
          >
            Next Level
          </button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App birds={birdsData} />, document.getElementById('root'));

export default App;

App.propTypes = {
  birds: PropTypes.arrayOf(PropTypes.object).isRequired,
};
