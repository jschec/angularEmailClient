import accountRouter from "./api/routes/account-routes.js";
import contactRouter from "./api/routes/contact-routes.js";
import messageRouter from "./api/routes/message-routes.js";
import userRouter from "./api/routes/user-routes.js";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

const app = express();

//enable cross source reference
app.use(cors());
const __dirname = path.resolve();

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('', accountRouter);
app.use('', contactRouter);
app.use('', messageRouter);
app.use('', userRouter);

app.listen(3000, () => console.log('Server started...'));

