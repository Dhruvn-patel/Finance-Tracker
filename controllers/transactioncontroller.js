const db = require('../models/index');
const { User, Transaction } = db;

//register data
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await User.create({
        name,
        email,
        password
    })
    return res.json({ data });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const findEmail = await User.findOne({
        where: {
            email: email
        }
    });
    if (!findEmail)
        return res.json({ status: 404, err: "Invalid email" })
    if (findEmail.password !== password)
        return res.json({ status: 402, err: "Invalid password" })
    return res.json({ status: 200, err: "Successfully login", userId: findEmail.id })
}


/* add data */
const addTransaction = async (req, res) => {
    try {
        const { userId, trdate, monthyear, type, fromaccount, toaccount, amount, notes, receipt } = req.body;

        const data = await Transaction.create({
            trdate: trdate,
            userId: userId,
            monthyear: monthyear,
            type: type,
            fromaccount: fromaccount,
            toaccount: toaccount,
            amount: amount,
            receipt: receipt,
            notes: notes
        })
        return res.status(201).json({ data })


    } catch (error) {
        console.log(error.message);
        return error.message
    }


}

//all data 
const getAlldata = async (req, res) => {


    try {
        const { id } = req.params
        const allData = await Transaction.findAll({
            where: {
                userId: Number(id)
            },
            attributes: ["trdate", "monthyear", "type", "fromaccount", "toaccount", "notes", "receipt", "amount", "id"]
        })
        return res.status(200).json({ allData })
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}


//userId wise getdata
const dataById = async (req, res) => {
    try {
        const Id = Number(req.params.id);
        const data = await User.findOne({
            attributes: ["id", "name", "email"],
            include: [{
                model: Transaction
            }],
            where: {
                id: Id
            },
        })

        return res.status(200).json({ data })

    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

const updateData = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { amount, trdate, monthyear, fromaccount, toaccount, notes, type, receipt } = req.body;

        const data = await Transaction.update({
            trdate: trdate,
            monthyear: monthyear,
            type: type,
            fromaccount: fromaccount,
            toaccount: toaccount,
            amount: amount,
            receipt: receipt,
            notes: notes
        },
            {
                where: {
                    id: userId
                }
            })
        return res.status(200).send("updateData Successfully !")
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

const deleteData = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const data = await Transaction.destroy({
            where: { id: userId }
        })
        return res.status(200).send("delete  Successfully !")
    } catch (error) {
        console.log(error.message);
        return error
    }
}


module.exports = { updateData, register, addTransaction, dataById, getAlldata, deleteData, login }


