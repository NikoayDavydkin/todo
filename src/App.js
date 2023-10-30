/* eslint-disable semi */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [todoActive, setTodoActive] = useState('All');

  //function deleted
  const onDeletedTodo = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => {
        return el.id == id;
      });

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return newArray;
    });
  };

  //function ClearAll
  const clearAll = () => {
    let newData = filterTodo('Active');

    setTodoData(newData);
  };

  //function completed
  const onCheckedClick = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => {
        return el.id == id;
      });

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return newArray;
    });
  };

  //function Added
  const onItemAdded = (labelTask, labelMin, labelSec) => {
    setTodoData((todoData) => {
      return [...todoData, createTodo(labelTask, labelMin, labelSec)];
    });
  };

  //function StateActive
  const tuskComplete = (value) => {
    setTodoActive(value);
  };

  //function filter todo
  const filterTodo = (value) => {
    let newArray = todoData.slice();

    if (value === 'All') {
      return newArray;
    } else if (value === 'Active') {
      let newArrayActive = newArray.filter((x) => {
        return !x.completed;
      });

      return newArrayActive;
    } else {
      let newArrayCompleted = newArray.filter((x) => {
        return x.completed;
      });
      return newArrayCompleted;
    }
  };

  const filterTodoTwo = () => {
    let newArray = todoData.slice();

    return newArray;
  };

  //function editTusk
  const editTusk = (id, value) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => {
        return el.id == id;
      });

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing, label: value };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return newArray;
    });
  };

  //function create

  function createTodo(labelTask, labelMin, labelSec) {
    return {
      id: uuidv4(),
      label: labelTask,
      minutes: labelMin,
      secundes: labelSec,
      completed: false,
      editing: false,
      date: new Date(),
    };
  }

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={onItemAdded} />
      <section className="main">
        <TaskList
          editTusk={editTusk}
          onDeletedTodo={onDeletedTodo}
          onCheckedClick={onCheckedClick}
          todos={filterTodoTwo(todoActive)}
          todoActive={todoActive}
        />
        <Footer
          itemsLeft={filterTodo('Active')}
          stateButtons={todoActive}
          tuskComplete={tuskComplete}
          clearAll={clearAll}
        />
      </section>
    </section>
  );
};

export default App;
