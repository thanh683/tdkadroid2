import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToCart } from '../Cart/cartSlice';
import { useDispatch } from 'react-redux';

const Detail = ({ route }) => {
  const { productId } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then(response => response.json())
      .then(result => setProductDetail(result))
      .catch(error => console.error('Error fetching product detail:', error));
  }, [productId]);

  
  const renderHeader = () => (
    <View style={styles.header}>
      <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-cart" size={28} />
      </TouchableOpacity>
    </View>
  );

  const renderImageContainer = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: productDetail?.images[0] }}
        style={{
          flex: 1,
          aspectRatio: 16 / 9,
          borderRadius: 8,
          resizeMode: "contain",
        }}
      />
    </View>
  );

  const renderDetailsContainer = () => (
    <View style={styles.detailsContainer}>      
      <View style={styles.priceTag}>
        {productDetail?.priceSale ? (
          <>
            <Text style={{ color: "#C0C0C0", fontWeight: "bold", fontSize: 20 }}>
              ${productDetail.priceSale}
            </Text>
            <Text
              style={{
                color: "#C0C0C0",
                fontWeight: "bold",
                fontSize: 20,
                textDecorationLine: "line-through",
              }}
            >
              ${productDetail.price}
            </Text>
          </>
        ) : (
          <Text style={{ color: "#C0C0C0", fontWeight: "bold", fontSize: 20 }}>
            ${productDetail?.price}
          </Text>
        )}
      </View>
      <Text style={{ marginLeft: 10, fontSize: 22, fontWeight: "bold", width: "100%" }}>
        {productDetail?.title}
      </Text>        
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
        <Text
          style={{
            color: "grey",
            fontSize: 16,
            lineHeight: 22,
            marginTop: 10,
          }}
        >
          {productDetail?.description}
        </Text>
        <TouchableOpacity onPress={() => addToCart(productDetail?.id, 1, productDetail?.price)}>
        <View style={styles.buyBtn}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>ADD TO CART</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );



  return (
    <View style={styles.container}>
    {renderHeader()}
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View>
          {renderImageContainer()}
          {renderDetailsContainer()}
        </View>
      </SafeAreaView>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(237, 237, 237, 0.8)",
    position: "absolute",
    width: "100%",
    zIndex: 2, // Try increasing the zIndex
  },
  imageContainer: {
    flex: 1,
    marginTop: 50,    
  },
  detailsContainer: {
    flex: 0.55,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  priceTag: {
    width: 80,
    height: 40,
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 10,
  },
  buyBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 20,
  },
});

export default Detail;
