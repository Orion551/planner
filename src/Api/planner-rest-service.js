import Axios from 'axios';
/**
 * At the moment this will head to some mock resources provided by Mockoon
 */
export const PlannerRestService = Axios.create({
  baseURL: 'https://6eb75b23-7830-436d-92c8-fdf7bbb533e4.mock.pstmn.io',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
console.log('REST Service', PlannerRestService);
