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
  },
  /* getCustomer (id) {
    return this.execute('get', `/customers/${id}`)
  },
  createCustomer (data) {
    return this.execute('post', '/customers', data)
  },
  updateCustomer (id, data) {
    return this.execute('put', `/customers/${id}`, data)
  },
  deleteCustomer (id) {
    return this.execute('delete', `/customers/${id}`)
  }, */
  getBookings() {
    return this.execute("get", "/bookings");
  },
  /* getBooking (id) {
    return this.execute('get', `/bookings/${id}`)
  },
  createBooking (data) {
    return this.execute('post', '/bookings', data)
  },
  updateBooking (id, data) {
    return this.execute('put', `/bookings/${id}`, data)
  },
  deleteBooking (id) {
    return this.execute('delete', `/bookings/${id}`)
  }, */
  getHouses() {
    return this.execute("get", "/houses");
  },
  getTasks() {
    return this.execute("get", "/tasks");
  }
};
