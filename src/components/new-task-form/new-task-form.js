/* eslint-disable semi */
import React, { useState } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onItemAdded }) => {
  const [labelTask, setLabelTask] = useState('');
  const [labelMin, setLabelMin] = useState('');
  const [labelSec, setLabelSec] = useState('');

  const onLabelChangeTask = (event) => {
    setLabelTask(event.target.value);
  };

  const onLabelChangeMin = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setLabelMin(() => {
        if (value < 60) {
          return value;
        } else return '';
      });
    }
  };

  const onLabelChangeSec = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setLabelSec(() => {
        if (value < 60) {
          return value;
        } else return '';
      });
    }
  };

  const onSubmit = (e) => {
    if (e.key === 'Enter' && labelTask.length > 0) {
      if (labelMin > 0 || labelSec > 0) {
        e.preventDefault();
        onItemAdded(labelTask, labelMin, labelSec);
        setLabelTask('');
        setLabelMin('');
        setLabelSec('');
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          onChange={onLabelChangeTask}
          value={labelTask}
          onKeyDown={onSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onLabelChangeMin}
          value={labelMin}
          onKeyDown={onSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onLabelChangeSec}
          value={labelSec}
          onKeyDown={onSubmit}
        />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm;
