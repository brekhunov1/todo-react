import { useState } from 'react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    const url = isLogin
      ? 'https://test-project1-production.up.railway.app/auth/login'
      : 'https://test-project1-production.up.railway.app/auth/register';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    localStorage.setItem('token', data.token);
    onLogin(data.token);
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '32px', background: 'white', borderRadius: '16px' }}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        style={{ width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
        style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '12px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </button>
      <p
        onClick={() => { setIsLogin(!isLogin); setError(''); }}
        style={{ textAlign: 'center', marginTop: '16px', cursor: 'pointer', color: '#6c63ff' }}
      >
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </p>
    </div>
  );
}

export default Auth;
