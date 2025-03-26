import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'

const MerchantRoute = () => {
    const {userInfo} = useSelector(state => state.auth);

  return userInfo && userInfo.isMerchant? (
    <Outlet/> 
    ):(
   <Navigate to="/login" replace/>
  )
};
 
export default MerchantRoute;