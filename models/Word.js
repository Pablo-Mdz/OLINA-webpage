const { Schema, model } = require('mongoose');

const DictionarySchema = new Schema(
  {
    word: {
      type: String,
      required: [true, 'word is required.'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'translation is required.'],
    },
    translation: {
      type: String,
    },
    author: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Word = model('Word', DictionarySchema);

module.exports = Word;
