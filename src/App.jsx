import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import Auth from './Auth';

const API = 'https://test-project1-production.up.railway.app';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [newText, setNewText] = useState('');

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  async function loadTasks() {
    const res = await fetch(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (!newText.trim()) return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: newText })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setNewText('');
  }

  async function toggleTask(id) {
    await fetch(`${API}/tasks/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(task => task.id !== id));
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]);
  }

  if (!token) return <Auth onLogin={setToken} />;

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Мои задачи</h1>
        <button onClick={logout} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }}>
          Выйти
        </button>
      </div>
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
