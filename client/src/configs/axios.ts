/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Axios instance configuration for backend API communication. 
 */
import axios from 'axios';

const api = axios.create({
    // Hardcoded to your exact live Render backend
    baseURL: 'https://ai-website-builder-saas-platform.onrender.com', 
    withCredentials: true
});

export default api;