import axiosInstance from '../axios/axios';

export const emailContactForm = (data) => {
    let emailEndpoint;

    if (data.authorEmail) {
        emailEndpoint = '/contact-blog-author';
    } else {
        emailEndpoint = '/contact';
    }

    return axiosInstance.post(emailEndpoint, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(response => response.data)
    .catch(err => console.log(err));
};
