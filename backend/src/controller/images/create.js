import ImageCreate from "../../services/images/create"


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
        files.map((file) => ImageCreate.CreateImage(file))
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

  module.exports = {
    CreateImage
  }