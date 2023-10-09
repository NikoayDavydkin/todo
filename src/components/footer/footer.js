import React from 'react';
import './footer.css';
import PropTypes from 'prop-types';

const Footer = ({ clearAll, tuskComplete, stateButtons, itemsLeft }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft.length} items left</span>
      <ul className="filters">
        <li>
          <button
            onClick={() => {
              tuskComplete('All');
            }}
            className={stateButtons === 'All' ? 'selected' : ''}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              tuskComplete('Active');
            }}
            className={stateButtons === 'Active' ? 'selected' : ''}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              tuskComplete('Completed');
            }}
            className={stateButtons === 'Completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
      <button onClick={clearAll} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  clearAll: () => {},
  tuskComplete: () => {},
  stateButtons: 'All',
  itemsLeft: [{}],
};

Footer.propTypes = {
  clearAll: PropTypes.func,
  tuskComplete: PropTypes.func,
  stateButtons: PropTypes.string,
  itemsLeft: PropTypes.array,
};

export default Footer;
