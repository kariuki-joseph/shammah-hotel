import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './firebase.init';

const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  
const uploadVideo = async (file) => {
    const storageRef = ref(storage, `videos/${file.name}${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  export { uploadImage, uploadVideo };