import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export default function UserContextWrapper({ children }) {

    // TODO
    const login = () => null
    const logout = () => null
    
    // TODO
    // On page change
    const validateToken = () => null

	return <UserContext.Provider value={
        login,
        logout,
    }>{children}</UserContext.Provider>;
}

export function useUserContext() {
	return useContext(UserContext);
}
