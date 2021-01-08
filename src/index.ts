import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express, { Request, Response } from "express";
import { Post } from "./entity/Post";
import { validate } from "class-validator";

const app = express();
app.use(express.json());

//create
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = User.create({ name, email });
    const errors = await validate(user);
    if (errors.length !== 0) {
      return res.status(400).json({ msg: errors });
    }
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//read
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({ relations: ["posts"] });
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//update
app.put("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid });
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//delete
app.delete("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    await user.remove();
    return res.json({ user: "deleted succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//find
app.get("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

//create a post
app.post("/post", async (req: Request, res: Response) => {
  const { userUuid, title, body } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid: userUuid });
    const post = new Post({ title, body, user });
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//read a post

createConnection()
  .then(async () => {
    app.listen(5000, () => {
      console.log(`server is up at port 5000`);
    });

    // const user = new User();

    // user.name = "Xavier";
    // user.email = "sanlorenzoxavier@gmail.com";

    // await user.save();
    // console.log("user created");
  })
  .catch((error) => console.log(error));
