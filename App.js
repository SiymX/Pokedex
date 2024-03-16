import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailsScreen from './screens/PokemonDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import { Provider } from 'react-redux';
import store from './store'; 


const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      {}
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        {}
        <Drawer.Screen 
            name="Home"
            component={HomeScreen}
            options={{ drawerLabel: 'Home' }}
        />

        <Drawer.Screen 
            name="Favorites"
            component={FavoritesScreen}
            options={{ drawerLabel: 'Favorites' }}
        />

        <Drawer.Screen 
          name="PokemonList" 
          component={PokemonListScreen}
          options={{ drawerLabel: 'Pokémon List' }} 
        />
        {}
        <Drawer.Screen 
          name="PokemonDetails" 
          component={PokemonDetailsScreen}
          options={{ drawerLabel: () => null, title: null, drawerIcon: () => null }} 
        />
        {}
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
