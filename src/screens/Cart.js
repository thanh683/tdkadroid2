import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getCartItems, removeFromCart, increaseCount, decreaseCount } from "../Cart/cartSlice";
import Item from "./Cart/Item";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  // Function to update the cart items after an action
  const updateCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Error updating cart items:", error);
    }
  };

  // Function to handle increase count action
  const handleIncreaseCount = async (productId) => {
    await increaseCount(productId);
    await updateCartItems();
  };

  // Function to handle decrease count action
  const handleDecreaseCount = async (productId) => {
    await decreaseCount(productId);
    await updateCartItems();
  };

  // Function to handle remove from cart action
  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    await updateCartItems();
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Chưa thêm sản phẩm</Text>
      ) : (
        <>
        <ScrollView>
          {cartItems.map((item, index) => (
            <Item
              key={index}
              item={item}
              onIncreaseCount={() => handleIncreaseCount(item.id)}
              onDecreaseCount={() => handleDecreaseCount(item.id)}
              onRemoveFromCart={() => handleRemoveFromCart(item.id)}
            />
          ))}
          </ScrollView>          
        </>  
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    padding: 10,
    backgroundColor:'#E8E8E8'
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  totalContainer: {
    borderTopWidth: 3,
    borderColor: "#ddd",
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
