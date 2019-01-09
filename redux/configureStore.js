import { applyMiddleware, createStore} from "redux";
import { persistStore , persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";

const middlewares = [thunk];

// 스토어에 저장한다.
// 모바일 폰에 스토어를 저장하는 것이 redux-persist
const persistConfig = {
     key : "root",
     storage
     //blacklist:["user"]
};

// 모바일폰의 디스크에 리듀서들을 생성한 config들과 함께 저장.
const reducer = persistCombineReducers(persistConfig, {
     user
});

const configureStore = () => {
     //미들웨어를 실행
     let store = createStore(reducer, applyMiddleware(...middlewares));

     //스토어 유지
     let persistor = persistStore(store);
     return { store, persistor }
}

export default configureStore;