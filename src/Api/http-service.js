import { PlannerRestService } from '@Api/planner-rest-service';

export const getRequest = async ({ url, params = {} }) => {
  try {
    const res = await PlannerRestService.get(url, { params });
    return res.data;
  } catch (e) {
    console.error(e.message);
    return e;
  }
};

export const postRequest = async ({ url, data = {}, params = {} }) => {
  try {
    return await PlannerRestService.post(url, data, { params });
  } catch (e) {
    console.error(e.message);
    return e;
  }
};
