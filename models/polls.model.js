const mongoose = require('mongoose');

// Define the Poll schema
const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {

        type: String,
        required: true,
      
    },
  ],
});

// Create the Poll model
const Poll = mongoose.model('Poll', pollSchema);

module.exports = {Poll};
