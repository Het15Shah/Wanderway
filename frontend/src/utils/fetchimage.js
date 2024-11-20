// import axios from "axios";
// import { createClient } from 'pexels';

const { createClient } = require('pexels');

const client = createClient('9eNdOrrjY5sGHhwhnQkQjIO5XH6JUAFN2VuEGbRErc0VPKvnzyu03nBn');
let query;
let imageNum;

const fetchImage = async (query,imageNum) => {
const data = await client.photos.search({ query, per_page: imageNum });

const images = data.photos.map(photo => photo.src.original);

// for (let i = 0; i < images.length; i++) {
//   console.log(images[i]);
// }   
// console.log(images);
return images;
}

fetchImage("goa",imageNum);

module.exports = fetchImage;