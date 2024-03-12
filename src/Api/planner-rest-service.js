import { Axios } from 'axios';
/**
 * At the moment this will head to some mock resources provided by Mockoon
 */
export const PlannerRestService = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
console.log('REST Service', PlannerRestService);
