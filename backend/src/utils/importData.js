
import dotenv from 'dotenv'
import fs from 'fs'
import Document from "../model/documentModel"
import connectDB from "../config/db"
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
connectDB();

const Documents = JSON.parse(fs.readFileSync(`${__dirname}/documents.json`, "utf-8"));

const importData = async () => {
  try {
    await Document.create(Documents);
    console.log("Data Successfully imported ");
    process.exit();
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Document.deleteMany({});
    console.log("Data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
