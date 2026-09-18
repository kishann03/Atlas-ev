const mongoose = require("mongoose");

/**
 * Connects to MongoDB Atlas using the connection string stored in
 * the MONGO_URI environment variable. No credentials are hardcoded here —
 * they live only in your local .env file (which is git-ignored).
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGO_URI is not defined. Check that your .env file exists and contains MONGO_URI."
      );
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed.");
    console.error(`   Reason: ${error.message}`);

    // Stop the app if the database can't be reached — running an API
    // that silently can't talk to its database causes confusing bugs later.
    process.exit(1);
  }
};

module.exports = connectDB;
