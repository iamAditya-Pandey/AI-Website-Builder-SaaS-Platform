import axios from 'axios';

const api = axios.create({
    // Use your ACTUAL Render URL here, no trailing slash
    baseURL: 'https://ai-website-builder-saas-platform.onrender.com', 
    withCredentials: true
})

export default api;