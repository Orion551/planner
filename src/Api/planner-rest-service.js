import Axios from 'axios';

export const PlannerRestService = Axios.create({
  baseURL: 'http://localhost:3000',
});
