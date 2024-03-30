import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Watch from "./pages/WatchAnime";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchResult from "./pages/SearchResults";
import AnimeDetails from "./pages/AnimeDetails";
import Watchlist from "./pages/Watchlist";

// Creating a new QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000, // inactive time for query's garbage collection
      staleTime: 10 * 60 * 1000, // time until query uses data from cache
      refetchOnWindowFocus: false, // Whenever window comes in focus it won't refetch the data
      refetchOnReconnect: true, // refetches on reconnection
      // retry: false, // already handling retries
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "anime/:animeId",
        element: <AnimeDetails />,
      },
      {
        path: "watch/:animeId/:episodeId",
        element: <Watch />,
      },
      {
        path: "search/:query",
        element: <SearchResult />,
      },
      {
        path: 'watchlist',
        element: <Watchlist/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )} */}
    </QueryClientProvider>
  </React.StrictMode>
);
