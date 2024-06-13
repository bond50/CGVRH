import React from "react";
import dynamic from "next/dynamic";
import { tinymceConfig } from "./reusables/tinymceConfig";

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

const TinyMCEEditor = ({ value, onEditorChange }) => {
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={value}
            init={tinymceConfig}
            onEditorChange={onEditorChange}
        />
    );
};
export default TinyMCEEditor;
