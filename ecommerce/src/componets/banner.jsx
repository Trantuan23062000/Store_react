import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/post-landscape-1.jpg",
    "/images/post-landscape-2.jpg",
    "/images/post-landscape-3.jpg",
    "/images/post-landscape-4.jpg",
  ];
  const [content, setContent] = useState({
    title: "Best collection for home decoration",
    buttonText: "Shop Now",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Thay đổi hình ảnh mỗi 3 giây

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Cập nhật nội dung tương ứng với hình ảnh hiện tại
    switch (currentImageIndex) {
      case 0:
        setContent({
          title: "Best collection for home decoration",
          buttonText: "Shop Now",
        });
        break;
      case 1:
        setContent({
          title: "Discover new trends in home decor",
          buttonText: "Explore Now",
        });
        break;
      case 2:
        setContent({
          title: "Transform your space with our latest designs",
          buttonText: "Get Inspired",
        });
        break;
      case 3:
        setContent({
          title: "Create your dream home with our products",
          buttonText: "Start Shopping",
        });
        break;
      default:
        setContent({
          title: "Best collection for home decoration",
          buttonText: "Shop Now",
        });
    }
    // eslint-disable-next-line
  }, [currentImageIndex]);

  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-6 md:py-36 relative block md:bg-cover md:bg-no-repeat md:bg-center transition-all duration-1000" // Thêm lớp transition-all và duration-1000 để áp dụng hiệu ứng chuyển cảnh
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`, // Sử dụng ảnh hiện tại từ mảng images
      }}
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-black font-medium mb-4 capitalize">
            {content.title}
          </h1>
          <div className="inline-block">
            <div className="inline-block">
              <button className="bg-black border border-primary text-white px-6 py-3 font-medium rounded-md transition duration-300 ease-in-out hover:bg-transparent hover:text-yellow-300">
                {content.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
