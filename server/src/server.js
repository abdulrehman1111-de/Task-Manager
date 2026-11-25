import { app } from "./app.js";
import "dotenv/config";
import dbConnection from "./config/db.js";

const PORT = Number(process.env.PORT) || 3000;

async function serverConnection() {
  try {
    await dbConnection();
    app.listen(PORT, () => {
      console.log(`Port is running at ${PORT}`);
    });
  } catch (error) {
    console.log("Server couldnt connect", error);
    throw error;
  }
}
serverConnection()
