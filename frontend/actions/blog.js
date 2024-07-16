import axiosInstance from '../axios/axios';
import queryString from 'query-string';
import { handleResponse, isAuth } from "./auth";

export const createBlog = (blog) => {
    let blogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        blogEndpoint = '/blog';
    } else if (isAuth() && isAuth().role === 0) {
        blogEndpoint = '/user/blog';
    }

    return axiosInstance.post(blogEndpoint, blog)
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = { limit, skip };
    return axiosInstance.post('/blogs-categories-tags', data)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const singleBlog = (slug) => {
    return axiosInstance.get(`/blog/${slug}`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const listRelated = (blog) => {
    return axiosInstance.post('/blogs/related', blog)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const list = (username) => {
    let listBlogEndpoint;
    if (username) {
        listBlogEndpoint = `/${username}/blogs`;
    } else {
        listBlogEndpoint = '/blogs';
    }

    return axiosInstance.get(listBlogEndpoint)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const removeBlog = (slug) => {
    let deleteBlogEndpoint;
    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `/user/blog/${slug}`;
    }

    return axiosInstance.delete(deleteBlogEndpoint)
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const updateBlog = (blog, slug) => {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `/user/blog/${slug}`;
    }

    return axiosInstance.put(updateBlogEndpoint, blog)
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const listSearch = params => {
    let query = queryString.stringify(params);
    return axiosInstance.get(`/blogs/search?${query}`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const listPending = (username) => {
    let listBlogEndpoint;
    if (username) {
        listBlogEndpoint = `/${username}/pending-blogs`;
    } else {
        listBlogEndpoint = '/pending-blogs';
    }

    return axiosInstance.get(listBlogEndpoint)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const getAllBlogSlugs = () => {
    return axiosInstance.get('/blogs/slugs')
    .then(response => response.data.slugs)
    .catch(err => {
        console.log(err);
        return [];
    });
};

export const incrementViews = (slug) => {
    return axiosInstance.post(`/blog/${slug}/views`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

// export const incrementComments = (slug) => {
//     return axiosInstance.post(`/blog/${slug}/comments`)
//     .then(response => response.data)
//     .catch(err => console.log(err));
// };
//
// export const incrementShares = (slug) => {
//     return axiosInstance.post(`/blog/${slug}/shares`)
//     .then(response => response.data)
//     .catch(err => console.log(err));
// };
//
// export const incrementLikes = (slug) => {
//     return axiosInstance.post(`/blog/${slug}/likes`)
//     .then(response => response.data)
//     .catch(err => console.log(err));
// };

export const listTrending = () => {
    return axiosInstance.get('/blogs/trending')
    .then(response => response.data)
    .catch(err => console.log(err));
};
