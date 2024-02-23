const mongoose = require("mongoose");
const URI =process.env.MONGOOSE_URL ;
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
