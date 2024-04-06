import { useState } from "react";
import UserContext, { useUserContext } from "@/context/UserContext";
import "@/styles/main.scss";
import AuthenticationWrapper from "@/components/AuthenticationWrapper";

const LoginPrompt = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const { login } = useUserContext();

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "fit-content" }}>
			<div>You need to log in</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				<div>
					<input onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
				</div>
				<div>
					<input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
				</div>
				<button onClick={() => login({ email_address: email, password })}>Log in</button>
			</div>
		</div>
	);
};

const LoadingComponent = () => {
	return <h1>Loading</h1>;
};

export default function App({ Component, pageProps }) {
	return (
		<UserContext>
			<AuthenticationWrapper unauthedComponent={<LoginPrompt />} loadingComponent={<LoadingComponent />}>
				<Component {...pageProps} />
			</AuthenticationWrapper>
		</UserContext>
	);
}
