// Imports

import { API_URL, FB_APP_ID } from "../../constant";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

// Actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";

// Action Creators

function setLogIn(token){
     return {
          type: LOG_IN,
          token
     }
}


function setLogOut(token){
     return {
          type: LOG_OUT
     }
}


function setUser(user){
     return {
          type: SET_USER,
          user
     }
}

// API Actions

function login(username, password){
     return dispatch => {
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
                    console.log(json)
                    dispatch(setLogIn(json.token))
                    dispatch(setUser(json.user))
                    return true
               }else{
                    console.log("unable login")
                    return false;
               }
          })
     }
}

function facebookLogin() {
     return async dispatch => {
          const { type , token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
               permissions:["public_profile","email"]
          })
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

async function applyLogOut(state, action){
     await AsyncStorage.clear();
     const { token } = action;
     return {
          ...state,
          isLoggedIn:false,
          token: ""
     }
}

function applySetUser(state, action){
     const { user } = action;
     return {
          ...state,
          profile : user
     }
}

// Exports

const actionCreators = {
     login,
     facebookLogin
}

export { actionCreators };

// Default Reducer Export

export default reducer