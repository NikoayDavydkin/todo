/* eslint-disable semi */
import React from 'react';

import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';

class App extends React.Component {
  constructor() {
    super();
    this.countId = 100;
    this.state = {
      todoData: [this.createTodo('breakfast'), this.createTodo('create react app'), this.createTodo('shift tub')],
      todoActive: 'All',
    };

    //function deleted
    this.onDeletedTodo = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => {
          return el.id == id;
        });

        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        return {
          todoData: newArray,
        };
      });
    };

    //function ClearAll
    this.clearAll = () => {
      let newData = this.filterTodo('Active');

      this.setState({
        todoData: newData,
      });
    };

    //function completed
    this.onCheckedClick = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => {
          return el.id == id;
        });

        const oldItem = todoData[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed };

        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newArray,
        };
      });
    };

    //function Added
    this.onItemAdded = (value) => {
      this.setState(({ todoData }) => {
        return {
          todoData: [...todoData, this.createTodo(value)],
        };
      });
    };

    //function StateActive
    this.tuskComplete = (value) => {
      this.setState({
        todoActive: value,
      });
    };

    //function filter todo
    this.filterTodo = (value) => {
      let newArray = this.state.todoData.slice();

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

    //function editTusk
    this.editTusk = (id, value) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => {
          return el.id == id;
        });

        const oldItem = todoData[idx];
        const newItem = { ...oldItem, editing: !oldItem.editing, label: value };

        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newArray,
        };
      });
    };
  }

  //function create

  createTodo(value) {
    return {
      id: this.countId++,
      label: value,
      completed: false,
      editing: false,
      date: new Date(),
    };
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            editTusk={this.editTusk}
            onDeletedTodo={this.onDeletedTodo}
            onCheckedClick={this.onCheckedClick}
            todos={this.filterTodo(this.state.todoActive)}
          />
          <Footer
            itemsLeft={this.filterTodo('Active')}
            stateButtons={this.state.todoActive}
            tuskComplete={this.tuskComplete}
            clearAll={this.clearAll}
          />
        </section>
      </section>
    );
  }
}

export default App;
