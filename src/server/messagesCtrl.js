let allMessages = [];


module.exports = {
    getAllMessages: (req, res) => {
        res.status(200).send(allMessages);
    },
    createMessage: (req, res) => {
        const{username, message} = req.body;
        const newMessage = {
            username,
            message
        }
        allMessages.push(newMessage);
        //creates or adds to session with history log which we named history
        if (req.session.history){
            req.session.history.push(newMessage);
        } else {
            req.session.history = [];
            req.session.history.push(newMessage);
        }
        res.status(200).send(allMessages);
    },
    history: (req, res) => {
        res.status(200).send(req.session.history)
    }
}




