const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: "dzocrpv4x",
  api_key: "481644228244423",
  api_secret: "Fusab_uxVnL4MoYtmzHDJM4kKYs"
});

const uploadOnCloudinary = async (localFilePath) => {
  try {

    const parentDirPath = path.join(__dirname, '..');
    const filePath = path.join(parentDirPath, localFilePath);

    if(!filePath) return null;
    // Upload File on cloudinary
    const response = await cloudinary.uploader.upload(filePath,{
      resource_type: "auto"
    });
    // file uploaded successfully on cloudinary
    console.log("File Uploaded Successfully on Clodinary");
    console.log("Response ",response);

    return response.secure_url;
    
  } catch (error) {
    fs.unlinkSync(filePath); // if not uploaded on cloud then remove it from local server also
    return null;
  }
}

module.exports = uploadOnCloudinary;