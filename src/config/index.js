import { initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCTFXvWT3GlUGx1VisRRTL3djTAK2YOn5c",
  authDomain: "icanq-ref.firebaseapp.com",
  projectId: "icanq-ref",
  storageBucket: "icanq-ref.appspot.com",
  messagingSenderId: "1000910602682",
  appId: "1:1000910602682:web:dc8ca10a085b9d45391d83",
  measurementId: "G-YHZQDW86RE"
};

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

export { storage, ref, uploadBytes, firebaseApp as default}