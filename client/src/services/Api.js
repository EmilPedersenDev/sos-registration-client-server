import axios from "axios";

export default () => {
  let url;
  if (process.env.NODE === "production") {
    url = "";
  } else {
    url = "http://localhost:8081";
  }
  return axios.create({
    baseURL: url
  });
};
