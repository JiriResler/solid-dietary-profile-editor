import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCJAA5IFz8DSQBE54fO6aTKC8BVCs-zssU',
  authDomain: 'profile-and-personalized-menus.firebaseapp.com',
  projectId: 'profile-and-personalized-menus',
  storageBucket: 'profile-and-personalized-menus.appspot.com',
  messagingSenderId: '740463798793',
  appId: '1:740463798793:web:31d8f199a5df8f75bfe6d8',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
