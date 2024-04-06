import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";

// Layout wrapper that protects content if a user is not logged in
const AuthenticationWrapper = ({ children, unauthedComponent, loadingComponent }) => {
	const { user, isLoadingUser } = useUserContext();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (user && !isLoadingUser) {
			return setAuthenticated(true);
		}

		setAuthenticated(false);
	}, [user, isLoadingUser]);

	if (isLoadingUser) return loadingComponent;
	return authenticated ? children : unauthedComponent;
};

export default AuthenticationWrapper;
