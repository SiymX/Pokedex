
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
      <Image source={require('../assets/Wallpaper.jpg')} style={styles.wallpaper} />
      <Image source={require('../assets/PokemonLogo.png')} style={styles.logo} />

      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  wallpaper: {
   
    width: '100%',
    height: 100,
  },
  logo: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default CustomDrawerContent;
