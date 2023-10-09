import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ todos, onCheckedClick, onDeletedTodo, editTusk }) => {
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

  return (
    <ul className="todo-list">
      {todos.map((item) => {
        return (
          <li key={item.id} className={completeEdidting(item.completed, item.editing)}>
            <Task
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

      {/* <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Create react app</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li> */}
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
