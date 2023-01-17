import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "../components/Header";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header />
        <div className="h-[80px]" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
