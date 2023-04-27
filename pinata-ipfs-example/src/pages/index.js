import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import axios from 'axios';

export default function Home() {

  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  async function upload() {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        'pinata_api_key': `${process.env.API_KEY}`,
        'pinata_secret_api_key': `${process.env.API_SECRET}`,
        "Content-Type": "multipart/form-data"
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  }

  function btnUploadClick() {
    setMessage("uploading...");
    upload()
      .then(result => setMessage(result))
      .catch(err => setMessage(err.message));
  }

  function onFileChange(evt) {
    if (evt.target.files) {
      setImage(evt.target.files[0]);
    }
  }

  return (
    <>
      <Head>
        <title>Pinata IPFS Example</title>
        <meta name="description" content="Pinata IPFS Example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.description}>
          <input type='file' id="image" onChange={onFileChange}></input>
          <button onClick={btnUploadClick}>Upload</button>
        </div>
        {message}
      </main>
    </>
  )
}
