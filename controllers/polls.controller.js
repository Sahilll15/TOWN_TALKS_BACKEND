const { Poll } = require('../models/polls.model'); 
const {AnswerPoll}=require('../models/answer.poll.models')

// Create a new poll
const createPoll= async (req, res) => {
  try {
    const { question, options } = req.body;
    const newPoll = new Poll({ question, options });
    const savedPoll = await newPoll.save();
    res.json(savedPoll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all polls
 const getAllPolls=async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific poll by ID
 const getPollById=async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const answerPolls=async (req, res) => {
    try {
      const {  userId, answer } = req.body;
      const {pollId} = req.params
      
      // Validate that the answer is one of the predefined options
     
      const newAnswerPoll = new AnswerPoll({ pollId, userId, answer });
      const savedAnswerPoll = await newAnswerPoll.save();
      res.json(savedAnswerPoll);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all answerPolls
//   router.get('/answerPolls', 
  const getAll=async (req, res) => {
    try {
      const answerPolls = await AnswerPoll.find()

      const poll=await Poll.findById(answerPolls.pollId)

      const formattedAnswerPolls = answerPolls.map((answerPoll) => {
        return {
          id: answerPoll._id,
          pollId: answerPoll.pollId,
          userId: answerPoll.userId,
          answer: answerPoll.answer,
          option: poll.options[answerPoll.answer - 1]
        };
      }
        );  
      res.json(formattedAnswerPolls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a specific answerPoll by ID
//   router.get('/answerPolls/:id', 
  const getanswerPollById=async (req, res) => {
    try {
      const answerPoll = await AnswerPoll.findById(req.params.id);

      if (!answerPoll) {
        return res.status(404).json({ message: 'AnswerPoll not found' });
      
    }
      res.json(answerPoll);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  const getAnswerbyPollId=async (req, res) => {
    const {pollId}=req.params
    try {
        const answerPoll = await AnswerPoll.find({
            pollId: pollId,
        });

        if(!answerPoll){
            return res.status(404).json({ message: 'AnswerPoll not found' });
        }
        console.log('as',answerPoll)
        const poll = await Poll.findById(pollId);
        let answers=[]
        const formattedAnswerPolls=answerPoll.map((answerPoll) => {
            answers.push({
                id: answerPoll._id,
                pollId: answerPoll.pollId,
                userId: answerPoll.userId,
                answer: answerPoll.answer,
                option: poll.options[answerPoll.answer - 1]
              });
        
        })
        
        res.json(answers);
        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
  }
  
  // Update a specific answerPoll by ID
//   router.put('/answerPolls/:id', async (req, res) => {
//     try {
//       const { pollId, userId, answer } = req.body;
      
//       // Validate that the answer is one of the predefined options
//       const validOptions = ['Option1', 'Option2', 'Option3'];
//       if (!validOptions.includes(answer)) {
//         return res.status(400).json({ error: 'Invalid answer option' });
//       }
  
//       const updatedAnswerPoll = await AnswerPoll.findByIdAndUpdate(
//         req.params.id,
//         { pollId, userId, answer },
//         { new: true }
//       );
//       if (!updatedAnswerPoll) {
//         return res.status(404).json({ message: 'AnswerPoll not found' });
//       }
//       res.json(updatedAnswerPoll);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
  
  // Delete a specific answerPoll by ID
//   router.delete('/answerPolls/:id', async (req, res) => {
//     try {
//       const deletedAnswerPoll = await AnswerPoll.findByIdAndDelete(req.params.id);
//       if (!deletedAnswerPoll) {
//         return res.status(404).json({ message: 'AnswerPoll not found' });
//       }
//       res.json({ message: 'AnswerPoll deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
  // Get predefined answer options
//   router.get('/answerOptions', 
  
  

module.exports = {createPoll,getAllPolls,getPollById,answerPolls,getAll,getanswerPollById,getAnswerbyPollId};
