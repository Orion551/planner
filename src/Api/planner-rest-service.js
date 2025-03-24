import Axios from 'axios';
import { ApiUrl } from '@Constants/ApiUrl';

export const PlannerRestService = Axios.create({
  baseURL: ApiUrl.plannerServiceBaseUrl,
  withCredentials: true,
});
