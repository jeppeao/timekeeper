import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as env from "./env";
import * as dbModel from "./db_model";
import * as bcrypt from "bcrypt";
import sessions from "express-session";
import cookieParser from "cookie-parser";

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const PORT = env.SERVER_PORT;

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user || req.url === "/login") {
    next();
  }
  else { 
    return res.status(401).send("Log in to access this resource")
  }
}

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay, sameSite: "none" },
  resave: false
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(validateUser);

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userData = await dbModel.getUser(email);
    // const passwordCheck = await bcrypt.compare(password, userData.password);
    const passwordCheck = password === userData.password;
    console.log(passwordCheck)
    if (!passwordCheck) {
      return res.status(401).send("Email or password not correct")
    }
    req.session.user = email;
    return res.status(200).send(email);
  }
  catch (error) {
    return res.status(500).send(error);
  };
})


app.post('/getUser', (req: Request, res: Response) => {
  const { email } = req.body;
  dbModel.getUser(email)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

dbModel.setupTables();

const plaintxt = "password";
const saltRounds = 4;

// const hashtest = async function() {
//   const hash = await bcrypt.hash(plaintxt, saltRounds);
//   const comp = await bcrypt.compare(plaintxt, hash);
//   console.log("comparison to original password: " + comp);
//   const comp2 = await bcrypt.compare("plaintxt", hash);
//   console.log("comparison to different password: " + comp2);
// }

const body = {email: "test@test.com", password: "pswd"}
// dbModel.createUser(body).then(result => { console.log(result)}).then(()=> {
//   dbModel.getPassword(body.email).then((result: any)=> { console.log(result.password)})
//   .then(() => {dbModel.setPassword({email: 'test@test.com', newPwd: 'ddddd'})});
// });
// dbModel.getUser(body.email).then(res => {console.log(res)})
// hashtest();