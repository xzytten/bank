import { io, userSockets } from "../index.js";

import Card from "../models/Card.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";


export const transactionCard = async (req, res) => {
    try {
        const { sender, recipient, sum } = req.body;
        const senderCard = await Card.findOne({ number: sender })
        const recipientCard = await Card.findOne({ number: recipient })
<<<<<<< HEAD
        const recipientUser = await User.findById(recipientCard.user).select("username img")
        const senderUser = await User.findById(senderCard.user).select("username img")

        const senderUserId = senderCard.user.toString();
        const recipientUserId = recipientCard.user.toString();

        if (senderCard && recipientCard && sender !== recipient && senderCard.cash >= sum) {
            await Card.updateOne({ number: recipient }, { $inc: { cash: sum, 'cashHistory.income': sum } });
            
            await Card.updateOne({ number: sender }, { $inc: { cash: -sum, 'cashHistory.extence': sum } });
=======
        
        if (senderCard && recipientCard && sender !== recipient && senderCard.cash >= sum) {

            const recipientUser = await User.findById(recipientCard.user).select("username img")
            
            await Card.updateOne({ number: recipient }, { $inc: { cash: sum }, $inc: { 'cashHistory.income': sum } });

            await Card.updateOne({ number: sender }, { $inc: { cash: -sum }, $inc: { 'cashHistory.extence': sum } });

            const mainCard = await Card.findOne({ number: sender });
>>>>>>> origin/main

            const newTransaction = new Transaction({
                sender,
                recipient,
                sum,
                date: Date.now(),
                idSender: senderCard._id,
                idRecipient: recipientCard._id
            })

            await newTransaction.save();

            const mainCard = await Card.findOne({ number: sender });
            const newRecipientCard = await Card.findOne({ number: recipient })

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

            const recipientSocketSocketId = userSockets.get(recipientUserId.toString());
            
            if (recipientSocketSocketId) {
                io.to(recipientSocketSocketId).emit('balanceUpdate', {
                    sender,
                    newTransaction: {
                        trans: newTransaction,
                        cash: newRecipientCard.cash,
                        typeTransaction: 'recipient',
                        users: {
                            username: senderUser.username,
                            img: senderUser.img
                        },
                    },
                    cashHistory: newRecipientCard.cashHistory,
                    transactionStatus: 'successful',
                });
            }

            const senderSocketSocketId = userSockets.get(senderUserId.toString());

            if (senderSocketSocketId) {
                io.to(senderSocketSocketId).emit('balanceUpdate', {
                    sender,
                    newTransaction: {
                        trans: newTransaction,
                        cash: mainCard.cash,
                        typeTransaction: 'send',
                        recipientUser: {
                            username: recipientUser.username,
                            img: recipientUser.img
                        },
                    },
                    cashHistory: mainCard.cashHistory,
                    transactionStatus: 'successful',
                });
            }
            res.json({
                cashHistory: mainCard.cashHistory,
                transactionStatus: 'seccessful',
            })

        } else if (!recipientCard) {
            console.log('ok')
            res.json({
                transactionStatus: 'error',
                message: "Card not found"
            })
        } else if (senderCard.cash <= sum) {
            res.json({
                transactionStatus: 'error',
                message: "You don't have enough money"
            })
<<<<<<< HEAD
        } else if (sender !== recipient) {
            res.json({
                transactionStatus: 'error',
                message: "Card not found"
            })
        } else if (!recipientCard) {
            res.json({
                transactionStatus: 'error',
                message: "Card not found"
            });
=======
>>>>>>> origin/main
        } else {
            res.json({
                transactionStatus: 'error',
                message: "Transaction error",
            })
        }
    } catch (error) {
        res.json({
            transactionStatus: 'error',
            message: 'Transaction error',
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const { cardId } = req.body

        const card = await Card.findById(cardId)
        const user = await User.findById(card.user)

        res.json({
            card: card.number,
            user: {
                _id: user._id,
                username: user.username,
                img: user.img,
            },
        })
    } catch (error) {
        return { message: error };
    }
}

