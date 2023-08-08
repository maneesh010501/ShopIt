const order = require('../models/orderModel');

// Get all orders
async function getOrders(req, res) {
  try {
    const orders = await order.find();
    res.status(200).json(orders);
    console.log(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Create a new order
async function postOrder(req, res) {
  const { orders, user_id, isPaid, isDelivered, id } = req.body;

  const newOrder = new order({
    orders,
    user_id,
    isPaid,
    isDelivered,
    id
  });

  try {
    const savedOrder = await newOrder.save();
    console.log(savedOrder);
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

//update Order
const updateOrder = async (req,res)=>{
  const orderId = req.params.id
  console.log(orderId);
  try {
    const orderU = await order.findById(orderId);

    if (!orderU) {
      console.log('Order not found');
      return;
    }

    orderU.isDelivered = true;
    await orderU.save();
    res.status(200).json({message : "Order updated successfully"})
    //console.log('Order updated successfully:', orderU);
  } catch (error) {
    res.status(404).json({message : "Order not found"})
    console.error('Server error:', error);
  }

}

module.exports = { getOrders, postOrder,updateOrder};




