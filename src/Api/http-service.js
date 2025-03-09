import { PlannerRestService } from '@Api/planner-rest-service';

export const getRequest = async ({ url, params = {} }) => {
  try {
    const res = await PlannerRestService.get(url, { params });
    return res.data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

export const postRequest = async ({ url, data = {}, params = {} }) => {
  try {
    return await PlannerRestService.post(url, data, { params });
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

export const deleteRequest = async ({ url, params = {} }) => {
  try {
    const res = await PlannerRestService.delete(url, { params });
    return res.data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

export const putRequest = async ({ url, data = {} }) => {
  try {
    const res = await PlannerRestService.put(url, data);
    return res.data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
