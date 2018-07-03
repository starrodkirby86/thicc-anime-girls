# thicc anime girls

# Introduction
This is a sample React project utilizing Google Firebase and its services. The goals are:

- Creating a basic project that can read and write into a realtime database
- Uploading and downloading from Cloud Storage
- Login and authentication privileges with Firebase Auth
- Utilization of React and Redux reducers that connect with Firebase

# Installation
Most of the installation should be typical of a React application – simply clone this repo and fire up ``npm install``.

However, as this project also utilizes Firebase, you'll need to set up a corresponding Firebase instance to properly query end-to-end protocols. You'll need to set up an ``.env`` file that contains your Firebase project's information, and a ``.firebaserc`` file with your project title.

Here's a snippet of the .env  and ``.firebaserc`` files for convenience. Of course, replace the strings as appropriate:

.env:
```
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_DATABASE_URL=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
```

.firebaserc:
```
{
  "projects": {
    "default": ""
  }
}
```