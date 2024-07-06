import * as api from "../api/index.js";

export const addNewSession = async (formData) => {
  try {
    const { data } = await api.addSession(formData);
    console.log(data.id);
    return data;
  } catch (error) {}
};
export const getSession = async (formData) => {
  try {
    const { data } = await api.getAllSession();

    return data;
  } catch (error) {}
};

export const updateSession = async (formData) => {
  try {
    const { data } = await api.updateSessionById(formData);

    return data;
  } catch (error) {}
};

export const getAnalyticsBySession = async (id) => {
  try {
    console.log(id);

    const { data } = await api.getAnalytics(id);

    return data;
  } catch (error) {}
};
