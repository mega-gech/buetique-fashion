import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Subscriber from "../models/Subscriber.js"; 



export const checkout = async (req, res) => {
  try {
    const { items, shipping } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const totalAmount = items.reduce(
      (sum, item) =>
        sum + Number(item.price) * item.qty,
      0
    );

    const order = await Order.create({
  customer: {
    email: shipping.email,
    firstName: shipping.firstName,
    lastName: shipping.lastName,
    phone: shipping.phone,
  },

  shippingAddress: {
    address: shipping.address,
    city: shipping.city || "Addis Ababa",
  },

  items: items.map(item => ({
    productId: item.productId,
    name: item.name,
    image: item.image,
    size: item.size,
    qty: item.qty,
    price: item.price,
  })),

  totalAmount,
});

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    

    const products = await Product.find(
      category && category !== 'All' ? { category } : {}
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving products' });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ message: 'Server error retrieving product' });
  }
};

export const subscribers = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email || !email.includes("@")) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // check existing subscriber
    const existingSubscriber =
      await Subscriber.findOne({
        email: email.toLowerCase(),
      });

    if (existingSubscriber) {
      return res.status(409).json({
        message: "This email is already subscribed",
      });
    }

    // save to MongoDB
    await Subscriber.create({
      email,
    });

    res.status(201).json({
      success: true,
      message:
        "Successfully subscribed! Welcome to Mega.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Server error processing subscription",
    });
  }
};