import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
        default: ''
    },
    creditCard: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    transactionHistory:
        [{
            transaction: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Transaction'
            },
            typeTransaction: {
                type: String,
                require: true,
            },
        }],
})

export default mongoose.model('User', UserSchema);