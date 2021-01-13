import React from 'react';
import S3FileUpload from 'react-s3';


const PhotoUpload = () => {
//   const upload = async (e) => {
//     try {
//       const data = await S3FileUpload.uploadFile(e.target.files[0], config)
//     }
//     catch (e) {
//       alert(e)
//     }
//   }


  return (
    <>
      <h3>Upload Image</h3>
      <input type='file'  />
      <progress max='100' value='0'></progress>
    </>
  )
}

export default PhotoUpload