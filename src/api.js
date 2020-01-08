import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8083/',
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
    getAll(resource) {
        return this.execute('get', `/${resource}/`);
    },
    get(resource, id) {
        return this.execute('get', `/${resource}/${id}`);
    },
    delete(resource, id) {
        return this.execute('delete', `/${resource}/${id}`);
    },
    create(resource, data) {
        return this.execute('post', `/${resource}/`, data);
    },
    update(resource, id, data) {
        return this.execute('put', `/${resource}/${id}`, data);
    }
};
