import db from "../../models/index"

const getProduct = async () =>{
    const product = await db.Products.findAll({
        include:{model:db.Images}
    }
    )
    if(product){
        console.log("Sucess");
    }else{
        console.log("Error");
    }

    return product
}

module.exports = {
    getProduct
}