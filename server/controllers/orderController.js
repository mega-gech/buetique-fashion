import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Subscriber from "../models/Subscriber.js"; 
import Cart from "../models/Cart.js";


export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Get cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let totalPrice = 0;

    // 2. Validate each product from DB
    for (let item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      // 3. Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      // 4. Calculate secure price
      totalPrice += product.price * item.quantity;
    }

    // 5. Create order (secure data)
    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalPrice
    });

    // 6. Reduce stock
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // 7. Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.productId");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const checkout = async (req, res) => {
  try {
    const { items, shipping, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const totalAmount = items.reduce((sum, item) => {
      const cleanPrice = typeof item.price === 'string'
        ? item.price.replace(/[^0-9.]/g, '')
        : item.price;
      return sum + (Number(cleanPrice) || 0) * item.qty;
    }, 0);

    const orderData = {
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
    };

    if (userId) {
      orderData.user = userId;
    }

    const order = await Order.create(orderData);

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