import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";

// Layout wrapper that protects content if a user is not logged in
const AuthenticationWrapper = ({ children, unauthedComponent }) => {
	const { user, isUserLoading } = useUserContext();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (user && !isUserLoading) {
			return setAuthenticated(true);
		}

		setAuthenticated(false);
	}, [user, isUserLoading]);

	return authenticated ? children : unauthedComponent;
};

export default AuthenticationWrapper;
