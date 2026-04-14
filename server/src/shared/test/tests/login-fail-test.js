import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50, // Higher load to see how the server handles error overhead
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    email: "nati@gmail.com",
    password: "WRONG_PASSWORD_123" // Intentionally wrong
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post('http://localhost:5000/api/auth/login', payload, params);

  check(res, {
    'status is 400 or 401': (r) => r.status === 400 || r.status === 401,
    'error message present': (r) => r.json('success') === false,
  });

  sleep(0.5); 
}