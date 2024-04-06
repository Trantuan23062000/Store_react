import productServiecs from "../services/productServices";

const CreateProduct = async (req, res) => {
  try {
    let product = await productServiecs.createProduct(req.body);
    if (product) {
      return res.status(200).json({
        EM: product.EM,
        EC: product.EC,
        DT: product.product,
      });
    } else {
      res.status(200).json({
        EM: product.EM,
        EC: product.EC,
        DT: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: product.EM,
      EC: product.EC,
      DT: product.DT,
    });
  }
};

const getBrands = async (req, res) => {
  const brand = await productServiecs.getBrand();
  if (brand) {
    res.status(200).json({
      EM: brand.EM,
      EC: brand.EC,
      DT: brand.brand,
    });
  } else {
    res.status(500).json({
      EM: brand.EM,
      EC: brand.EC,
      DT: DT,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await productServiecs.deleteProduct(id);
    return res.status(200).json({
      EM: product.EM,
      EC: product.EC,
      DT: product.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const Search = async (req, res) => {
  try {
    const { name } = req.query;
    const product = await productServiecs.SearchProduct(name);
   // console.log(product);
      return res.status(200).json({
        EM: product.EM,
        EC: product.EC,
        DT: product.product
      })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM:product.EM,
      EC:product.EC,
      DT:[]
    })
  }
};

const getListProduct = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      //console.log(page,limit);
      let data = await productServiecs.getProductPagition(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT, //data
      });
    } else {
      let data = await productServiecs.getListProduct();
      res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "Server Error",
      EC: -1,
      DT: "",
    });
  }
};




const UpdateProduct = async (req, res) => {
  try {
    const data = await productServiecs.updateProduct(req.body);
    //console.log(data);
    if (data) {
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.product,
      });
    } else {
      res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "Server Error....",
      EC: -1,
    });
  }
};

module.exports = {
  CreateProduct,
  getListProduct,
  getBrands,
  UpdateProduct,
  deleteProduct,
  Search
};
