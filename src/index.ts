import dotenv from "dotenv";
dotenv.config();
import express, { Response, Request } from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
const PORT = process.env.PORT || 3000;
import connectDatabase from "./database/database.js";
import roomRoute from "./routes/room.js";
import roomTypeRoute from "./routes/room-type.js";
import userRoute from "./routes/user.route.js";
import { validateUserPayload } from "./middlewares/validatePayload.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import asyncWrapper from "./utils/asyncWrapper.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`dirname: `, __dirname);

//add json to req.body
app.use(express.json());
//add form-data to req.body
app.use(express.urlencoded({ extended: false }));

//allow cross-origin resource sharing.
app.use(cors());

app.use(morgan("tiny"));

//middlewares
app.use("/api/v1/users", asyncWrapper(validateUserPayload), userRoute);
app.use(`/api/v1/room-types`, roomTypeRoute);
app.use(`/api/v1/rooms`, roomRoute);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDatabase(process.env.DATABASE_URL);

  app.listen(PORT, () => {
    console.log(
      `Server is listening on port: ${PORT}.Press Ctrl+C to terminate.`
    );
  });
}

startServer();
