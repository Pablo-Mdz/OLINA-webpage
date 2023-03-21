const { Schema, model } = require("mongoose");

const dictionarySchema = new Schema(
    {
        word: {
            type: String,
            unique: true,
        },
        translation: String,
        description: String,
        author: {
            type: Schema.Types.ObjectId, 
            ref:  "User"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Word = model("Dictionary", dictionarySchema);

module.exports = Dictionary;