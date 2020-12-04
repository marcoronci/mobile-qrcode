import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import FAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default  function AboutScreen(){

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

  const onClickListener = (viewId: string) => {
    Alert.alert("Alert",email);
  }

  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <FAwesomeIcon style={styles.inputIcon}  name="user" size={30}/>
          <TextInput style={styles.inputs}
              placeholder="Utente"
              // keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) =>setEmail(email)}/>
        </View>
        
        <View style={styles.inputContainer}>
        <FAwesomeIcon style={styles.inputIcon}  name="key" size={30}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword(password)}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

       
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:'80%',
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
    marginLeft:10,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:10,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
