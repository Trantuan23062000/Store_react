import UpdateImageSer from "../../services/images/update";

const updateImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    // Check if ID or file is missing
    if (!id || !file) {
      return res.status(400).json({
        error: 'ID or file is missing',
      });
    }


    // Update image URL in the database and delete old image from Cloudinary
    const updatedImage = await UpdateImageSer.UpdateImage(id, file);

    // Respond with success message
    return res.status(200).json({
      success: 'Image updated successfully',
      EC:0,
      image: updatedImage,
    });
  } catch (error) {
    console.error('Error updating image:', error);
    return res.status(500).json({ error: 'Failed to update image' });
  }
};

module.exports = { updateImageById };
