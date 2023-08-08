const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server.js')
const Products = require('../models/productModel.js')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

const expect = chai.expect
describe('Product operations /products', () => {

    var ProductId;
    // Create product
    it('should respond with 200 status and "Product Added" message', async () => {
      const newProduct = {
        id: 23,
        name: 'a new product',
        image: 'a new image',
        description: 'a new description',
        brand: 'a new brand',
        price: 34,
        category: "new category",
        countInStock: 3,
        rating: 3.5,
        numReviews: 45
      }
  
      const res = await chai.request(app)
        .post('/products')
        .send(newProduct)
  
      expect(res).to.have.status(200)
      expect(res.body.msg).to.equal('Product Added')
    
      // Check if the product is created in the database
      const createdProduct = await Products.findOne(newProduct)
      ProductId = createdProduct.id;
      expect(createdProduct).to.not.be.null
      expect(createdProduct.name).to.equal(newProduct.name)
      expect(createdProduct.price).to.equal(newProduct.price)
      expect(createdProduct.description).to.equal(newProduct.description)
      expect(createdProduct.brand).to.equal(newProduct.brand)
      expect(createdProduct.price).to.equal(newProduct.price)
      expect(createdProduct.countInStock).to.equal(newProduct.countInStock)
      expect(createdProduct.rating).to.equal(newProduct.rating)
      expect(createdProduct.numReviews).to.equal(newProduct.numReviews)
    })
    
    it('should return an error if any required fields are missing', async () => {
        const res = await chai.request(app)
        .post('/products')
        .send({
            price: 35,
            countInStock: 4,
            rating: 3.6
        })
        expect(res).to.have.status(500)
    })

    // Delete product

    it('should return status 200 and the deleted product', async () => {
        const res = await chai.request(app).delete(`/products/${ProductId}`).send();
    
        expect(res.status).to.equal(200);
    });

    it('should return status 500 and an error message if an error occurs during deletion', async () => {
        // force an error to occur by passing an invalid ID format
        const res = await chai.request(app).delete('/products/invalid-id').send();

        expect(res.status).to.equal(500);
    });

    // Get products
    it('Get all produts', async () => {
        const res = (await chai.request(app).get('/products'));
        expect(res.status).to.equal(200)
    })
})

