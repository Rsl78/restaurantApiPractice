import React, { createContext } from "react";
import useData from "./useData/useData";

// @ts-ignore
export const AuthContext = createContext();

const GlobalProvider = ({ children }: any) => {
    const data = useData()
    return (
        <AuthContext.Provider value={{data:data}}>{children}</AuthContext.Provider>
    );
};

export default GlobalProvider;