import "dotenv/config";

const config = {
  IS_DEV: process.env.NODE_ENV !== "production",
  OMDB_API_URL: process.env.OMDB_API_URL,
  DB_HOST: process.env.DB_HOST,
};

export default config;
