const Features = require("../../Filters/filter");
const Product = require("../../modelschema/productSchema");

exports.createproduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};

exports.getallproduct = async (req, res) => {
  try {
    const {
      page,
      keyword,
      category,
      minprice,
      maxprice,
      color,
      rating,
      brand,
      size,
    } = req.query;
    const limit = 8;
    console.log(page);
    console.log(keyword);
    let productfilter = new Features(Product.find(), { keyword });

    let product = await productfilter.search();

    if (category) {
      let categoryfilter = new Features(product, { category });
      product = await categoryfilter.filterByCategory();
    }

    if (minprice || maxprice) {
      let pricefilter = new Features(product, { minprice, maxprice });
      product = await pricefilter.filterByPriceRange();
    }

    if (rating) {
      let ratingfilter = new Features(product, { rating });
      product = await ratingfilter.filterByRating();
    }

    if (brand) {
      let brandfilter = new Features(product, { brand });
      product = await brandfilter.filterByBrand();
    }

    if (color) {
      let colorfilter = new Features(product, { color });
      product = await colorfilter.filterByColor();
    }
    if (size) {
      let sizefilter = new Features(product, { size });
      product = await sizefilter.filterBySize();
    }

    const totalProducts = product.length;
    const totalpages = Math.ceil(totalProducts / limit);

    if (page) {
      let pagefilter = new Features(product, { page, limit });
      product = await pagefilter.filterByPage();
    }

    res.status(200).json({
      success: true,
      product,
      totalpages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

exports.getproductbyid = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({
        success: true,
        product: product,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching product by ID",
    });
  }
};

exports.updateproduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};

exports.deleteitem = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "The product is not available",
      });
    }

    await product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};
