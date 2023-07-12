const db = require('../models/index');
const { User, Transaction } = db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokengenerate = (type, data) => {
    let tokenJwt;
    if (type == "login") {

        tokenJwt = jwt.sign(data, process.env.SECERT_KEY, {
            expiresIn: 5,
        })
    }
    else {

        tokenJwt = jwt.sign(data, process.env.REF_TOKEN, {
            expiresIn: "24h",
        })
    }

    return tokenJwt
}
//register data
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const isExistsEmail = await User.findOne({
        where: {
            email: email
        }
    })
    if (isExistsEmail) {
        return res.json({ data: "", err: "Email already exists ! ", status: 402 })
    }
    const data = await User.create({
        name,
        email,
        password: hashPassword
    })

    return res.json({ data: data, Jwtoken: token });
};

//login 
const login = async (req, res) => {
    const { email, password } = req.body;

    const findEmail = await User.findOne({
        where: {
            email: email
        }
    });
    if (!findEmail)
        return res.json({ status: 404, err: "Invalid email" })
    const isValidatePassword = await bcrypt.compare(password, findEmail.password)

    if (!isValidatePassword)
        return res.json({ status: 402, err: "Invalid password" })

    const token = tokengenerate("login", { email })
    const refreshToken = tokengenerate("refersh", { email })


    // console.log("token", token, "refersh", refreshToken);
    res.cookie("token", refreshToken, {
        httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000
    })


    return res.json({ status: 200, err: "Successfully login", userId: findEmail.id, Jwtoken: token })
}

//refershtoken 
const refreshToken = async (req, res) => {
    const authHeader = req.cookies;
    const token = authHeader.token

    jwt.verify(token, process.env.REF_TOKEN,
        (err, decoded) => {
            if (err) {
                // Wrong Refesh Token
                console.log("err", err.message);
                return res.status(406).json({ message: 'Unauthorized' });
            }
            else {

                // Correct token we send a new access token
                const accessToken = jwt.sign({
                    email: decoded.email
                }, process.env.SECERT_KEY, {
                    expiresIn: '60m'
                });
                return res.json({ accessToken });
            }
        })
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
        const { userId, id } = req.query
        const data = await Transaction.findOne({
            attributes: ["id", "userId", "trdate", "monthyear", "type", "monthyear", "type", "fromaccount", "toaccount", "amount", "receipt", "notes"],
            where: {
                id: Number(id),
                userId: Number(userId)
            },
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
        // return error.message
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


module.exports = { refreshToken, updateData, register, addTransaction, dataById, getAlldata, deleteData, login }


