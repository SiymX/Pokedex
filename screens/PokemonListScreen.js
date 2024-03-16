import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput, Button, StyleSheet } from 'react-native';
import { POKEMON } from '../pokemon_data';
import { useDispatch } from 'react-redux'; 

const PokemonListScreen = ({ navigation }) => {
  const dispatch = useDispatch(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTypes, setFilteredTypes] = useState([]);

  const addItemToFavorites = (item) => {
    dispatch({ type: 'ADD_FAVORITE', payload: item }); 
  };

  const renderFilterButtons = () => {
    return (
      <View style={styles.filterContainer}>
        {filteredTypes.map((type, index) => (
          <Button key={index} title={type} onPress={() => handleFilter(type)} />
        ))}
      </View>
    );
  };

  const handleFilter = (type) => {
    if (filteredTypes.includes(type)) {
      setFilteredTypes(filteredTypes.filter((t) => t !== type));
    } else {
      setFilteredTypes([...filteredTypes, type]);
    }
  };

  const filteredPokemon = POKEMON.filter((pokemon) => {
    if (filteredTypes.length === 0) {
      return true;
    } else {
      return filteredTypes.includes(pokemon.type);
    }
  });

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => addItemToFavorites(item)}
      >
        <Text style={styles.favoritesButtonText}>Favorite</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder="Search Pokemon..."
      />
      <Button title="Clear" onPress={() => setSearchQuery('')} />
      {renderFilterButtons()}
      <FlatList
        data={filteredPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
  },
  favoritesButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  favoritesButtonText: {
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default PokemonListScreen;
