import React from 'react';
import { View } from 'react-native';
import Menu from './src/components/Menu';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Nội dung hiện tại của bạn */}
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Menu />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
    
  );
}
