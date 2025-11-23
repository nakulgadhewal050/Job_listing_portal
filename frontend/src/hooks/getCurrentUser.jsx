import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


function getCurrentUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true });
                dispatch(setUserData(result.data));
            } catch (error) {
                dispatch(setUserData(null));
            }
        }
        fetchCurrentUser();
    }, []);
}

export default getCurrentUser;