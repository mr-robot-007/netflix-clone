import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBzn3VN56RoDSisafYAE7gSe6Pe6GxyaKM",
    authDomain: "netflix-clone-e1f21.firebaseapp.com",
    projectId: "netflix-clone-e1f21",
    storageBucket: "netflix-clone-e1f21.appspot.com",
    messagingSenderId: "262035022369",
    appId: "1:262035022369:web:b6baf25842b663b2e17960"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();


  export {auth};
  export default db;