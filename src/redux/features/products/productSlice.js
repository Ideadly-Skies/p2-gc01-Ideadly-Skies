import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../../configs/firebase";
import { getDocs, collection } from 'firebase/firestore'

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    // to reduce the logic in the component
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload 
        } 
    }
})

export const { setProducts, setProduct, setLoading, setError } = productSlice.actions

export const fetchProducts = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const result = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(), // => object { name, imageUrl, price }
            };
        });
        dispatch(setProducts(result));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
}

export default productSlice.reducer