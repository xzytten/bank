import mongoose from 'mongoose'
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    sender: {
        type: Number,
        require: true,
    },
    recipient: {
        type: Number,
        require: true,
    },
    sum: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    idSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    idRecipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

})

export default mongoose.model('Transaction', TransactionSchema);