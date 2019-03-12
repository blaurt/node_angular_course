import * as dotenv from "dotenv";
import { initConfig } from "./config/main";

dotenv.config();
initConfig();
import "./app";
console.log("env", process.env.DB_URL);
