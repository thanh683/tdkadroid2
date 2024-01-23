import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

// Component Giao diện đăng nhập
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập tại đây
    console.log('Email:', email);
    console.log('Password:', password);
    // Sau khi xử lý đăng nhập, bạn có thể chuyển hướng đến màn hình chính hoặc làm gì đó khác
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Input
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Mật khẩu"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button buttonStyle={{ backgroundColor: "#C0C0C0" }} title="Đăng Nhập" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay!</Text>
      </TouchableOpacity>
    </View>
  );
};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    linkText: {
      marginTop: 20,
      textAlign: 'center',
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });
export default LoginScreen;