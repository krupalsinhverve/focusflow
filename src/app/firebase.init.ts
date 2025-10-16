// src/app/firebase.init.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

const firebaseApp = initializeApp(environment.firebase);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
