import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const storeExpirationDate=localStorage.getItem('expiration');
    const expirationDate=new Date(storeExpirationDate); 
    const currentDate=new Date();
    const duration=expirationDate.getTime()-currentDate.getTime();
    return duration;

}

export function getAuthToken(){
    const token=localStorage.getItem('token');
    const duration=getTokenDuration();
    if(duration<0){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader(){
   return getAuthToken();
}

export function checkAuthLoader(){
    const token=getAuthToken();
    if(!token){
        return redirect('/auth')
    }
    return null;
}