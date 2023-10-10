/* eslint-disable semi */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.onLabelChange = (event) => {
      this.setState(() => {
        return {
          label: event.target.value,
        };
      });
    };

    this.onSubmit = (event) => {
      event.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm;
