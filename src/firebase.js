import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA6kO7b0y0vM_sOWg5PpcxVGlBDBsOUCPM",
    authDomain: "telegram-clone-62580.firebaseapp.com",
    projectId: "telegram-clone-62580",
    storageBucket: "telegram-clone-62580.appspot.com",
    messagingSenderId: "472796817814",
    appId: "1:472796817814:web:f4eeb4563b1eba585ad5b7",
    measurementId: "G-8DWPE9GJ74"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider} 
  export default db;