import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },  // 0 a 200 usuários em 2 minutos
    { duration: '2m', target: 500 },  // 200 a 500 usuários em 2 minutos
    { duration: '2m', target: 1000 }, // 500 a 1000 usuários em 2 minutos
  ],
};

export default function () {
  // Alvo: Endpoint pesado de CPU (/checkout/crypto)
  const url = 'http://localhost:3000/checkout/crypto';
  
  const res = http.post(url);
  
  check(res, {
    'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}