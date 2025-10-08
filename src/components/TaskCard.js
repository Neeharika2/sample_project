import React, { useState } from 'react';
import './TaskCard.css';

function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const getStatusButtons = () => {
    const buttons = [];
    
    if (task.status !== 'todo') {
      buttons.push(
        <button
          key="todo"
          onClick={() => onMove(task.id, 'todo')}
          className="btn btn-secondary btn-small"
        >
          To Do
        </button>
      );
    }
    
    if (task.status !== 'in-progress') {
      buttons.push(
        <button
          key="progress"
          onClick={() => onMove(task.id, 'in-progress')}
          className="btn btn-primary btn-small"
        >
          In Progress
        </button>
      );
    }
    
    if (task.status !== 'completed') {
      buttons.push(
        <button
          key="completed"
          onClick={() => onMove(task.id, 'completed')}
          className="btn btn-success btn-small"
        >
          Complete
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-textarea"
            rows="2"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="btn btn-success btn-small">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary btn-small">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
          
          <div className="task-actions">
            <div className="status-buttons">
              {getStatusButtons()}
            </div>
            <div className="edit-delete-buttons">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary btn-small"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
