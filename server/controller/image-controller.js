import mongoose from "mongoose"
import grid from 'gridfs-stream'


const url = process.env.PORT || 'http://localhost:8000'

let gfs, gridFsBucket;
const conn = mongoose.connection;

conn.once('open' , () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });

    gfs=grid(conn.db, mongoose.mongo);
    gfs.collection('fs')
})

export const uploadImage = (req,res) => {
    if(!req.file){
        return res.status(404).json({msg: 'File not found'})
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    
    return res.status(200).json({imageUrl});
}

export const getImage = async (req,res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
     return res.status(500).json({msg: error.message})   
    }
}