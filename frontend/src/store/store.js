import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = { token: "", isLoggedIn: false,isAdmin:false};
const initialCartState = { cart: [] , Price: 0 , order: {} ,orders:[] };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.isAdmin = false;
      localStorage.removeItem('user')
    },
    setAdmin(state){
      state.isAdmin = true
    }
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    AddToCart(state, action) {
      state.cart.push(action.payload.item);
      
    },
    RemoveFromCart(state, action) {
      state.cart = state.cart.filter((x) => x.id !== action.payload);
    },
    MakePrice(state) {
      state.Price = 0;
    },
    CalculatePrice(state) {
      if (state.cart.length > 0) {
        state.cart.map((x) => {
          state.Price = x.qty * x.price + state.Price;
        });
      }
    },
    ChangeQty(state, action) {
      state.cart.map((x) => {
        if (x.id == action.payload.id) {
          x.qty = action.payload.qty;
        }
      });
    },
    saveShippingAddress(state,action){
        state.order = {
            cart:state.cart,
            shippingAddress:action.payload
        }
    },
    savePaymentMethod(state,action){
        state.order = {
            ...state.order,
            PaymentMethod : action.payload
        }
    },
    createOrder(state,action){
      state.orders.push(action.payload)
    }
  },
});


const store = configureStore({
  reducer: { auth: authSlice.reducer, cart: cartSlice.reducer },
});




export const authAction = authSlice.actions;
export const cartAction = cartSlice.actions;

export default store;