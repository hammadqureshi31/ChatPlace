import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./slices/displaySlice";
import detailsReducer from "./slices/detailsSlice";
import signupReducer from "./slices/signupSlice";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/addUserSlice";
import chatReducer from "./slices/userChatsSlice";
import fetchChatReducer from "./slices/fetchChatlist";
import userIdReducer from "./slices/userIdSlice";
import latestUserReducer from "./slices/latestUserId";

export const store = configureStore({
    reducer: {
        display: displayReducer,
        details: detailsReducer,
        signupPage: signupReducer,
        loginPage: loginReducer,
        adduser: userReducer,
        userChat: chatReducer,
        fetchChat: fetchChatReducer,
        userID: userIdReducer,
        latestUser: latestUserReducer
    }
});
