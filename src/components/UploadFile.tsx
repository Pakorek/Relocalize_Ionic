import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonHeader, IonItem } from '@ionic/react';
import Swal from 'sweetalert2';
import './UploadFile.css';

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
  const [file, setFile] = useState<File>();
  const [err, setErr] = useState();

  // Store in the state the file
  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Trigger the mutation when we click the submit button
  const handleClick = async () => {
    try {
      await uploadFile({
        variables: {
          file,
        },
        refetchQueries: ['getUser'],
      });
      // alert success
      await Swal.fire('Succès !', 'Image enregistrée !', 'success');
      // reload Myspace to print new avatar
      // or query user to get avatar and set in useState (context)

    } catch (e) {
      setErr(e);
      // alert error
      console.error('catch component', e);
    }
  };

  if (err) return (<p>{JSON.stringify(err)}</p>);

  return (
    <IonCard>
      <IonCardHeader>Modifier l'image de profil</IonCardHeader>
      {/*<input id="logo" type="file" onChange={handleChange} className="custom-file-input" />*/}
      <IonCardContent className="file-card">
        <input slot="start" id="logo" type="file" onChange={handleChange} />
        <IonButton slot="end" color="secondary" size="small" onClick={handleClick}>Modifier</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default UploadAvatar;

