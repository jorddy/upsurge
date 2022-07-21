import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "@/server/router";
import { SessionProvider } from "next-auth/react";
import { QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Upsurge - The Simpler Way To Log Workouts</title>
        <meta
          name='description'
          content='Upsurge is the best way to log your gym workouts. Quick, easy and no ads'
        />
      </Head>
      <div
        className='min-h-screen bg-zinc-800 text-white 
          [background-image:url("/Background.png")] bg-cover bg-fixed'
      >
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
      <Toaster position='top-right' />
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      queryClientConfig: {
        queryCache: new QueryCache({
          onError: error => toast.error(`Something went wrong: ${error}`)
        })
      }
    };
  },
  ssr: false
})(MyApp);
