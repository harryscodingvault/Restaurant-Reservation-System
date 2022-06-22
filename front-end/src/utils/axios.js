import axios from "axios";

const originURL = axios.create({
  baseURL: "http://localhost:5001",
});

export default originURL;
