// import axios from "axios";
import { createClient } from "pexels";
import config from "../config";
// const { createClient } = require("pexels");
// const config = require("../config");

const client = createClient(config.PEXELS_API);
let query;
let imageNum;

const fetchImage = async (query, imageNum) => {
  const data = await client.photos.search({ query, per_page: imageNum });

  const images = data.photos.map((photo) => photo.src.original);

  // for (let i = 0; i < images.length; i++) {
  //   console.log(images[i]);
  // }
  // console.log(images);
  return images;
};

fetchImage(query, imageNum);

export default fetchImage;
