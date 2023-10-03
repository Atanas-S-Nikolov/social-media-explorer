import axios from "axios";

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY
  }
})
