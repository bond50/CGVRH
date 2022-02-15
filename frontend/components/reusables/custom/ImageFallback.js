import Image from "next/image";

export default function Images(props) {
    const {src, ...rest} = props;
    const replaceImgWithError = e => {
        e.target.onerror = null;
        e.target.src = '/fallback/services.jpg';
    };


    return (


        <Image
            {...rest}
            onError={replaceImgWithError}
            alt="foo"
            src={src}
        />
    );
}