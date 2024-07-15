import Header from '@/components/header/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdminLoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (username.length === 0) {
      setUsernameError('username is required');
    } else {
      if (username === 'admin') {
        setUsernameError('');
      } else {
        setUsernameError('username is incorrect');
      }
    }
  }, [username]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError('password is required');
    } else {
      if (password === 'admin') {
        setPasswordError('');
      } else {
        setPasswordError('password is incorrect');
      }
    }
  }, [password]);

  return (
    <>
      <Header />
      <div className="w-[1200px] mt-20 m-auto pt-2">
        <div className="w-fit m-auto flex flex-col gap-2">
          <div>
            <input
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            {usernameError.length > 0 && (
              <p className="text-sm text-red-700">{usernameError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {passwordError.length > 0 && (
              <p className="text-sm text-red-700">{passwordError}</p>
            )}
          </div>
          <button
            className="disabled:opacity-50"
            onClick={() => router.push('/admin')}
            disabled={
              username.length === 0 ||
              password.length === 0 ||
              usernameError.length > 0 ||
              passwordError.length > 0
            }
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
