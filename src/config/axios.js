import axios from "axios";

const axiosInstance = axios.create({
	headers: {
		"X-Site-Key": process.env.NEXT_PUBLIC_APP_SITE_KEY,
		"X-Secret-Key": process.env.NEXT_PUBLIC_APP_SECRET_KEY,
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
