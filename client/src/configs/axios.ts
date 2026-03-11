import axios from 'axios';

const api = axios.create({
    // Temporarily hardcode the EXACT live Render URL here. 
    // Remove the import.meta.env completely for this test.
    baseURL: 'https://your-backend-app-name.onrender.com', 
    withCredentials: true
})

export default api;