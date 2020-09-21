import { Tweet } from "../types";

export const EMPTY_TWEET: Tweet = {
  created_at: "",
  id: 0,
  id_str: "",
  text: "",
  display_text_range: [0, 100],
  source: "",
  truncated: false,
  in_reply_to_status_id: 0,
  in_reply_to_status_id_str: "",
  in_reply_to_user_id: 0,
  in_reply_to_user_id_str: "",
  in_reply_to_screen_name: "",
  user: {
    id: 0,
    id_str: "",
    name: "",
    screen_name: "",
    location: null,
    url: null,
    description: "",
    translator_type: "" as any,
    protected: false,
    verified: false,
    followers_count: 0,
    friends_count: 0,
    listed_count: 0,
    favourites_count: 0,
    statuses_count: 0,
    created_at: "",
    utc_offset: null,
    time_zone: null,
    geo_enabled: false,
    lang: null,
    contributors_enabled: false,
    is_translator: false,
    profile_background_color: "",
    profile_background_image_url: "",
    profile_background_image_url_https: "",
    profile_background_tile: false,
    profile_link_color: "",
    profile_sidebar_border_color: "" as any,
    profile_sidebar_fill_color: "" as any,
    profile_text_color: "",
    profile_use_background_image: false,
    profile_image_url: "",
    profile_image_url_https: "",
    profile_banner_url: "",
    default_profile: false,
    default_profile_image: false,
    following: null,
    follow_request_sent: null,
    notifications: null,
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  quote_count: 0,
  reply_count: 0,
  retweet_count: 0,
  favorite_count: 0,
  entities: {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: [],
  },
  favorited: false,
  retweeted: false,
  filter_level: "none" as any,
  lang: "",
  timestamp_ms: "",
  sentimentResult: {
    score: 0,
    comparative: 0,
    calculation: [],
    tokens: [],
    words: [],
    positive: [],
    negative: [],
  },
};
