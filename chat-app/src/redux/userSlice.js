import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user" ,
    initialState: {
        user : null ,
        otherUsers: [],
    },
     reducers: {
        setUser : (state , action)=>{
            state.user = action.payload
        },
        setOtherUsers: (state , action)=>{
            state.otherUsera = action.payload
        }
     }
})

export const {setUser , setOtherUsers} = userSlice.actions
export default userSlice.reducer