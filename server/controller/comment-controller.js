import Comment from "../model/comment.js"

export const newComment = async (req,res) => {
    try {
        let comment = await new Comment(req.body);

        comment.save();
        return res.status(200).json({msg: 'Comment saved successfully'});

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getAllComments = async (req,res)=>{
    try {
        
        const id = req.params.id;
        let comments = await Comment.find({postId:id});
        console.log(comments,id);
        return res.status(200).json(comments)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

Aniru