import React, { useEffect, useState } from 'react';
import {
  View, 
  Text, 
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,} from 'react-native';
import { theme } from '../../Config/Colors';
import * as localDB from '../../Config/LocalDB';

const SettingsScreen = ({navigation}) => {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(async () => {

    const fetchAndSetUser = async () => {
      try {
          let userInfo = JSON.parse(await localDB.loadUser());
          
          if (userInfo) {
            setUserName(userInfo.username);
            setUserEmail(userInfo.email);
          }
      } catch (error) {
      // saving error
      }
    }
    fetchAndSetUser();
    
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16, backgroundColor: theme.bg}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            marginTop: 30,
          }}>
          UserName : {userName}
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            marginTop: 30,
          }}>
          UserEmail : {userEmail}
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress = {async () => {
            await localDB.logOutUser(null).then(() =>
              /**
               * 중첩된 네이게이터에서 이동
               */
              // navigation.navigate('Auth', {screen: 'LoginScreen'})
              navigation.replace('Auth', {screen: 'LoginScreen'})
            );
          }}>
          <Text style={styles.buttonTextStyle}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});