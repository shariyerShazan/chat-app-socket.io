import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MESSAGE_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/apiEndpoints'
import { setOtherUsers } from '../redux/userSlice'

export const useGetOtherUsers = () => {
    const dispatch = useDispatch()
       const fetchOtherUsers = useCallback(async ()=>{
            try {
                const res = axios.get(`${MESSAGE_API_ENDPOINT}/other-users` , {withCredentials: true})
                if(res.data.success){
                    dispatch(setOtherUsers(res.data.otherUsers))
                }
            } catch (error) {
                console.log(error)
            }
       }, [dispatch])

       useEffect(()=>{
        fetchOtherUsers()
       }, [fetchOtherUsers])
       return { refetchOtherUsers :fetchOtherUsers} 
}


