import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { productAdd, productDel, productget } from '../Api/productAPI';
import { RootState } from '../app/store';
import { Payads } from '../model/ads';
import { Product } from '../model/product';



export interface CounterState {
  products:Product[] 
  cart:Product[]
  payads:Payads[]
  ref:boolean

}

const initialState: CounterState = {
  products:[],
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  payads: JSON.parse(localStorage.getItem('paymantads') || '[]'),
  ref:false
};

  export const getProductAsync = createAsyncThunk(
    'ads/productget',
    async (token:string) => {
        const response = await productget(token);
        return response.data;
    }
  );
  export const addProductAsync = createAsyncThunk(
    'ads/productAdd',
    async (product:any) => {
        const response = await productAdd(product.formData,product.token);
        return response.data;
    }
  );
  export const delProductAsync = createAsyncThunk(
    'ads/productDel',
    async (product:any) => {
        const response = await productDel(product.id,product.token);
        return response.data;
    }
  );

export const productSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addToCart: (state,action) => {
      state.cart = JSON.parse(localStorage.getItem('cart') || '[]')
      let existingArray:Product[] = state.cart
      existingArray.push(action.payload)
      state.cart = existingArray
      localStorage.setItem("cart",JSON.stringify(existingArray))
      toast.success("Add To Cart",{autoClose: 1000})
    },
    addPaymentAdToCart: (state,action) => {
      state.payads = JSON.parse(localStorage.getItem('paymantads') || '[]')
      let existingArray:Payads[] = state.payads
      existingArray.push(action.payload)
      state.payads = existingArray
      localStorage.setItem("paymantads",JSON.stringify(existingArray))
      toast.success("Add To Cart",{autoClose: 1000})
    },
    popFromCartAd: (state,action) => {
      state.payads = state.payads.filter(ad => ad.Title !== action.payload)
      localStorage.setItem("paymantads",JSON.stringify(state.payads))
      toast.warning("Product Removed From Cart",{autoClose: 2000,position: "bottom-right"});
    },
    popFromCart: (state,action) => {
      state.cart = state.cart.filter(product => product.name !== action.payload)
      localStorage.setItem("cart",JSON.stringify(state.cart))
      toast.warning("Product Removed From Cart",{autoClose: 2000,position: "bottom-right"});
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductAsync.fulfilled, (state, action) => { 
        state.products = action.payload
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        toast.error("Error Occurred. Please try again later",{autoClose: 1000});
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        toast.success("New Product created",{autoClose: 1000,position: "bottom-right"});
        state.ref = !state.ref  
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        toast.error("Error Occurred. Please try again later",{autoClose: 1000});
      })
  }
});

export const {addToCart,popFromCart,addPaymentAdToCart,popFromCartAd} = productSlice.actions;

export const selecproduct = (state: RootState) => state.product.products;
export const selecCart = (state: RootState) => state.product.cart;
export const selecPayAds = (state: RootState) => state.product.payads;
export const selecFlag = (state: RootState) => state.product.ref;
export default productSlice.reducer;


