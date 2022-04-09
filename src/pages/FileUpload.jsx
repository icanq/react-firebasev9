import { getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { useEffect } from "react"
import { useState } from "react"
import { storage, ref } from "../config"

export default function FileUpload(props) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()
  const [dwnldUrl, setDwnldUrl] = useState()

  useEffect(() => {
    if (!image) {
      setPreview("https://via.placeholder.com/200")
      return
    }
    const objUrl = URL.createObjectURL(image)
    setPreview(objUrl)

    return ()=> URL.revokeObjectURL(objUrl)
  }, [image])

  const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined)
    }
    setImage(e.target.files[0])
  }

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed",
    (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is ' + progress + '% done');
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break;
        case 'running':
          console.log('upload is running')
          break;
      }
    }, (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        console.log(`file available at`, downloadUrl)
        setDwnldUrl(dwnldUrl)
      })
    })
  }

  return (
    <div>
      <h1>file upload</h1>
      <img src={preview} alt="imagsse"/>
      <br/>
      <input type={"file"} onChange={handleChange} />
      <button onClick={handleUpload }>upload</button>
    </div>
  )
}