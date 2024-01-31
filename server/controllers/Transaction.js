import Card from "../models/Card.js";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { io } from "../index.js";

export const transactionCard = async (req, res) => {
    try {
        const { sender, recipient, sum } = req.body;

        const senderCard = await Card.findOne({ number: sender })
        const recipientCard = await Card.findOne({ number: recipient })

        if (senderCard && recipientCard && sender !== recipient && senderCard.cash >= sum) {

            await Card.updateOne({ number: recipient }, { $inc: { cash: sum } });

            await Card.updateOne({ number: sender }, { $inc: { cash: -sum } });

            const mainCard = await Card.findOne({ number: sender });

            // console.log(recipientCard._id)
            const newTransaction = new Transaction({
                sender,
                recipient,
                sum,
                date: Date.now(),
                idSender: senderCard._id,
                idRecipient: recipientCard._id
            })

            await newTransaction.save();

            // console.log(newTransaction._id)
            await User.findByIdAndUpdate(senderCard.user, {
                $push: {
                    'transactionHistory': {
                        transaction: newTransaction._id,
                        typeTransaction: 'send'
                    }
                }
            });

            await User.findByIdAndUpdate(recipientCard.user, {
                $push: {
                    'transactionHistory': {
                        transaction: newTransaction._id,
                        typeTransaction: 'recipient'
                    }
                }
            });

            io.emit('addNewTransaction', {
                cash: mainCard.cash,
                transaction: newTransaction._id,
                typeTransaction: 'send'
            })

            res.json({
                cash: mainCard.cash,
                newTransaction: {
                    trans: newTransaction,
                    typeTransaction: 'send'
                },
                message: 'Transaction was seccessful',
            })
            // next()
        } else {
            res.json({
                message: 'Transaction error',
            })
        }

    } catch (error) {
        res.json({
            message: 'Transaction error',
        })
    }


}