import { createContext, useContext, useEffect, useState } from "react";
import { LOGIN_USER } from "@/config/queries";
import axiosInstance from "@/config/axios";

const fetchStorageKey = () => {
	return `${process.env.NEXT_PUBLIC_APP_NAME}.authorization`;
};

export const UserContext = createContext(null);

export default function UserContextWrapper({ children }) {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();

	const fetchAuthorizationHeaders = () => {
		return {
			Authorization: `Bearer ${accessToken}`,
			"X-Refresh-Token": refreshToken,
		};
	};

	const setAuthCookie = ({ data }) => {
		const { authorization, member } = data;
		const { refresh, key } = authorization;

		localStorage.setItem(fetchStorageKey(), JSON.stringify(authorization));
		localStorage.setItem(fetchStorageKey(), JSON.stringify(member));

		setAccessToken(key);
		setRefreshToken(refresh);
		setUser(member);
	};

	/**
	 * Function to log in a user.
	 *
	 * @param {Object} data An object containing the user's email address and password.
	 * @param {string} options.email_address - The text to be displayed in the modal.
	 * @param {string} options.password - The link to be attached to the modal.
	 */
	const login = (data) => {
		const setAuthError = ({ message }) => setError(message);

		axiosInstance({ ...LOGIN_USER, data })
			.then(setAuthCookie)
			.catch(setAuthError);
	};

	/**
	 * Function to log out a user.
	 */
	const logout = () => {
		localStorage.removeItem(fetchStorageKey("authorization"));
		localStorage.removeItem(fetchStorageKey("member"));
		setUser(null);
	};

	/**
	 * Validate user token
	 */
	const validateToken = () => {
		const setAuthError = ({ message }) => {
			setError(message);
			logout();
		};

		axiosInstance({ ...FETCH_TOKEN, headers: fetchAuthorizationHeaders() })
			.then(setAuthValue)
			.catch(setAuthError);
	};

	useEffect(() => {
		validateToken();

		// Run token validation logic on every route change
		const handleRouteChange = () => {
			validateToken();
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		// Unsubscribe from route change events when component is unmounted
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router]);

	return (
		<UserContext.Provider value={(login, logout, user, refreshToken, accessToken)}>{children}</UserContext.Provider>
	);
}

export function useUserContext() {
	return useContext(UserContext);
}
