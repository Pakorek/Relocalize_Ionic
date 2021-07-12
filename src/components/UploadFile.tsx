import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Upload = {
  url: string,
  title: string
}

const UPLOAD_AVATAR = gql`
    mutation uploadFile($file: Upload) {
        uploadFile(file: $file)
    }
`;

const UploadAvatar = () => {

  const [uploadFile] = useMutation(UPLOAD_AVATAR);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState()

  // Store in the state the file
  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Trigger the mutation when we click the submit button
  const handleClick = () => {
    try {
      uploadFile({
        variables: {
          file,
        }
      }).catch(e => console.log('uploadFile catch err', JSON.stringify(e)))
    } catch (e) {
      setErr(e)
      console.error('catch component', e)
    }
  };

  if (err) return (<p>{JSON.stringify(err)}</p>)

  return (
    <div>
      <input id="logo" type="file" onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default UploadAvatar;

