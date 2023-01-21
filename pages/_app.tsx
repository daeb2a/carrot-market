import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const CheckUserLoggedIn = () => {
    router.pathname === "/enter"
    ? ""
    : useUser(); 
    return null;
  }
  return (
    <SWRConfig
      value={{
        // refreshInterval: 2000,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto bg-white">
        <CheckUserLoggedIn />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
