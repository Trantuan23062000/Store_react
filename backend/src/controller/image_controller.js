import imageServies from "../services/imageServies";


const CreateImage = async (req, res) => {
  try {
    const files = req.files;
    //Kiểm tra có file nào tồn tại không !
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "No images were uploaded.",
        EC: 1,
      });
    }

    // Kiểm tra trùng lặp ảnh
    const urls = req.files.map((file) => file.path); // Lấy đường dẫn của các ảnh đã tải lên
    const duplicatedUrls = await findDuplicatedImages(urls); // Tìm các ảnh trùng lặp

    if (duplicatedUrls.length > 0) {
      return res.status(400).json({
        error: "Duplicate images detected.",
        EC: 1,
        duplicatedUrls,
      });
    }
    const images = await Promise.all(
      files.map((file) => imageServies.CreateImage(file))
    );
    if(images){
      return res.status(200).json({
        success: " Image create !",
        EC: 0,
        images,
      });
    }else{
      return res.status(201).json({
        error: " Image create Error !",
        EC: 0,
        images:[]
      });
    }
    
  } catch (error) {
    console.error("Error uploading images:", error);
    return res.status(500).json({ error: "Failed to upload images" });
  }
};

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

    // Upload new image to Cloudinary
    const newImageUrl = await imageServies.UploadImageToCloudinary(file.path);

    // Update image URL in the database
    const updatedImage = await imageServies.UpdateImage(id, newImageUrl);

    // Respond with success message
    return res.status(200).json({
      success: 'Image updated successfully',
      image: updatedImage,
    });
  } catch (error) {
    console.error('Error updating image:', error);
    return res.status(500).json({ error: 'Failed to update image' });
  }
};

const listImages = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const images = await imageServies.getImages(+page, +pageSize);
    return res.status(200).json({
      success: "Get image success !",
      images,
      EC: 0,
      DT: images.totalImages,
    });
  } catch (error) {
    console.error("Error listing images:", error);
    return res.status(500).json({ error: "Failed to list images" });
  }
};

async function findDuplicatedImages(urls) {
  const duplicatedUrls = [];
  const seen = new Set();

  for (const url of urls) {
    if (seen.has(url)) {
      duplicatedUrls.push(url);
    } else {
      seen.add(url);
    }
  }

  return duplicatedUrls;
}


module.exports = {
  CreateImage,listImages,updateImageById
};