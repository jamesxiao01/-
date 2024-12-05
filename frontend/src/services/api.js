import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const userService = {
    getUsers() {
        return api.get('/users');
    },
    createUser(userData) {
        return api.post('/users', userData);
    },
};