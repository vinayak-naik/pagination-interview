import express from "express";
const router = express.Router();
import  {getAllDocuments}  from "../controller/documentControllers";

router.route("/").get(getAllDocuments);

export default router;
