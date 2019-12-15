import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8083/",
  json: true
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data;
    });
  },
  getCustomers() {
    return this.execute("get", "/customers");
  }
};
