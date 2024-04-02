import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument(props) {
	return (
		<Html lang="en">
			<Head></Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx) => {
	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
	};
};
