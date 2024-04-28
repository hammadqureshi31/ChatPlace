import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";

const userChatsSlice = createSlice({
  name: "userChats",
  initialState: [],
  reducers: {
    updateChatSeenStatus: (state, action) => {
      const { userId, chatId } = action.payload;
      const userChat = state.find((chat) => chat.userId === userId);
      if (userChat) {
        const chatIndex = userChat.chats.findIndex(
          (chat) => chat.chatId === chatId
        );
        if (chatIndex !== -1) {
          userChat.chats[chatIndex].isSeen = true;
        }
      }
    },
  },
});

export const { updateChatSeenStatus } = userChatsSlice.actions;
export default userChatsSlice.reducer;

export const updateUserChatSeenStatus = (userId, chatId) => async (dispatch) => {
  const userChatsRef = doc(db, "userchats", userId);
  try {
    await updateDoc(userChatsRef, {
      [`chats.${chatId}.isSeen`]: true,
    });
    dispatch(updateChatSeenStatus({ userId, chatId }));
  } catch (err) {
    console.log(err);
  }
};
