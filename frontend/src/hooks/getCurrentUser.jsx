import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


function getCurrentUser() {
    const dispatch = useDispatch();

    useEffect(()=> {
        const fetchCurrentUser = async () => {
            try {
                console.log('Fetching current user...');
                const result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true });
                console.log('Current user fetched:', result.data);
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log("error in fetching current user", error.response?.status, error.response?.data);
                // Don't set user data if there's an error (user not logged in)
                dispatch(setUserData(null));
            }
        }
        fetchCurrentUser();
    },[dispatch]);
}

export default getCurrentUser;