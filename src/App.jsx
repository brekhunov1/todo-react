import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function App() {
  // const [tasks, setTasks] = useState([
  //   { id: 1, text: 'Выучить React', done: false },
  //   { id: 2, text: 'Задеплоить проект', done: true },
  //   { id: 3, text: 'Найти работу', done: false },
  // ]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://test-project1-production.up.railway.app/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const [newText, setNewText] = useState('');

  // function toggleTask(id) {
  //   setTasks(tasks.map(task =>
  //     task.id === id ? { ...task, done: !task.done } : task
  //   ));
  // }

  // function addTask() {
  //   if (!newText.trim()) return;
  //   setTasks([...tasks, { id: Date.now(), text: newText, done: false }]);
  //   setNewText('');
  // }

  // function deleteTask(id) {
  //   // TODO: используй setTasks и filter
  //   // как в уроке 2 с чистым JS
  //   setTasks(tasks.filter(task => task.id !== id));
  // }
  async function toggleTask(id) {
    await fetch(`https://test-project1-production.up.railway.app/tasks/${id}`, {
      method: 'PATCH'
    });
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  async function addTask() {
    if (!newText.trim()) return;
    const res = await fetch('https://test-project1-production.up.railway.app/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setNewText('');
  }

  async function deleteTask(id) {
    await fetch(`https://test-project1-production.up.railway.app/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h1>Мои задачи</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Новая задача..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '10px 16px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}
        >
          +
        </button>
      </div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          text={task.text}
          done={task.done}
          onToggle={() => toggleTask(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default App;
