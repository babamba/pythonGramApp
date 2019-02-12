// Imports
import { API_URL, FB_APP_ID } from "../../constant";
import { AsyncStorage } from "react-native";
import { Permissions, Notifications, Facebook } from "expo";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// Action Creators
function setLogIn(token){
     return {
          type: LOG_IN,
          token
     }
}

// function setLogOut(user){
//      return {
//           type: LOG_OUT
//      }
// }

function setUser(user){
     return {
          type: SET_USER,
          user
     }
}

function setNotifications(notifications){
     return {
          type: SET_NOTIFICATIONS,
          notifications
     }
}

function logOut() {
     return { 
          type: LOG_OUT 
     };
   }

// API Actions
function login(username, password){
     return dispatch => {
          console.log(`${API_URL}/rest-auth/login/`);
          return fetch(`${API_URL}/rest-auth/login/`, {
               method: "POST",
               headers : {
                    "Content-Type" : "application/json"
               },
               body: JSON.stringify({
                    username,
                    password
               })
          })
          .then(response => response.json())
          .then(json => {
               if(json.user && json.token){
                    //console.log(json)
                    dispatch(setLogIn(json.token))
                    dispatch(setUser(json.user))
                    return true
               }else{
                    console.log("unable login")
                    return false;
               }
          })
          // .catch(function(error){
          //      console.log("error message")
          //      console.log(error);
          // })
     }
}

function facebookLogin() {
     return async dispatch => {
          const { type , token } = await Facebook.logInWithReadPermissionsAsync(
               FB_APP_ID, 
               {
                    Permissions:["public_profile","email"]
               }
          );
          console.log(type, token)
          if(type === "success"){
               fetch(`${API_URL}/users/login/facebook/`, {
                    method: "POST",
                    headers : {
                         "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                         access_token : token
                    })
               })

               .then(response => response.json())
               .then(json => {
                    if(json.user && json.token){
                         console.log(json)
                         dispatch(setLogIn(json.token));
                         dispatch(setUser(json.user));
                         return true;
                    }else{
                         console.log("unable login");
                         return false;
                    }
               })
          }
     };
}

function getNotifications(){
     return (dispatch, getState) => {
          const { user : { token } } = getState();
          fetch(`${API_URL}/notifications/`, {
               headers: {
                    Authorization : `JWT ${token}`
               }
          })
          .then(response => {
               if(response.status === 401){
                    dispatch(logOut());
               }else{
                    return response.json();
               }
          })
          .then(json => dispatch(setNotifications(json)));
     }
}

// 나 자신의 프로필만 저장
function getOwnProfile(){
     return (dispatch, getState) => {
          const { user : { token,  profile: { username } } } = getState();
          fetch(`${API_URL}/users/${username}/`, {
               headers: {
                    Authorization : `JWT ${token}`
               }
          })
          .then(response => {
               if(response.status === 401){
                    dispatch(logOut());
               }else{
                    return response.json();
               }
          })
          .then(json => dispatch(setUser(json)));
     }
}

function getProfile(username){
     return (dispatch, getState) => {
          const { user : { token } } = getState();
          return fetch(`${API_URL}/users/${username}/`, {
               headers: {
                    Authorization : `JWT ${token}`
               }
          })
          .then(response => {
               if(response.status === 401){
                    dispatch(logOut());
               }else{
                    return response.json();
               }
          })
          .then(json => json);
          
     }
}

function followUser(userId){
     return (dispatch, getState) => {
          const { user : { token } } = getState();
          fetch(`${API_URL}/users/${userId}/follow/` , {
               method:"POST",
               headers:{
                    Authorization : `JWT ${token}`
               }
          })
          .then(response => {
               if(response.status === 401){
                    dispatch(logOut());
               }else if(response.ok){
                    return true;
               }else if(!response.ok){
                    return false;
               }
          })
     }
}

function unfollowUser(userId){
     return (dispatch, getState) => {
          const { user : { token } } = getState();
          fetch(`${API_URL}/users/${userId}/unfollow/` , {
               method:"POST",
               headers:{
                    Authorization : `JWT ${token}`
               }
          })
          .then(response => {
               if(response.status === 401){
                    dispatch(logOut());
               }else if(response.ok){
                    return true;
               }else if(!response.ok){
                    return false;
               }
          })
     }
}

function registerForPush() {
          return async (dispatch, getState) => {
               const { user: { token } } = getState();
               const { status: existingStatus } = await Permissions.getAsync(
                    Permissions.NOTIFICATIONS
               );
          let finalStatus = existingStatus;
               if (existingStatus !== "granted") {
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
               }
          if (finalStatus === "denied") {
               return;
          }
     
          let pushToken = await Notifications.getExpoPushTokenAsync();
          console.log("push Token : ",pushToken);
          console.log("token " , `JWT ${token}`)
          console.log("push Token strigify : ",JSON.stringify({
               token: pushToken
          }));

          return fetch(`${API_URL}/users/push/`, {
               method:"POST",
               headers:{
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`
               },
               body: JSON.stringify({
                    token: pushToken
               })
          });
     };
}

// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     isLoggedIn: false
};

// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){
          case LOG_IN :
               return applyLogIn(state, action);
          case LOG_OUT :
               return applyLogOut(state, action);
          case SET_USER :
               return applySetUser(state, action);  
          case SET_NOTIFICATIONS :
               return applySetNotifications(state, action);  
          default :
               return state;
     }
}

// Reducer Functions

function applyLogIn(state, action){
     const { token } = action;
     return {
          ...state,
          isLoggedIn : true,
          token
     }
}

// async function applyLogOut(state, action){
//      await AsyncStorage.clear();
//      const { token } = action;
//      return {
//           ...state,
//           isLoggedIn:false,
//           token: ""
//      }
// }

async function applyLogOut(state, action){
     await AsyncStorage.clear();
     const { user } = action;
     return {
          ...state,
          isLoggedIn:false,
          token:""
     }
}

function applySetUser(state, action){
     const { user } = action;
     return {
          ...state,
          profile : user
     }
}

function applySetNotifications(state, action){
     const { notifications } = action;
     return {
          ...state,
          notifications
     }
}

// Exports
const actionCreators = {
     login,
     facebookLogin,
     logOut,
     getNotifications,
     getOwnProfile,
     followUser,
     unfollowUser,
     getProfile,
     registerForPush
}

export { actionCreators };

// Default Reducer Export

export default reducer