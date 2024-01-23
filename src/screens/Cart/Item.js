import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { decreaseCount, increaseCount, removeFromCart } from "../../Cart/cartSlice";

export default function Item({
  item,
  onIncreaseCount,
  onDecreaseCount,
  onRemoveFromCart,
}) {
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${item.id}`);
        const result = await response.json();
        setProductDetail(result);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [item.id]);

  const renderImage = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C0C0C0" />
        </View>
      );
    }

    return (
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: productDetail?.images[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        {renderImage()}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{productDetail?.title || "Loading..."}</Text>
          <Text style={{ fontSize: 17 }}>
            ${item.price} x {item.count} = ${item.price * item.count}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={onIncreaseCount}>
              <Icon name="add" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDecreaseCount}>
              <Icon name="remove" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onRemoveFromCart}>
              <Icon name="delete" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    marginRight: 10,
  },
  imageWrapper: {
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  loadingContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
