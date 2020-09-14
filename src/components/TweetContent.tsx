import React, { useRef, useEffect } from "react";
import { getMediaArr } from "../utils/utils";
import countryCodes from "../utils/countryCodes";
import RetweetedIcon from "@material-ui/icons/CachedRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import ReplyIcon from "@material-ui/icons/Reply";
import { Button } from "@material-ui/core";
import { useFetchTimeline } from "../utils/hooks";
import { TweetStyles } from "./TweetStyles";
import { Body2, Body1 } from "./common/DivStyles";

export default function TweetContent({
  tweet,
  offset = 0,
  isTooltip,
  autoPlay = true,
}) {
  const {
    user,
    text,
    retweeted_status,
    extended_tweet,
    extended_entities,
    entities,
  } = tweet;
  const retweetedUser = retweeted_status?.user
    ? {
        name: retweeted_status.user.name,
        screen_name: retweeted_status.user.screen_name,
        id_str: retweeted_status.user.id_str,
      }
    : null;

  let parsing = null; //TODO necessary?

  const mediaArr = getMediaArr(tweet);
  const fullText =
    extended_tweet?.full_text ||
    retweeted_status?.extended_tweet?.full_text ||
    retweeted_status?.text ||
    text;
  const textWithLinks = fullText
    .split(" ")
    // if first two are "RT: someUser", store separately
    .reduce((acc, cur, idx) => {
      if (cur === "RT") {
        parsing = "next";
        return acc;
      } else if (parsing === "next") {
        parsing = cur;
        return acc;
      } else {
        return [...acc, cur];
      }
    }, [])
    .map((word) =>
      word[0] === "@" ? (
        <a
          style={{ marginRight: "0.5ch" }}
          key={word}
          href={`https://twitter.com/${
            word.slice(-1) === ":" ? word.slice(1, -1) : word.slice(1)
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {word}
        </a>
      ) : word[0] === "#" ? (
        <a
          style={{ marginRight: "0.5ch" }}
          key={word}
          href={`https://twitter.com/hashtag/${word.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {word}
        </a>
      ) : word.slice(0, 5) === "https" ? (
        <a
          style={{ marginRight: "0.5ch" }}
          key={word}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
        >
          {word}
        </a>
      ) : (
        word + " "
      )
    );

  // focus the video player when it starts playing
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef.current && autoPlay) {
      (videoRef.current as any).focus();
    }
  }, [autoPlay]);
  return (
    <TweetStyles
      isRetweet={Boolean(retweetedUser)}
      isTooltip={isTooltip}
      videoHeight={-offset + 270}
      isVideo={extended_entities?.media[0]?.type === "video"}
    >
      {retweetedUser && (
        <div className="retweetedUser">
          <Body1 className="user_name">{retweetedUser.name}</Body1>
          <a
            href={`https://twitter.com/${retweetedUser.screen_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="user_screen_name"
          >
            @{retweetedUser.screen_name}
          </a>
          {!isTooltip && <BtnFetchTimeline user={retweetedUser} />}
        </div>
      )}
      <div className="userInfo">
        {retweetedUser && (
          <>
            <RetweetedIcon /> <div className="retweetedBy">by </div>
          </>
        )}
        <Body2 className="username">{user.name}</Body2>
        <a
          href={`https://twitter.com/${user.screen_name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="user_screen_name"
        >
          @{user.screen_name}
        </a>
        <BtnFetchTimeline user={user} />
      </div>

      {tweet.in_reply_to_screen_name && (
        <>
          <Body2 className="inReplyTo">
            <ReplyIcon />
            to
            <a
              style={{ marginLeft: "0.5ch" }}
              href={`https://twitter.com/${tweet.in_reply_to_screen_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{tweet.in_reply_to_screen_name}
            </a>
          </Body2>
        </>
      )}
      {(user.location || entities?.place?.country_code) && (
        <Body2 className="locationInfo">
          {user.location && (
            <>
              <LocationIcon />
              {user.location}
            </>
          )}
          {entities?.place?.country_code && (
            <Body2 className="country">
              | {countryCodes[entities?.place?.country_code]}
            </Body2>
          )}
        </Body2>
      )}
      <Body2 className="text">{textWithLinks}</Body2>

      <div className="allMedia">
        {mediaArr.map(({ type, id_str, poster, src }) => {
          return (
            <div className="media" key={id_str}>
              {type === "video" ? (
                <video
                  ref={videoRef}
                  key={`${autoPlay}`} /* re-render when autoplay changes */
                  controls={true}
                  poster={poster}
                  src={src}
                  autoPlay={autoPlay}
                  loop={true}
                ></video>
              ) : (
                <a
                  className="imgLink"
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={src} alt="" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </TweetStyles>
  );
}

function BtnFetchTimeline({ user }) {
  const { fetchTimeline } = useFetchTimeline();

  return (
    <Button
      className="btnFetchTimeline"
      variant="outlined"
      color="primary"
      onClick={() => fetchTimeline(user.id_str)}
    >
      Fetch
    </Button>
  );
}
