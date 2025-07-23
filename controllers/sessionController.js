import Session from "../models/Session.js";
import Question from "../models/Question.js";

export const createSession = async (req, res) => {
    try{
        const {role, experience, topicToFocus, description, questions} = req.body;

        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                })
                return question._id;
            })
        )

        session.questions = questionDocs;
        session.save();

        res.status(200).json({success: true, session})
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const getMySessions = async(req, res) => {
     try{
        const sessions = await Session.find({ user: req.user.id }).sort({ createdAt: -1 }).populate("questions");

        res.status(200).json(sessions);
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const getSessionById = async (req, res) => {
     try{
        const  id  = req.params.id;

        const session = await Session.findById(id).populate({
            path: "questions",
            options: { sort : {isPinned: -1, createdAt: 1}}
        })
        .exec();

        if(!session){
            return res.status(404).json({ message: 'Session not found'});
        }

        res.status(200).json({success: true, session});
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const deleteSession = async (req, res) => {
    try{
        const id = req.params.id;
        const session = await Session.findById(id);

        if(!session){
            return res.status(404).json({message: 'Session not found'});
        }

        //delete all questions
        await Question.deleteMany({ session: session._id}); 

        //then delete the session too
        await session.deleteOne();

        res.status(200).json({message: 'Session deleted successfully'})
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}