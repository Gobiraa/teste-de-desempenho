import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,         
  duration: '30s',
};

export default function () {
  // Alvo: Endpoint /health da nossa API local 
  const res = http.get('http://localhost:3000/health');
  
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}