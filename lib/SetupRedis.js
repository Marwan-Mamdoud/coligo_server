import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: "https://legal-doe-38886.upstash.io",
  token: "AZfmAAIncDJiMzBlYTFlN2JkMWM0ZGM0YWZmNjMyZTZmMjFkN2IzNnAyMzg4ODY",
});

export default redis;
