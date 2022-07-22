import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "@/server/router";
import { SessionProvider } from "next-auth/react";
import { QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { withTRPC } from "@trpc/next";
import { useOnlineStatus } from "@/utils/online";
import superjson from "superjson";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const SEO = () => {
  const title = "Upsurge - Log workouts simple";
  const description =
    "Upsurge is the easier way to log your workouts. Quick, easy and no ads";
  const url = "https://upsurge.vercel.app";

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='msapplication-TileColor' content='#ea580c' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#1c1917' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/icon-192x192.png' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ea580c' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='Upsurge' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={`${url}/icon-192x192.png`} />
    </Head>
  );
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  useOnlineStatus();

  return (
    <SessionProvider session={session}>
      <SEO />
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
