import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import * as localDB from '../Config/LocalDB';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);

      let userInfo = JSON.parse(await localDB.loadUser());
      console.log('userInfo : ', userInfo);

      navigation.replace(
        userInfo === null ? 'Auth' : 'TabNavigationRoutes'
      )

      // JSON.parse(await localDB.loadUser()).then((value) => {
      //   console.log('value : ', value);

      //   navigation.replace(
      //     value === "" ? 'Auth' : 'TabNavigationRoutes'
      //   )
      // });
      
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/logo_todo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});