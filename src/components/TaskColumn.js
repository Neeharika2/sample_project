import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, status, onUpdateTask, onDeleteTask, onMoveTask }) {
  return (
    <div className="task-column">
      <div className="column-header">
        {title} ({tasks.length})
      </div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          onMove={onMoveTask}
        />
      ))}
    </div>
  );
}

export default TaskColumn;
