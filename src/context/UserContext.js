import { createContext, useContext, useEffect, useState } from "react";
import { LOGIN_USER, FETCH_TOKEN } from "@/config/queries";
import axiosInstance from "@/config/axios";
import { useRouter } from "next/router";
import { callbackWithMinDuration } from "@/util";

const fetchStorageKey = (storageKey) => {
	return `${process.env.NEXT_PUBLIC_APP_NAME}.${storageKey}`;
};

export const UserContext = createContext(null);

export default function UserContextWrapper({ children }) {
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	const [isLoadingUser, setisLoadingUser] = useState(null);
	const router = useRouter();

	const getStorageValue = (storageKey, key = null) => {
		let storageItem = localStorage.getItem(fetchStorageKey(storageKey));

		if (storageItem) {
			storageItem = JSON.parse(storageItem);
			if (key) return storageItem[key];
			return storageItem;
		}

		return null;
	};

	const fetchAuthorizationHeaders = (aT = null, rT = null) => {
		return {
			Authorization: `Bearer ${aT ?? accessToken}`,
			"X-Refresh-Token": rT ?? refreshToken,
		};
	};

	const setAuthValue = ({ data }) => {
		const { authorization, member } = data;
		const { refresh, key } = authorization;

		localStorage.setItem(fetchStorageKey("authorization"), JSON.stringify(authorization));
		localStorage.setItem(fetchStorageKey("member"), JSON.stringify(member));

		setAccessToken(key);
		setRefreshToken(refresh);
		setUser(member);
		callbackWithMinDuration(() => setisLoadingUser(false), isLoadingUser);
	};

	/**
	 * Function to log in a user.
	 *
	 * @param {Object} data An object containing the user's email address and password.
	 * @param {string} options.email_address - The text to be displayed in the modal.
	 * @param {string} options.password - The link to be attached to the modal.
	 */
	const login = (data) => {
		const setAuthError = ({ message }) => {
			setError(message);
			setisLoadingUser(false);
		};

		axiosInstance({ ...LOGIN_USER, data })
			.then(setAuthValue)
			.catch(setAuthError);
	};

	/**
	 * Function to log out a user.
	 */
	const logout = () => {
		// localStorage.removeItem(fetchStorageKey("authorization"));
		// localStorage.removeItem(fetchStorageKey("member"));
		// setUser(null);
	};

	/**
	 * Validate user token
	 */
	const validateToken = (headers = null) => {
		const setAuthError = ({ message }) => {
			setError(message);
			logout();
			setisLoadingUser(false);
		};

		setisLoadingUser(Date.now());
		axiosInstance({ ...FETCH_TOKEN, headers: headers ?? fetchAuthorizationHeaders() })
			.then(setAuthValue)
			.catch(setAuthError);
	};

	useEffect(() => {
		// Run token validation logic on every route change
		const handleRouteChange = () => {
			if (accessToken) validateToken();
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		// Unsubscribe from route change events when component is unmounted
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router]);

	useEffect(() => {
		const { key, refresh } = getStorageValue("authorization");
		setUser(getStorageValue("member"));
		setRefreshToken(refresh);
		setAccessToken(key);

		if (key) {
			validateToken(fetchAuthorizationHeaders(key, refresh));
		}
	}, []);

	return (
		<UserContext.Provider value={{ login, logout, user, refreshToken, accessToken, isLoadingUser, error }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	return useContext(UserContext);
}
