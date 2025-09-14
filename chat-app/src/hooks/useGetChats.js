import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MESSAGE_API_ENDPOINT } from '../utils/apiEndpoints'
import { setChats } from '../redux/chatSlice'

export const useGetChats = () => {
    const dispatch = useDispatch()
         const fetchChats = useCallback(async ()=>{
                try {
                    const res = await axios.get(`${MESSAGE_API_ENDPOINT}/get-message` , {withCredentials: true})
                    if(res.data.success){
                        dispatch(setChats(res.data.chats))
                    }
                } catch (error) {
                    console.log(error)
                }
         }, [dispatch])
         useEffect(()=>{
            fetchChats()
         }, [fetchChats])
         return {refetchChats : }
}


