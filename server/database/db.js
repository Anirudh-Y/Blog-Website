import mongoose from "mongoose"

export const Connection = async (USERNAME, PASSWORD) => {

    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.9kce9uw.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useNewUrlParser : true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with database', error);
    }
}