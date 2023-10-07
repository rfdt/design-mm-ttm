import React from 'react';
import PageLoader from "../PageLoader/PageLoader";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoute({children}) {

    const {isAuthenticated, isLoaded, isLoading} = useSelector(state => state.user);


    if(isLoading || !isLoaded){
        return <PageLoader />
    }

    if(!isAuthenticated && isLoaded){
        return <Navigate to={'/login'}/>
    }

 return (
     <>
     {children}
     </>
 );}

export default PrivateRoute;
