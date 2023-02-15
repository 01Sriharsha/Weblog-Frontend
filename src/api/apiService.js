import axios from "axios";

export const BASE_URL = 'http://localhost:9191';

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const controller = new AbortController();
const signal = controller.signal;

export const register = (registerInfo) => apiClient.post(`/register`, registerInfo);

export const login = (loginInfo) => apiClient.post(`/login`, loginInfo, { method: 'post', signal: signal });

export const getAllCategories = () => apiClient.get(`/api/v1/category`);

export const getAllPosts = (pageNumber, pageSize, sortBy, direction) => {
    return apiClient.get(`/api/v1/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&direction=${direction}`);
}

export const getSinglePost = (postId) => apiClient.get(`/api/v1/posts/${postId}`);

export const getAllCommentsOfPost = (postId) => apiClient.get(`/api/v1/posts/${postId}/comments`);

export const getAllPostByCategory = (categoryId) => apiClient.get(`/api/v1/category/${categoryId}/posts`);


export const getAllPostByUser = (userId) => apiClient.get(`/api/v1/users/${userId}/posts`);