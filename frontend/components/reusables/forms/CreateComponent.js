import React from 'react';

import Alert from "../../messages/Alert";
import CreateForm from "./CreateForm";
import SideCatTags from "./side-cat-tags";
import {API} from "../../../config";
import {useRouter} from "next/router";
import Image from "next/image";

const CreateComponent = ({
                             handleChange,
                             handleBody,
                             body,
                             btnCapture,
                             title,
                             onSubmit,
                         }) => {

    return (


            <CreateForm
                handleChange={handleChange('title')}
                handleBody={handleBody}
                bodyValue={body}
                btnCapture={btnCapture}
                titleValue={title}
                onSubmit={onSubmit}/>
    );
};

export default CreateComponent;