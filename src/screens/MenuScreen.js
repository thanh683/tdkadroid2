// ProfileScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const MenuScreen = () => {
  return (
    <View>
      <Header title="SHOPPE" />
      <Text style={{ marginTop: 150 }}>MenuScreen</Text>
      {/* <Icon path={mdiHomeVariantOutline} size={1} /> */}
    </View>
  );
};

export default MenuScreen;
