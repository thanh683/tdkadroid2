// Cart.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

const Favorite = () => {
  return (
    <View>
      <Header title="SHOPPE" />
      <Text style={{ marginTop: 150 }}>Favorite</Text>
      <Icon name="person" size={30} color="#000" />
    </View>
  );
};

export default Favorite;
