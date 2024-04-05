export const LOGIN_USER = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	url: "/auth/members/login",
	method: "POST",
};

export const REGISTER_USER = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	url: "/auth/members/register",
	method: "POST",
};

export const FETCH_TOKEN = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	url: "/auth/members/token",
	method: "GET",
};
