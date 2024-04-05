import imageService from "../../services/images/delete";

const DeleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await imageService.DeleteImages(id);
    res.json({ EC: 0, success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image.' });
  }
}

module.exports = {
  DeleteImage
}
