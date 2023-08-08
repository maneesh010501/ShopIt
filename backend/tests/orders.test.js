const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server.js')
const Products = require('../models/orderModel.js')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

const expect = chai.expect
describe('Order operations /orders', () => {
    var orderId ;
    it('Get all orders', async () => {
        const res = await chai.request(app).get('/orders');
        expect(res.status).to.equal(200)
        orderId=res.body[0]._id;
        console.log("id here: ", orderId);
    })

    it('should create a new order', async () => {
        const newOrder = {
          orders: {
            orderItems: [
              {
                id: 1,
                name: 'Product 1',
                image: 'a new image',
                description: 'Product 1 description',
                brand: 'Brand 1',
                category: 'Category 1',
                price: 9.99,
                countInStock: 10,
                rating: 4.5,
                numReviews: 10,
                qty: 1
              }
            ],
            shippingAddress: {
              address: '123 Main St',
              city: 'City',
              postalCode: '12345',
              country: 'Country'
            },
            paymentMethod: 'Paypal',
            totalPrice: 9.99
          },
          user_id: 'user123',
          isPaid: false,
          isDelivered: false
        };
    
        chai.request(app)
          .post('/orders')
          .send(newOrder)
          .end(function (err, res) {
            // orderId=res.body._id;
            // console.log("id here: ", orderId);
            expect(res.status).to.equal(200);
            expect(res.body.orders.orderItems[0].name).to.equal('Product 1');
            expect(res.body.user_id).to.equal('user123');
            expect(res.body.isPaid).to.equal(false);
            expect(res.body.isDelivered).to.equal(false);
        });
      });
    
    it('should return an error if required fields are missing',async () => {
    const newOrder = {
        user_id: 'user123',
        isPaid: false,
        isDelivered: false,
    };

    chai.request(app)
        .post('/orders')
        .send(newOrder)
        .end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Server error');
        });
    });


    it('should update an order successfully', function(done) {
        console.log("here: ", orderId);
    chai.request(app)
        .put(`/orders/${orderId}`) // Replace with an existing order ID
        .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Order updated successfully');
        done();
        });
    });
  
    it('should return an error if the order does not exist', function(done) {
    chai.request(app)
    .put('/orders/invalid-id')
    .end(function(err, res) {
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Order not found');
    done();
        });
    });
})

