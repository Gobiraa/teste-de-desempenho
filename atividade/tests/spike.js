import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Carga baixa (10 usuários) por 30s
    { duration: '10s', target: 300 }, // Salto imediato para 300 usuários em 10s (Pico!)
    { duration: '1m', target: 300 },  // Manter o pico de 300 usuários por 1 minuto
    { duration: '10s', target: 10 },  // Queda imediata para 10 usuários
  ],
};

export default function () {

  const url = 'http://localhost:3000/checkout/simple';
  
  const res = http.post(url);
  
  check(res, {
    'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}