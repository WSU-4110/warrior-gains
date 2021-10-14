import Firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';

//import seedfile
//import { seedDatabase } from '.../seed';

const config = {
    apiKey: "AIzaSyALxpGH7I2WycGmnbIbB4VeGRKxPCUpdqg",
    authDomain: "warrior-gains.firebaseapp.com",
    projectId: "warrior-gains",
    storageBucket: "warrior-gains.appspot.com",
    messagingSenderId: "644720927711",
    appId: "1:644720927711:web:94d559ae93068a34731a6a",
    measurementId: "G-6G1Q6C3XZ7"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where i want to call the seed file (once)
//seedDatabase(firebase);

export { firebase, FieldValue };