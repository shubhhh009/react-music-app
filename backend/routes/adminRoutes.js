import express from "express"
import { register , login, uploadMusic, getMusic, deleteMusic} from "../controllers/adminContrller.js"
import upload from "../middleware/multer.js"

const adminRuoter = express.Router()

adminRuoter.post('/register',register)
adminRuoter.post('/login',login)
adminRuoter.post('/add-music',upload.fields([{name:'music',maxCount:1},{name:'image',maxCount:1}]),uploadMusic)
adminRuoter.get('/get-music', getMusic)
adminRuoter.delete('/delete-music/:id',deleteMusic)

export default adminRuoter