import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { storage } from "../config";

export default function FileUploadMultiple() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!images) {
      setPreviews([
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200",
      ]);
      return;
    }
    images.map((img) => {
      const objUrl = URL.createObjectURL(img);
      setPreviews((pre) => [...pre, objUrl]);
      return () => URL.revokeObjectURL(objUrl);
    });
  }, [images]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage.id = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      console.log("loop");

      const sotrageRef = ref(storage, `images/${image.name}`);

      const uploadTask = uploadBytesResumable(sotrageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            setUrls((prevState) => [...prevState, downloadURLs]);
            console.log("image available at", downloadURLs);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .then((err) => console.log(err));
  };
  
  return (
    <>
      <progress value={progress} max="100" />
      <h1>File upload multiple</h1>
      {previews.map((img, i) => (
        <img src={img} key={i} alt="satuan" />
      ))}
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      ))}
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase"
        />
      ))}
    </>
  );
}
