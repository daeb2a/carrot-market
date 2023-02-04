import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  console.log("APP IS RUNNING");
  const router = useRouter();
  /* const CheckUserLoggedIn = () => {
    router.pathname === "/enter"
    ? ""
    : useUser(); 
    return null;
  } */
  return (
    <SWRConfig
      value={{
        // refreshInterval: 2000,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div /* className="w-full max-w-lg mx-auto bg-white" */>
        {/* <CheckUserLoggedIn /> */}
        <Component {...pageProps} />
      </div>
      {/* <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v13.0",
            });
          };
        }}
      /> */}
    </SWRConfig>
  );
}
