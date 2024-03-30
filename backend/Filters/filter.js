class Features {
  constructor(query, setquery) {
    this.query = query;
    this.setquery = setquery;
  }

  search() {
    const keyword = this.setquery.keyword
      ? {
          $or: [
            {
              Name: {
                $regex: this.setquery.keyword,
                $options: "i",
              },
            },
            {
              Category: {
                $regex: this.setquery.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this.query;
  }
  filterByCategory(){
    const { category } = this.setquery;

    const brandRegex = new RegExp(category, "i");
    this.query = this.query.filter((product) =>
      product.Category.match(brandRegex)
    );

    return this.query;
  }
  filterByPriceRange() {
    const { minprice, maxprice } = this.setquery;
    if (minprice && maxprice) {
      this.query = this.query.filter(
        (product) => product.Price >= minprice && product.Price <= maxprice
      );
    } else if (minprice) {
      this.query = this.query.filter((product) => product.Rating >= minprice);
    } else {
      this.query = this.query.filter((product) => product.Rating <= maxprice);
    }
    return this.query;
  }
  filterByRating() {
    const { rating } = this.setquery;
    this.query = this.query.filter((product) => product.Rating >= rating);
    return this.query;
  }

  filterByBrand() {
    const { brand } = this.setquery;

    const brandRegex = new RegExp(brand, "i");
    this.query = this.query.filter((product) =>
      product.Brand.match(brandRegex)
    );

    return this.query;
  }

  filterByColor() {
    const { color } = this.setquery;
    const colorRegex = new RegExp(color, "i");
    this.query = this.query.filter((product) =>
      product.Color && product.Color.match(colorRegex)
    );

    return this.query;
  }

  filterBySize() {
    const { size } = this.setquery;
    const sizeregex = new RegExp(size, "i");
    this.query = this.query.filter((product) => product.Size && product.Size.match(sizeregex));
    return this.query;
  }

  filterByPage() {
    let { page, limit } = this.setquery;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    this.query = this.query.slice(startIndex, endIndex);
    return this.query;
  }
}

module.exports = Features;
