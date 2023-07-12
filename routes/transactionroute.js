const express = require('express');
const { addTransaction, register, deleteData, dataById, updateData, getAlldata, login, refreshToken } = require('../controllers/transactioncontroller');
const router = express.Router();
const path = require("path");
const { verifytoken } = require('../middleware/verifytoken')

//config

router.route("/auth/refresh").get(refreshToken)
router.route("/getData/:id").get(verifytoken, getAlldata)
router.route("/dataSingle").get(verifytoken, dataById)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/addTransaction").post(verifytoken, addTransaction)
router.route("/deleteTransaction/:id").delete(verifytoken, deleteData)
router.route("/updateTransaction/:id").put(verifytoken, updateData)


module.exports = router
