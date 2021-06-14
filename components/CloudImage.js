import {CloudinaryContext, Image} from 'cloudinary-react';

export default function CloudImage({publicId}) {
  return (
    <>
        <CloudinaryContext cloudName="refuway">
        <div>
            <Image publicId={publicId} />
        </div>
        </CloudinaryContext>
    </>
  );
}