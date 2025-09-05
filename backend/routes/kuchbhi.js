import express from "express";
import { getApi, dataCollection, searchUser,deleteUser,updateUser} from "../controller/contoller.js";

const router = express.Router();

router.get("/get", getApi);
router.post("/post", dataCollection);
router.get("/:id",searchUser);
router.delete("/:id",deleteUser);
router.put("/update",updateUser);

export default router;
