import db from "../models/index"
import ImageServiecs from "../services/imageServies"


const CreateImage = async (req,res) =>{
    try {
        const imageURL = await ImageServiecs.CreateImage(req.file)
        const image = await db.Images.create({URL:imageURL})
        return res.status(200).json(image)
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
    }
}

module.exports = {
    CreateImage
}