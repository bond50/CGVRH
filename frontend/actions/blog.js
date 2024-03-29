import fetch from 'isomorphic-fetch';
import {API} from '../config';
import queryString from 'query-string'
import {handleResponse, isAuth} from "./auth";


export const createBlog = (blog, token) => {
    let blogEndpoint

    if (isAuth() && isAuth().role === 1) {
        blogEndpoint = `${API}/blog`
    } else if (isAuth() && isAuth().role === 0) {
        blogEndpoint = `${API}/user/blog`
    }

    return fetch(`${blogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singleBlog = (slug) => {
    console.log(slug)
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = (blog) => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = (username) => {
    let listBlogEndpoint
    if (username) {
        listBlogEndpoint = `${API}/${username}/blogs`
    } else {
        listBlogEndpoint = `${API}/blogs`
    }


    return fetch(`${listBlogEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const removeBlog = (slug, token) => {
    let deleteBlogEndpoint
    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/blog/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/blog/${slug}`
    }

    return fetch(`${deleteBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateBlog = (blog, token, slug) => {
    let updateBlogEndpoint

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`

    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`
    }


    return fetch(`${updateBlogEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listSearch = params => {
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listPending = (username, endpoint) => {
    let listBlogEndpoint
    if (username) {
        listBlogEndpoint = `${API}/${username}/pending-blogs`
    } else {
        listBlogEndpoint = `${API}/pending-blogs`
    }


    return fetch(`${listBlogEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getAllBlogSlugs = () => {
    return fetch(`${API}/blogs/slugs`, {  // Replace '/blogs/slugs' with the actual endpoint that returns all blog slugs
        method: 'GET'
    })
        .then(response => {
            handleResponse(response);  // Optional: handle the response if needed
            return response.json();
        })
        .then(data => {
            return data.slugs;  // Assuming the response has a 'slugs' field that contains an array of slugs
        })
        .catch(err => {
            console.log(err);
            return [];
        });
};
