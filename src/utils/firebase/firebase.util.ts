import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvzqvtcqfItQY8VuqAkJCqpc6LpZMZ5tk",
  authDomain: "clothing-store-db-abaaf.firebaseapp.com",
  projectId: "clothing-store-db-abaaf",
  storageBucket: "clothing-store-db-abaaf.appspot.com",
  messagingSenderId: "853161257824",
  appId: "1:853161257824:web:5a461a0b8a2b0058060c05"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth:any) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshop = await getDoc(userDocRef);
    if(!userSnapshop.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (error) {
            console.log("error creawtign the user",error)
        }
    }
    return userDocRef;
}
