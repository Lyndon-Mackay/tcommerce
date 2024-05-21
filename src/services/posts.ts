import axios from "axios";

const postAxios = axios.create({
  baseURL: "http://localhost:3000/blog",
});
export default postAxios;
