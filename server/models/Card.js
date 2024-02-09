import mongoose from 'mongoose'
const { Schema } = mongoose;

const CardSchema = new Schema({
    number: {
        type: String,
        require: true,
        unique: true
    },
    cvv: {
        type: Number,
        require: true
    },
    expirationDate: {
        type: Date,
        require: true
    },
    creationDate: {
        type: Date,
        require: true
    },
    cash: {
        type: Number,
        require: true,
        default: 200
    },
    cashHistory: {
        income: {
            type: Number,
        },
        extence: {
            type: Number,
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Card', CardSchema);