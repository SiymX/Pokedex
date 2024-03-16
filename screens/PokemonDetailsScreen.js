
import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const PokemonDetailsScreen = ({ route }) => {
    const { pokemon } = route.params; 
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    const renderStat = (statName, value) => {
      const clampedValue = Math.max(0, Math.min(1, value / 100)); 
  
      return (
        <View key={statName} style={styles.statContainer}>
          <Text style={styles.statLabel}>{statName.toUpperCase()}</Text>
          <ProgressBar progress={clampedValue} width={null} style={styles.progressBar} color={getColorForStat(statName)} />
        </View>
      );
    };
  
    const getColorForStat = (statName) => {
      const statColors = {
        hp: 'red',
        attack: 'orange',
        defense: 'yellow',
        specialAttack: 'green',
        specialDefense: 'blue',
        speed: 'purple',
      };
      return statColors[statName] || 'grey';
    };

    //myown thing to make it look cool
    const getColorForType = (type) => {
        const typeColors = {
          grass: '#78C850',
          poison: '#A040A0',
          fire: '#F08030',
          water: '#6890F0',
          electric: '#F8D030',
          psychic: '#F85888',
          ice: '#98D8D8',
          dragon: '#7038F8',
          dark: '#705848',
          fairy: '#EE99AC',
          normal: '#A8A878',
          fighting: '#C03028',
          flying: '#A890F0',
          ground: '#E0C068',
          rock: '#B8A038',
          bug: '#A8B820',
          ghost: '#705898',
          steel: '#B8B8D0',
        };
      
        
        const color = typeColors[type.toLowerCase()];
        return color || '#A9A9A9'; 
      };


  
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.detail}>Height: {data.height}</Text>
        <Text style={styles.detail}>Weight: {data.weight}</Text>
        <View style={styles.typesContainer}>
      {data.types.map((typeObj) => {
        
        const typeName = typeObj.type.name;
        return (
          <Text key={typeName} style={[styles.type, { backgroundColor: getColorForType(typeName) }]}>
            {typeName.toUpperCase()} 
          </Text>
        );
      })}
    </View>
        <View style={styles.statsContainer}>
          {data.stats.map(statObj => renderStat(statObj.stat.name, statObj.base_stat))}
        </View>
      </ScrollView>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  detail: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  type: {
    padding: 5,
    margin: 2,
    color: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  statsContainer: {
    marginVertical: 20,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 16,
  },
  progressBar: {
    flex: 1, 
    marginLeft: 10, 
  },
});



  

export default PokemonDetailsScreen;




  /*const PokemonDetailsScreen = ({ route }) => {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => {
        setPokemonDetails({
          // Assuming the API returns height and weight in desired format
          height: data.height,
          weight: data.weight,
          stats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          // Include any other details you need
        });
      });
  }, [pokemon.url]);

}; */
