import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server/router";
import superjson from "superjson";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <div
        className='min-h-screen bg-zinc-800 text-white 
          [background-image:url("/Background.png")] bg-cover bg-fixed'
      >
        <Head>
          <title>Upsurge - The Simple Way To Log Workouts</title>
          <meta
            name='description'
            content='Upsurge is the best way to log your gym workouts'
          />
        </Head>
        <Component {...pageProps} />
      </div>
      <Toaster position='top-right' />
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.NEXT_PUBLIC_URL
      ? `https://${process.env.NEXT_PUBLIC_URL}/api/trpc`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
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
