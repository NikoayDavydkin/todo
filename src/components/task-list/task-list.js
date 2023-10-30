/* eslint-disable semi */
import React from 'react';
import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ todos, onCheckedClick, onDeletedTodo, editTusk, todoActive }) => {
  const onCheckClick = (id) => {
    onCheckedClick(id);
  };

  const todoDelete = (id) => {
    onDeletedTodo(id);
  };

  const completeEdidting = (completed, editing) => {
    if (editing) {
      return 'editing';
    }

    if (completed) {
      return 'completed';
    }

    return '';
  };

  const returnClassName = (completed, editing) => {
    if (todoActive === 'Completed') {
      if (completed === true) {
        return completeEdidting(completed, editing);
      } else {
        return 'hidden';
      }
    } else if (todoActive === 'Active') {
      if (completed === true) {
        return 'hidden';
      } else {
        return completeEdidting(completed, editing);
      }
    } else {
      return completeEdidting(completed, editing);
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((item) => {
        return (
          <li key={item.id} className={returnClassName(item.completed, item.editing)}>
            <Task
              secundes={item.secundes}
              minutes={item.minutes}
              editTusk={editTusk}
              todoDelete={todoDelete}
              onCheckedClick={onCheckClick}
              id={item.id}
              date={item.date}
              value={item.label}
              completed={item.completed}
            />
          </li>
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  todos: [],
  onCheckedClick: () => {},
  onDeletedTodo: () => {},
  editTusk: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.array,
  onCheckedClick: PropTypes.func,
  onDeletedTodo: PropTypes.func,
  editTusk: PropTypes.func,
};

export default TaskList;
