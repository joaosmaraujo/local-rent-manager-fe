import axios from 'axios';

// Creates Axios Client
const client = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    json: true
});

export default {
    /**
     * This function executes a server request using a 
     * given method to a given resource and sends the given data
     * @namespace api.execute
     * @param {string} method - the method to be used
     * @param {string} resource - the name of the resource
     * @param {object} data - the data to be sent
     * @returns {object} data received in the response
     */
    async execute(method, resource, data) {
        const token = localStorage.getItem('token') || '';
        return client({
            method,
            url: resource,
            data,
            headers: { Authorization: token }
        }).then(res => {
            return res.data;
        });
    },
    /**
     * This function makes a request to get all elements
     * of a given resource
     * @namespace api.getAll
     * @param {string} resource - the resource name
     * @returns {array} array containing all elements of the
     * given resource
     */
    getAll(resource) {
        return this.execute('get', `/${resource}/`);
    },
    /**
     * This function makes a request to get a specific element
     * based on its id
     * @namespace api.get
     * @param {string} resource - the resource name
     * @param {string} id - the element id
     * @returns {object} the element requested
     */
    get(resource, id) {
        return this.execute('get', `/${resource}/${id}`);
    },
    /**
     * This function makes a request to delete a specific element
     * based on its id
     * @namespace api.delete
     * @param {string} resource - the resource name
     * @param {string} id - the element id
     * @returns {object} the result of the request
     */
    delete(resource, id) {
        return this.execute('delete', `/${resource}/${id}`);
    },
    /**
     * This function makes a request to add a new element
     * @namespace api.create
     * @param {string} resource - the resource name
     * @param {object} data - the information required to add a new element
     * @returns {object} data received in the response
     */
    create(resource, data) {
        return this.execute('post', `/${resource}/`, data);
    },
    /**
     * This function makes a request to update a specific element
     * based on its id
     * @namespace api.update
     * @param {string} resource - the resource name
     * @param {string} id - the element id
     * @param {object} data - the information required to update the element
     * @returns {object} data received in the response
     */
    update(resource, id, data) {
        return this.execute('put', `/${resource}/${id}`, data);
    },
    /**
     * This function makes a request to login the user
     * @namespace api.login
     * @param {object} user - object containing user information
     * @returns {object} data received in the response
     */
    login(user) {
        return this.execute('post', '/users/login', user);
    },
    /**
     * This function makes a request to register a new user
     * @namespace api.register
     * @param {object} userData - object containing new user information
     * @returns {object} data received in the response
     */
    register(userData) {
        return this.execute('post', '/users/register', userData);
    },
    /**
     * This function makes a request for information about the
     * user that is logged in
     * @namespace api.getUserProfile
     * @returns {object} information about the user
     */
    getUserProfile() {
        return this.execute('get', '/users/profile');
    },
    /**
     * This function makes a request to update user information
     * based on its id 
     * @namespace api.changeUserDetails
     * @param {string} id - the user id
     * @param {object} data - the data required to update the user information
     * @returns {object} data received in the response
     */
    changeUserDetails(id, data) {
        return this.execute('put', `/users/${id}`, data);
    },
    /**
     * This function makes a request to change the user password
     * @namespace api.changePassword
     * @param {string} id - the user id
     * @param {object} data - the information about the new password
     * @returns {object} the success of the request
     */
    changePassword(id, data) {
        return this.execute('put', `/users/reset-password/${id}`, data);
    }
};
