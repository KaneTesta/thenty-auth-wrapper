import * as React from "react";
import UserContext from "@/context/UserContext";
import "@/styles/main.scss";

export default function App({ Component, pageProps }) {
	return (
		<UserContext>
			<Component {...pageProps} />
		</UserContext>
	);
}
