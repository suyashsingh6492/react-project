import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { json } from 'react'
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'unsopported mode' }, { status: 422 });
  }
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };

  const resp = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (resp.status === 422 || resp.status === 401) {
    return resp;
  }

  if (!resp.ok) {
    throw json({ message: 'could not auth the user' }, { status: 500 })
  }

  const resData = await resp.json();
  const token = resData.token;
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('token', token);
  return redirect('/')
}