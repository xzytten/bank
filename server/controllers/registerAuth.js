import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import { createUniqueCard } from "../utils/createCard.js";
import Card from "../models/Card.js";
import Transaction from "../models/Transaction.js";

export const registerAuth = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({
                message: 'This name was declared'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let fileName

        if (req.files) {
            fileName = Date.now().toString() + req.files.img.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            await req.files.img.mv(path.join(__dirname, '..', 'uploads', fileName));
        } else {
            fileName = 'user.jpg'
        }
        const newUser = new User({
            username,
            password: hash,
            img: fileName,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3',
            { expiresIn: '30d' }
        );

        await newUser.save();

        const uniqueCard = await createUniqueCard(newUser._id);

        await User.findByIdAndUpdate(newUser._id, { $push: { creditCard: uniqueCard._id } });

        res.json({
            newUser,
            token,
            message: 'seccesful'
        });

    } catch (error) {
        console.error('Something went wrong :(', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await User.findOne({ username });
            if (!user) {
                return res.json({ message: 'Your login or password is not correct' })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.json({ message: 'Your login or password is not correct' })
            }

            const token = jwt.sign({
                id: user._id,
            },
                'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3',
                { expiresIn: '30d' }
            );

            res.json({
                token,
                user,
                message: 'You are logged in'
            })
        }


    } catch (e) {
        res.json({ message: 'Error login :(' })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const card = await Card.findById(user.creditCard)
        const transactions = [];
        const transactionHistory = user.transactionHistory;
        const totalCountTransaction = user.transactionHistory.length;
        for (let i = (transactionHistory.length - 1); i >= 0; i--) {
            if (i > transactionHistory.length - 12 && i !== -1) {

                const trans = await Transaction.findById(transactionHistory[i].transaction);

                if (transactionHistory[i].typeTransaction === 'recipient') {
                    const secondCard = await Card.findById(trans.idSender).select('user')
                    const secondUser = await User.findById(secondCard.user).select('username img');
                    transactions.push({ trans, typeTransaction: transactionHistory[i].typeTransaction, users: { username: secondUser.username, img: secondUser.img } });
                } else {
                    const secondCard = await Card.findById(trans.idRecipient).select('user')
                    const secondUser = await User.findById(secondCard.user).select('username img');
                    transactions.push({ trans, typeTransaction: transactionHistory[i].typeTransaction, users: { username: secondUser.username, img: secondUser.img } });
                }

            }
        }

        if (!user) {
            return res.json('Error, user is not declared.')
        }

        const token = jwt.sign({
            id: user._id,
        },
            'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3',
            { expiresIn: '30d' }
        );

        res.json({
            user,
            card,
            totalCountTransaction,
            transactions,
            token,
            message: 'You dont have access',
        })
    } catch (e) {

    }
}


export const getMoreTransaction = async (req, res) => {
    try {
        let { totalCount } = req.body;
        const user = await User.findById(req.body.userId)

        const transactions = [];
        const transactionHistory = user.transactionHistory;
        const lengthTransaction = user.transactionHistory.length;
        const trans = lengthTransaction - totalCount;

        for (let i = (trans - 1); i >= 0; i--) {
            if (i > (trans - 12) && i !== -1) {

                const trans = await Transaction.findById(transactionHistory[i].transaction);

                if (transactionHistory[i].typeTransaction === 'recipient') {
                    const secondCard = await Card.findById(trans.idSender).select('user')
                    const secondUser = await User.findById(secondCard.user).select('username img');
                    transactions.push({ trans, typeTransaction: transactionHistory[i].typeTransaction, users: { username: secondUser.username, img: secondUser.img } });
                } else {
                    const secondCard = await Card.findById(trans.idRecipient).select('user')
                    const secondUser = await User.findById(secondCard.user).select('username img');
                    transactions.push({ trans, typeTransaction: transactionHistory[i].typeTransaction, users: { username: secondUser.username, img: secondUser.img } });
                }
            }
        }
        res.json({
            transactions,
        })
    } catch (error) {
        return { message: error };
    }
}