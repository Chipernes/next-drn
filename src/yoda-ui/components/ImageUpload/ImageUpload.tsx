'use client';

import { ImageKitProvider, IKImage, IKUpload } from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Box from '../Box';
import { errorToast, successToast } from 'basics/utils/toast';
import { config } from 'config/config';

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = () => {
    errorToast('Your image could not be uploaded. Please try again.');
  };
  const onSuccess = (res: { filePath: string }) => {
    setFile(res);

    successToast('Image uploaded successfully');
  };

  return (
    <ImageKitProvider
      publicKey={ config.env.imagekit.publicKey }
      urlEndpoint={ config.env.imagekit.urlEndpoint }
      authenticator={ authenticator }
    >
      <IKUpload
        className='hidden'
        ref={ ikUploadRef }
        onError={ onError }
        onSuccess={ onSuccess }
        useUniqueFileName={ true }
        folder='avatars'
        fileName="abc.jpg"
      />

      <button className='upload-btn' onClick={
        (event) => {
          event.preventDefault();

          if (ikUploadRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ikUploadRef.current?.click();
          }
        }
      }
      >
        <Image src='/icons/upload.png' alt='upload-icon' width={ 20 } height={ 20 } className='object-contain'/>
        <Box className='text-base text-light-100'>Upload a File</Box>
        { file && <Box className='upload-filename'>{ file.filePath }</Box> }
      </button>

      {
        file
          && <IKImage
            alt={ file.filePath }
            path={ file.filePath }
            width={ 500 }
            height={ 500 }
          />
      }
    </ImageKitProvider>
  );
};
export default ImageUpload;
