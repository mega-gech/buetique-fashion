import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, create one
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ productId, quantity }]
      });
    } else {
      // Check if product already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate("items.productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};