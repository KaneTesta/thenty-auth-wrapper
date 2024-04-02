import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/components/context/UserContext";
import axios from "axios";

export const formatResponse = (response) => {
	const { status, data, error, isFetching, refetch } = response;

	return {
		loaded: status === "loading" ? false : true,
		data: data?.data,
		error,
		isFetching,
		status,
		refetch,
	};
};

export const getAxiosConfig = (baseURL, endpoint, body, method = "post", params, headers = {}) => {
	return {
		baseURL,
		url: endpoint,
		method: method,
		headers,
		params,
		data: body,
	};
};

export const useQueryEndpoint = (baseURL, endpoint, body, method, params, enabled = true) => {
	const config = getAxiosConfig(baseURL, endpoint, body, method, params);

	const { accessToken } = useUserContext();
	if (accessToken) config["headers"]["Authorization"] = `Bearer ${accessToken}`;
	if (accessToken) config["headers"]["X-Refresh-Token"] = `Bearer ${accessToken}`;

	const response = useQuery([baseURL, endpoint, params, method], () => axios(config), {
		enabled: enabled && Boolean(accessToken),
		staleTime: 500, // Caching should be done on backend. This causes issues if set to infinity as frontend starts returning old data after a PUT even though the API returns the correct data
	});
	return formatResponse(response);
};
