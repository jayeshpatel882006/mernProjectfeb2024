const mongoose = require("mongoose");
const URI =
  "mongodb+srv://jayu07498:9106073301@mernfeb2024.earybiu.mongodb.net/mernfeb2024?retryWrites=true&w=majority";
const ConnectToMongo = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected To Mongo");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};
module.exports = ConnectToMongo;
