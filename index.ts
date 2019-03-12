import * as dotenv from "dotenv";
import { initConfig } from "./src/config/main";

dotenv.config();
initConfig();
import "./src/app";
console.log("env", process.env.DB_URL);
