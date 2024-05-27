const { products } = require("./constants/data");
const Product = require("./model/product-schema");

const DefaultData = async () => {
    try {
        await Product.insertMany(products);
        console.log(`Data Imported Successfully in database.`);
    } catch (error) {
        console.log(`Error while inserting default data : ${error}`);
    }
}

module.exports = DefaultData;
