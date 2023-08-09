const mongoose = require("mongoose");

exports.connectToDB = async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://yamxxnx:Yamaan%402001@cluster0.ct53f7l.mongodb.net/Product",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connection Succeeded.");
  } catch (err) {
    console.log("Error in DB connection : " + err);
    throw err;
  }
};

