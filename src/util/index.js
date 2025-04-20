import axios from "axios";
 
// note: not used, but could be used with GET with params
const getData = async (url, params) => {
  try {
    const res = await axios.get(url, { params });
    return res.data;
  } catch (error) {
    console.error(`Error in getData for ${url}:`, error);
    throw error; // Propagate error to caller
  }
};

const getAllData = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`Error in getAllData for ${url}:`, error);
    throw error; // Propagate error to caller
  }
};


  export {getData, getAllData};