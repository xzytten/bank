import Card from "../models/Card.js";
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

            const newTransaction = new Transaction({
                sender,
                recipient,
                sum,
                date: Date.now(),
                idSender: senderCard._id,
                idRecipient: recipientCard._id
            })

            await newTransaction.save();

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
                transactionStatus: 'seccessful',
            })

        } else if (senderCard.cash <= sum) {
            res.json({
                transactionStatus: 'error',
                message: "You don't have enough money"
            })
        } else if (sender !== recipient) {
            res.json({
                transactionStatus: 'error',
                message: "Card not found"
            })
        } else {
            res.json({
                transactionStatus: 'error',
                message: "Transaction error"
            })
        }
    } catch (error) {
        res.json({
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