import { configureStore,combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import productsReducer from "../Redux/ProductSlice";
import categoryReducer from "../Redux/CategorySlice";
import filterReducer from "../Redux/FilterSlice";
import visitedReducer from "../Redux/Recentslice";
import forgotpassReducer from "../Redux/ForgotSlice";
import verifyotpReducer from "../Redux/VerifyotpSlice";
import changepasswordReducer from "../Redux/ChangepassSlice";
import CartdataReducer from '../Redux/CartSlice';
import ReviewReducer from '../Redux/ReviewSlice';
import BuyproductReducer from '../Redux/BuyproductSlice'
import  AddressReducer  from "../Redux/Addresses";
import ShippingaddressReducer from '../Redux/Shippingaddress'

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist specific reducers to be persisted
  whitelist: ['product', 'category', 'filter', 'visited', 'forgotpass', 'verifyotp', 'changepass', 'Cart', 'Review','Buyproduct','Address','Shippingaddress'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  product: productsReducer,
  category: categoryReducer,
  filter: filterReducer,
  visited: visitedReducer,
  forgotpass: forgotpassReducer,
  verifyotp: verifyotpReducer,
  changepass: changepasswordReducer,
  Cart: CartdataReducer,
  Review: ReviewReducer,
  Buyproduct:BuyproductReducer,
  Address:AddressReducer,
  Shippingaddress:ShippingaddressReducer
}));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
