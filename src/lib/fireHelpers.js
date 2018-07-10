import "firebase/storage";
import fire from './fire';

export const getThumbnailSrc = (refUrl) => getDownloadURL(`thumbnails/${refUrl}`);
export const getImageSrc = (refUrl) => getDownloadURL(`images/${refUrl}`);

/**
 * Returns a promise containing the download URL gathered from refUrl
 * @param refUrl: String containing simple reference to image. (e.g. "images/banana.jpg")
 * @returns {Promise<T>}: Promise with (url) parameter
 */
export const getDownloadURL = (refUrl) => {
  const storage = fire.storage();
  const storageRef = storage.ref();
  return storageRef.child(refUrl).getDownloadURL();
};

/**
 * TODO: Doesn't work when called outside.
 * Get current user. If the user is not logged in, it'll return null.
 * Use that to your advantage.
 * @returns {!firebase.Unsubscribe|firebase.Unsubscribe}
 */
export const getCurrentUser = () => fire.auth().onAuthStateChanged(
  (user) => {
    console.log('My check.');
    if (user) {
      console.log(user.email);
      return user;
    } else {
      console.log('big booty');
      return null;
    }
  }
,
  (error) => {
    console.log('loli girls');
    console.log(error);
  });
