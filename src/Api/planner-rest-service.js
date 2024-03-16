import Axios from 'axios';
/**
 * At the moment this will head to some mock resources provided by Mockoon
 */
export const PlannerRestService = Axios.create({
  baseURL: 'https://e7517467-30d8-4b58-a190-d3d365fe981b.mock.pstmn.io',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
console.log('REST Service', PlannerRestService);
