import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskTrackerTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskTrackerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="container">
      <header className="header">
        <h1>Team Task Tracker</h1>
        <p>Manage your team's tasks efficiently</p>
      </header>

      <div className="board">
        <TaskForm onAddTask={addTask} />
        
        <div className="task-columns">
          <TaskColumn
            title="To Do"
            tasks={todoTasks}
            status="todo"
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            status="in-progress"
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
          <TaskColumn
            title="Completed"
            tasks={completedTasks}
            status="completed"
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
