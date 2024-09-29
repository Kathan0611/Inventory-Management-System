require('dotenv').config();

const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT;
const Atoken=process.env.Atoken;
const cloud_name=process.env.cloud_name;
const api_key=process.env.api_key
const api_secret=process.env.api_key

module.exports={
    MONGO_URL,
    PORT,
    Atoken,
    cloud_name,
    api_key,
    api_secret
}
