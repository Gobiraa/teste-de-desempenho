import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp-up: 0 a 50 usuários em 1 minuto
    { duration: '2m', target: 50 },  // Platô: Manter 50 usuários por 2 minutos
    { duration: '30s', target: 0 },  // Ramp-down: 50 a 0 usuários em 30 segundos
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],           

    http_req_duration: ['p(95)<500'],         
  },
};

export default function () {
  // Alvo: Endpoint /checkout/simple (Simula operação leve de I/O)
  const url = 'http://localhost:3000/checkout/simple';
  
  const res = http.post(url);
  
  check(res, {
    'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}