import db from "../../models";


const GetList = async () =>{
    const product = await db.Products.findAll({
        include: [
            { model: db.Images, attributes: ["id", "URL"] },
            { model: db.Brands, attributes: ["id", "name"] }
        ],
        order: [["id", "DESC"]],
        nest: true,
    })

    return product
}

module.exports = {
    GetList
}