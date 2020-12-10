import { useEffect, useRef } from "react";
import { useNodes } from "../../providers/store";
import { useFetchBotScoreForTweet } from "components/common/useFetchBotScoreForTweet";

/** when nodes change, fetch bot scores for each */
export function useGenerateBotScoresOnNewTweets() {
  const nodes = useNodes();
  const fetchBotScoreForTweet = useFetchBotScoreForTweet();

  // faily rate limit of 500 so just fetch 1 per load
  const foundOne = useRef(false);

  // fetch only every 1s due to RapidAPI free tier rate limit
  useEffect(() => {
    // fetch the first one only
    // use a for loop to force synchronous (forEach is parallel)
    for (let index = 0; index < nodes.length; index++) {
      const tweet = nodes[index];
      if (!foundOne.current && !tweet.botScore) {
        foundOne.current = true;
        setTimeout(() => {
          fetchBotScoreForTweet(tweet);
        }, 1001);
      }
    }
  }, [nodes, fetchBotScoreForTweet]);
}
