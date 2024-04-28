import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
};

const adduserSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    fetchUserInfoPending: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    fetchUserInfoSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    fetchUserInfoFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { fetchUserInfoPending, fetchUserInfoSuccess, fetchUserInfoFailure } = adduserSlice.actions;

export const fetchUserInfo = (uid) => async (dispatch) => {
  dispatch(fetchUserInfoPending());
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(fetchUserInfoSuccess(docSnap.data()));
    } else {
      dispatch(fetchUserInfoSuccess(null));
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    dispatch(fetchUserInfoFailure());
  }
};

export default adduserSlice.reducer;
