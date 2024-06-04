import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductI } from '../../types/Interfaces'
import axios from 'axios'


const initialState: ProductI = {
    products: [],
    loading: false,
    error: ""
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const res = await axios.get('http://localhost:4000/product')
    return res.data.products
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer
