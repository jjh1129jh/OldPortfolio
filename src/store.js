import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useState } from 'react'

let quantity = createSlice({
  name : 'quantity',
  initialState : [],
  reducers : {
  }
})

// export let {  } = quantity.actions

export default configureStore({
  reducer: { 
    quantity : quantity.reducer
   }
}) 