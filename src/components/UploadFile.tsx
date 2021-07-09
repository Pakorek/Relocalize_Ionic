import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Upload = {
  url: string,
  title: string
}

const UPLOAD_AVATAR = gql`
    mutation uploadFile($avatar: Upload) {
        uploadFile(avatar: $avatar) {
            id
        }
    }
`;

const UploadAvatar = () => {

  const [uploadFile] = useMutation(UPLOAD_AVATAR);
  const [avatar, setAvatar] = useState(null);
  const [err, setErr] = useState()

  // Store in the state the file
  const handleChange = (e: any) => {
    setAvatar(e.target.files[0]);
  };

  // Trigger the mutation when we click the submit button
  const handleClick = () => {
    console.log('handleClick')
    try {
      uploadFile({
        variables: {
          avatar,
        }
      })
      console.log('avatar', avatar)
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

