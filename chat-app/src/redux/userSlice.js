import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user" ,
    initialState: {
        user : null ,
        otherUsers: [],
        onlineUsers : []
    },
     reducers: {
        setUser : (state , action)=>{
            state.user = action.payload
        },
        setOtherUsers: (state , action)=>{
            state.otherUsers = action.payload
        } ,
        setOnlineUsers : (state , action)=>{
            state.onlineUsers = action.payload
        }
     }
})

export const {setUser , setOtherUsers , setOnlineUsers} = userSlice.actions
export default userSlice.reducer