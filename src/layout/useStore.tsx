import { useContext } from "react";
import { AuthContext } from "../GlobalProvider/GlobalProvider";

const useStore:any = () => {
    return useContext(AuthContext);
};

export default useStore;