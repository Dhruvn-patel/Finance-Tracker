const express = require('express');
const multer = require('multer')
const { addTransaction, register, deleteData, dataById, updateData, getAlldata, login } = require('../controllers/transactioncontroller');
const router = express.Router();
const path = require("path");

//config


router.route("/getData/:id").get(getAlldata)
router.route("/TransactionById/:id").get(dataById)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/addTransaction").post(addTransaction)
router.route("/deleteTransaction/:id").delete(deleteData)
router.route("/updateTransaction/:id").put(updateData)


module.exports = router
