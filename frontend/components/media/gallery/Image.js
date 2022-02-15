import Link from "next/link";
import {Image} from 'cloudinary-react';
import {CLOUDINARY_NAME} from "../../../config";

const MyImage = ({src, publicId}) => {
    return <Link href={src}>
        <Image
            cloudName={CLOUDINARY_NAME}
            publicId={publicId}
            width="300"
            crop="scale"
            loading="lazy"
            className={` img-fluid`}>

        </Image>
    </Link>
};

export default MyImage;