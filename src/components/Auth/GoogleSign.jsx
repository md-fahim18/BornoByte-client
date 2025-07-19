import React, { useContext } from 'react';

import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';


import { GoogleAuthProvider } from 'firebase/auth';
import AuthContext from './AuthContext';
import AxiosPublic from './AxiosPublic';

const GoogleSign = () => {
    const {googleSign} = useContext(AuthContext)
    const axiosPublic = AxiosPublic()
    const location = useLocation();
    const navigate= useNavigate();
    const from =location.state|| '/';
    const handlegoogleSign = () =>{
      
        googleSign()
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result?.user;
            console.log(user);
            //existing ???
            const userInfo = {
                email : user.email,
                name: user.displayName,

            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data);
                navigate(from);
            })
           
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorMessage);
          });

    }

    return (
        <div>
            <button onClick={handlegoogleSign} className="btn btn-outline btn-secondary btn-wide text-center">Sign In with <FcGoogle /></button>
            
            
        </div>
    );
};

export default GoogleSign;