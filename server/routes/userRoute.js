import express from "express";
import { create ,deleteUser, getAll, getOne , update} from "../controller/userController.js";

import { loginUser } from "../controller/userlogincontroller.js"

const route = express.Router();

route.post("/create", create);
route.get("/users", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id" , update);
route.delete("/delete/:id", deleteUser); // Delete user by ID
route.post("/login", loginUser);


export default route;
