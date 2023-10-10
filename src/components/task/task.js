/* eslint-disable semi */
import React, { Component } from 'react';
import './task.css';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

class Task extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.checkedReturn = () => {
      return this.props.completed;
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
      this.props.editTusk(this.props.id, this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    const { date, value, id, onCheckedClick, todoDelete, editTusk } = this.props;

    return (
      <>
        <div className="view">
          <input
            onClick={() => {
              onCheckedClick(id);
            }}
            className="toggle"
            type="checkbox"
            checked={this.checkedReturn()}
            readOnly={true}
          />
          <label>
            <span className="description">{value}</span>
            <span className="created">
              created{' '}
              {formatDistance(date, new Date(), {
                includeSeconds: true,
              }).replace('less than', '')}{' '}
              ago
            </span>
          </label>
          <button
            onClick={() => {
              editTusk(id, '');
            }}
            className="icon icon-edit"
          ></button>
          <button
            onClick={() => {
              todoDelete(id);
            }}
            className="icon icon-destroy"
          ></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onLabelChange} value={this.state.label} type="text" className="edit" />
        </form>
      </>
    );
  }
}

Task.defaultProps = {
  date: new Date(),
  value: '',
  id: 1432,
  onCheckedClick: () => {},
  todoDelete: () => {},
  editTusk: () => {},
};

Task.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  onCheckedClick: PropTypes.func,
  todoDelete: PropTypes.func,
  editTusk: PropTypes.func,
};

export default Task;
