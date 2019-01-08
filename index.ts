import * as dotenv from "dotenv";
import { initConfig } from "./src/config/main";

dotenv.config();
initConfig();
import "./src/app";

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("index route");
// });
