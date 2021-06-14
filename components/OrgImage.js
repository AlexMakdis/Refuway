import {CloudinaryContext, Image, Transformation} from 'cloudinary-react';

export default function OrgImage({publicId}) {
  return (
    <>
        <CloudinaryContext cloudName="refuway">
        <div>
            <Image publicId={publicId}>
            <Transformation width="200" height="200" gravity="face" crop="thumb" />
            <Transformation radius="200" />
            </Image>
        </div>
        </CloudinaryContext>
    </>
  );
}