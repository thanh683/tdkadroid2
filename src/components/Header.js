import React from 'react';
import { Header as HeaderRNE, Input, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <HeaderRNE
      backgroundColor="#C0C0C0"
      containerStyle={{
        position: 'absolute',
        top: 0,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        alignItems: 'center', // Căn giữa dọc
        justifyContent: 'center', // Căn giữa ngang
      }}
    >
      <Input
        placeholder='Search'
        leftIcon={
          <Icon
            name='search'
            size={24}
            color='black'
          />
        }
        inputStyle={{ color: 'black' }}
        containerStyle={{
          paddingHorizontal: 10,
          marginHorizontal: 0,
          width: 330,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'white',
          height: 50,
          backgroundColor: 'white', // Màu nền trắng
        }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <Icon
        name='shopping-cart'
        size={29}
        color='black'
        containerStyle={{
          width: 40,
          marginTop: 5,
          marginLeft: 360,
          borderRadius: 50,
          backgroundColor: 'white',
          padding: 5,
          marginRight: 15, // Thêm khoảng cách từ Icon đến mép phải của Header
        }}
      />
      </TouchableOpacity>


    </HeaderRNE>
  );
};

export default Header;
