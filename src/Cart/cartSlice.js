import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_CART_ITEMS = "cartItems";

const getCartItems = async () => {
  try {
    const storedCartItems = await AsyncStorage.getItem(KEY_CART_ITEMS);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error("Error loading cart items:", error);
    return [];
  }
};

const saveCartItems = async (cartItems) => {
  try {
    await AsyncStorage.setItem(KEY_CART_ITEMS, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart items:", error);
  }
};

const addToCart = async (productId, quantity, price) => {
  console.log(productId);
  try {
    const cartItems = await getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === productId
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].count += quantity;
      await saveCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [
        ...cartItems,
        { id: productId, count: quantity, price },
      ];
      await saveCartItems(updatedCartItems);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const removeFromCart = async (productId) => {
  try {
    const cartItems = await getCartItems();
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    await saveCartItems(updatedCartItems);
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};

const increaseCount = async (productId) => {
  try {
    const cartItems = await getCartItems();
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, count: item.count + 1 } : item
    );
    await saveCartItems(updatedCartItems);
  } catch (error) {
    console.error("Error increasing count:", error);
  }
};

const decreaseCount = async (productId) => {
  try {
    const cartItems = await getCartItems();
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, count: Math.max(0, item.count - 1) }
        : item
    );
    const filteredCartItems = updatedCartItems.filter((item) => item.count > 0);
    await saveCartItems(filteredCartItems);
  } catch (error) {
    console.error("Error decreasing count:", error);
  }
};

export {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  getCartItems,
};
