import { useState, useEffect } from "react";
import {
  useConfig,
  useSetTweets,
  useLoading,
  useAddTweets,
  useTweets,
} from "../providers/store";
import { SERVER_URL } from "./constants";
import { geoDistanceKm } from "./distanceFromCoords";

export function useWindowSize() {
  // (For SSR apps only?) Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function useFetchTimeline() {
  const { loading, setLoading } = useLoading();
  const { numTweets } = useConfig();
  const { allowedMediaTypesParam } = useParamsForFetch();

  const setTweets = useSetTweets();
  const tweets = useTweets();
  const addTweets = useAddTweets();

  const fetchTimeline = async (
    userId: string,
    isFetchMore: boolean = false
  ) => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 10 * 1000);
    const resp = await fetch(
      `${SERVER_URL}/api/user_timeline?id_str=${userId}&num=${numTweets}${allowedMediaTypesParam}${
        isFetchMore ? `&maxId=${tweets[tweets.length - 1].id_str}` : ""
      }`
    );
    const data = await resp.json();
    setLoading(false);
    window.clearTimeout(timer);

    (isFetchMore ? addTweets : setTweets)(data);
  };

  return { loading, fetchTimeline };
}

export function useFetchLikes() {
  const { loading, setLoading } = useLoading();
  const { numTweets } = useConfig();
  const { allowedMediaTypesParam } = useParamsForFetch();
  const setTweets = useSetTweets();

  const fetchLikes = async (userId: string) => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 10 * 1000);
    const resp = await fetch(
      `${SERVER_URL}/api/user_likes?id_str=${userId}&num=${numTweets}${allowedMediaTypesParam}`
    );
    const data = await resp.json();
    setLoading(false);
    window.clearTimeout(timer);
    setTweets(data);
  };

  return { loading, fetchLikes };
}

export function useParamsForFetch() {
  const { lang, allowedMediaTypes, countryCode, geolocation } = useConfig();
  const langParam = lang !== "All" ? `&lang=${lang}` : "";
  const allowedMediaTypesParam = !allowedMediaTypes.all
    ? `&allowedMediaTypes=${allowedMediaTypes}`
    : "";
  const countryParam =
    countryCode !== "All" ? `&countryCode=${countryCode}` : "";
  // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
  const searchRadius = geolocation
    ? geoDistanceKm(
        geolocation.latitude.left,
        geolocation.longitude.left,
        geolocation.latitude.right,
        geolocation.longitude.left
      ) / 2
    : "";
  const geocodeParam = geolocation
    ? `&geocode=${
        (geolocation.latitude.left + geolocation.latitude.right) / 2
      },${
        (geolocation.longitude.left + geolocation.longitude.right) / 2
      },${searchRadius}km`
    : "";
  return { langParam, allowedMediaTypesParam, countryParam, geocodeParam };
}
