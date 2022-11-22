import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/likes/${tid}`)
       .then(response => response.data);

export const userLikesTuit = async (uid, tid) => {
   const response = await api.get(`${USERS_API}/${uid}/liked/${tid}`);
   return response.data;
}
 export const findAllTuitsLikedByUser = async(userId) =>{
     const response = await  api.get(`${USERS_API}/${userId}/likes`);
     return response.data;
 }
 export const userHasLikedTuit = async (uid, tid) => {
     const response = await api.get(`${USERS_API}/${uid}/userLiked/${tid}`);
     return response.data;
 }
