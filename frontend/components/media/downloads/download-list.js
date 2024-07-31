import classes from '../../../styles/downloads.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import useSWR from 'swr';
import axios from 'axios';

import fileTypes from '../../reusables/functions/fileTypes';
import { API } from '../../../config';
import Filters from './filters';
import { fetcher } from "../../../axios/axios";

dayjs.extend(localizedFormat);
dayjs.locale('en');

const ALL_TAG_ID = '8&03ubvgfd7b4e36e0f12d44';

const DownloadList = ({ files }) => {
    const { data: tags } = useSWR(`${API}/document-tags`, fetcher);
    const [downloads, setLoadedDownloads] = useState(files);
    const [buttons, setButtons] = useState([{ _id: ALL_TAG_ID, name: 'All' }]);
    const [active, setActive] = useState(ALL_TAG_ID);

    useEffect(() => {
        if (tags) {
            const newButtons = tags.map(({ _id, name }) => ({ _id, name }));
            setButtons(prev => [...prev, ...newButtons]);
        }
    }, [tags]);

    const filterTags = id => {
        setActive(id);
        setLoadedDownloads(id === ALL_TAG_ID ? files : files.filter(file => file.tags.includes(id)));
    };

    const handleDownload = async (fileUrl, id) => {
        try {
            const response = await axios.get(fileUrl, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', id);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading file:', err);
        }
    };

    return (
        <Fragment>
            <section className={classes.Download}>
                <Filters
                    buttons={buttons}
                    active={active}
                    handleTagFilter={filterTags}
                />
                <div className={classes.DownloadWrapper} data-aos="slide-up" data-aos-delay="100">
                    {downloads.map(file => (
                        <div className={classes.Wrapper} key={file._id}>
                            <div className={classes.Header}>
                                {fileTypes(file.fileType)}
                                <span>{file.title}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column m-2">
                                <div className={classes.Date}>Uploaded on <span>{dayjs(file.createdAt).format('LLL')}</span></div>
                                <div className={classes.Size}>File size: <span>{file.fileSize}</span></div>
                            </div>
                            <div className={`${classes.Btn} text-center`} onClick={() => handleDownload(file.filePath, file._id)}>
                                <span className="align-middle">Download</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

export default DownloadList;
