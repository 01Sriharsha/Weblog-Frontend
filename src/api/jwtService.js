import axios from "axios"

export const jwtClient = axios.create({
    baseURL: "http://localhost:9191/api/v1"
})

function getToken() {
    if (!localStorage.getItem("data")) {
        return null;
    }
    else {
        return JSON.parse(localStorage.getItem("data")).token;
    }
}

jwtClient.interceptors.request.use(
    config => {
        const token = getToken();
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error)
)

//Post API Services
export const createPost = (postData, userId, categoryId) => {
    return jwtClient.post(`/user/${userId}/category/${categoryId}/posts`, postData)
}

export const createComment = (commentData, userId, postId) => {
    return jwtClient.post(`/users/${userId}/posts/${postId}/comments`, commentData)
}

export const updateComment = (commentData, commentId) => {
    return jwtClient.put(`/comments/${commentId}`, commentData)
}

export const deleteComment = (commentId) => jwtClient.delete(`/comments/${commentId}`);


//to upload image
export const uploadPostImage = (image, postId) => {
    console.log(postId);
    console.log(image);
    return jwtClient.post(`/posts/${postId}/image/upload`, image, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });
}

export const deleteThePost = (postId) => jwtClient.delete(`/posts/${postId}`);