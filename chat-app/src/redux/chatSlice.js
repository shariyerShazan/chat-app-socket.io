import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name : "chat" ,
    initialState: {
         chats : []
    } ,
    reducers : {
        setChats : (state , action)=>{
            state.chats = action.payload
        }
    }
})
export const {setChats} = chatSlice.actions
export default chatSlice.reducer