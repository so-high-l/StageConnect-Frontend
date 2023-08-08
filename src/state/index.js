import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  offers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setOffers: (state, action) => {
      state.offers = action.payload.offers;
    },
    setOffer: (state, action) => {
      const updatedOffers = state.offers.map((offer) => {
        if (offer._id === action.payload.offer_id) return action.payload.offer;
      });
      state.offers = updatedOffers;
    },
  },
});

export const { setMode, setLogin, setLogout, setOffers, setOffer } =
  authSlice.actions;
export default authSlice.reducer;
