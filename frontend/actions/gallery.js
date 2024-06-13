import axiosInstance from '../axios/axios';

export const getFilesFromLocal = async () => {
    return await axiosInstance.get('/get-all-multiple-files')
        .then(({ data }) => data)
        .catch(error => console.log(error));
};

export const getFilesFromCloud = async (folder) => {
    const data = { folder };

    return await axiosInstance.post('/files-retrieve-from-cloud', data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
};
