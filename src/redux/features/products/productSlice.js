import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../../configs/firebase";
import { addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
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

export const addProduct = (product) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await addDoc(collection(db, "products"), {
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price
        });
        dispatch(fetchProducts());
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
}

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

export const fetchProductById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)
        // console.log(docSnap.data())
        if (docSnap.exists){
            const product = {
                name: docSnap.data().name,
                imageUrl: docSnap.data().imageUrl,
                price: docSnap.data().price,
            }
            dispatch(setProduct(product))
            
            // setName(docSnap.data().name)
            // setImageUrl(docSnap.data().imageUrl)
            // setPrice(docSnap.data().price)
        }

    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
}

export const editProductById = (product) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        const docRef = doc(db, "products", product.id)
        await updateDoc(docRef, {
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price
        })
        dispatch(fetchProducts())
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteProduct = (idProduct) => async (dispatch) => {
    dispatch(setLoading(true)); 
    try {
        await deleteDoc(doc(db, "products", idProduct));
        dispatch(fetchProducts());
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
}

export default productSlice.reducer