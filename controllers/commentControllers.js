const Itinerary = require("../models/Itinerary")


const commentsControllers = {

    addComment: async (req, res) => {
        const { itinerary, comment } = req.body
        const user = req.user._id
        try {
            const updatedItinerary = await Itinerary.findOneAndUpdate({ _id: itinerary }, { $push: { comments: { comment, user } } }, { new: true }).populate("comments.user", { firstName: 1, lastName: 1, picture: 1 })
            res.json({ success: true, response: updatedItinerary.comments, message: "Thank you for leaving a comment!" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong. Try again in a few minutes" })
        }
    },

    modifyComment: async (req, res) => {
        const { commentID, comment } = req.body
        const user = req.user._id
        try {
            const updatedItinerary = await Itinerary.findOneAndUpdate({ "comments._id": commentID }, { $set: { "comments.$.comment": comment } }, { new: true }).populate("comments.user", { firstName: 1, lastName: 1, picture: 1 })
            res.json({ success: true, response: updatedItinerary.comments, message: "You comment has been edited" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Something went wrong. Try again in a few minutes" })
        }
    },


    deleteComment: async (req, res) => {
        const id = req.params.id     /////È L'ID DELL'ITINERARIO 
        const user = req.user._id
        try { /////
            const updatedItinerary = await Itinerary.findOneAndUpdate({ "comments._id": id }, { $pull: { comments: { _id: id } } }, { new: true }).populate("comments.user", { firstName: 1, lastName: 1, picture: 1 })
            res.json({ success: true, response: updatedItinerary.comments, message: "You removed the comment" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong. Try again in a few minutes" })
        }

    },

}
module.exports = commentsControllers