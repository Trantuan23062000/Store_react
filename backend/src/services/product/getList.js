import db from "../../models/index"

const GetList = async () =>{
    const iamgeProduct = await db.ProductImage.findAll({
        include: [
            { model: db.Products, 
              attributes: ["id", "name", "description", "price", "quantity", "category"],
              include: { model: db.Brands, attributes: ["id", "name"] }
            },
            { model: db.Images, attributes: ["id", "URL"] }
        ]
    })
   const data = {iamgeProduct}
   return data
}

module.exports = {GetList}