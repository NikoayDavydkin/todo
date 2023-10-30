/* eslint-disable indent */
/* eslint-disable semi */
import React, { useState, useEffect } from 'react';
import './task.css';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({ date, value, id, onCheckedClick, todoDelete, editTusk, completed, secundes, minutes }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState(Number(minutes));
  const [sec, setSec] = useState(Number(secundes));
  const [timerState, setTimerState] = useState(true);

  let timer;

  useEffect(() => {
    if (!timerState) return;
    if (sec === 1 && min === 0) {
      return () => {
        setTimerState(false);
        clearInterval(timer);
        setMin(0);
        setSec(0);
      };
    }
    timer = setInterval(() => {
      setSec((c) => c - 1);
      if (sec === 1) {
        setMin(min - 1);
        setSec(59);
      }
    }, 1000);
    return () => {
      if (sec === 1 && min === 0) {
        clearInterval(timer);
        setTimerState(false);
      } else {
        clearInterval(timer);
      }
    };
  });

  const checkedReturn = () => {
    return completed;
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editTusk(id, label);
    setLabel('');
  };

  const stop = () => {
    clearInterval(timer);
  };

  const start = () => {
    if (timerState) {
      timer = setInterval(() => {
        setSec((c) => c - 1);
        if (sec === 1 && min === 0) {
          stop();
          setTimerState(false);
        }

        if (sec === 1) {
          setMin(min - 1);
          setSec(59);
        }
      }, 1000);
    } else {
      stop();
    }
  };

  return (
    <>
      <div className="view">
        <input
          onClick={() => {
            onCheckedClick(id);
          }}
          className="toggle"
          type="checkbox"
          checked={checkedReturn()}
          readOnly={true}
        />

        <label>
          <span className="title">{value}</span>
          <span className="description">
            <button onClick={timerState ? start : null} className="icon icon-play"></button>
            <button onClick={stop} className="icon icon-pause"></button> {min < 10 ? '0' + min : min}:
            {sec < 10 ? '0' + sec : sec}
          </span>
          <span className="description">
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
      <form onSubmit={onSubmit}>
        <input onChange={onLabelChange} value={label} type="text" className="edit" />
      </form>
    </>
  );
};

Task.defaultProps = {
  date: new Date(),
  value: '',
  onCheckedClick: () => {},
  todoDelete: () => {},
  editTusk: () => {},
};

Task.propTypes = {
  value: PropTypes.string,
  onCheckedClick: PropTypes.func,
  todoDelete: PropTypes.func,
  editTusk: PropTypes.func,
};

export default Task;
