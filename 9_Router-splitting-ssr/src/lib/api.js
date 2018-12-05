import axios from 'axios';

export const getUsers = async () => axios.get('https://jsonplaceholder.typicode.com/users')
