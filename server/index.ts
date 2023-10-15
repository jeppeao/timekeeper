import express, { response } from 'express'
import * as env from "./env";
import * as dbModel from "./db_model"
import * as bcrypt from "bcrypt"

import { Request, Response, NextFunction } from 'express';

const PORT = env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.post('/getUser', (req: Request, res: Response) => {

  const { email } = req.body;
  dbModel.getUser(email)
  .then(response => {
    console.log(response)
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
dbModel.getUser(body.email).then(res => {console.log(res)})
// hashtest();