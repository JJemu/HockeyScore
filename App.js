import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// End of imports

const Stack = createStackNavigator();

function Game({ route }) { // Start of game
  
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(route.params.gameId);
  const navigation = useNavigation();


  const handlePress = () => {
    navigation.navigate('Main')
  }


  useEffect(() => {
    fetch('https://liiga.fi/api/v1/games') // Api 
      .then(response => response.json()) // Objektin muuntaminen JSON-muotoon
      .then(json => {
        const modifiedData = json
        .filter(game => game.id === selectedGameId) // Rajoittaa näytetyn pelin
        .map(game => ({
          ...game,
          start: game.start.split('T')[0] // Poistaa ajankohdasta muut kuin pvm
        }))
      setGames(modifiedData);
    })
    .catch(error => console.error(error))
  }, [selectedGameId]);
  return (
    
    <LinearGradient colors={['#829dc7', '#a6b1c3', '#b8d2fc']} style={styles.linearGradient}>
    <View style={styles.container}>
    
      <StatusBar
       animated
       barStyle="light-content"
       backgroundColor="rgba(130,157,199,1)"
      />

      <View style={styles.imageStack}>
        <Image
          source={require("./arrow.png")}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text
          resizeMode="contain"
          style={styles.iconText}
          onPress={handlePress}>Back</Text>

        <Image
          source={require("./Logo.png")}
          resizeMode="contain"
          style={styles.image}>
        </Image>

        <View style={styles.scrollArea}>

        <FlatList
        showsVerticalScrollIndicator={false}
        data={games}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
              <View style={styles.scoreContainerGame}>

            <Text style={styles.dateGame}>{item.start}</Text>
            <Text style={styles.teamNameGame}>{item.homeTeam.teamName}</Text>
            <Text style={styles.scoreGame}>{item.homeTeam.goals}</Text>
            <Text style={styles.scoreDividerGame}>-</Text>
            <Text style={styles.scoreGame}>{item.awayTeam.goals}</Text>
            <Text style={styles.teamNameGame}>{item.awayTeam.teamName}</Text>
            <Text style={styles.spectator}>Spectators: {item.spectators}</Text>
            <Text style={styles.runkosarja}>{"\n"}{item.serie}</Text>

          </View>
              
         )}
         />
         
        </View>
      </View>
    </View>
    </LinearGradient>
  );
}; // End of Game

function Main({ navigation }) { // Start of Main

  
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handlePress = (gameId) => {
    setSelectedGameId(gameId);
    navigation.navigate('Game', {gameId: gameId})
  }

  useEffect(() => {
    fetch('https://liiga.fi/api/v1/games') // Api 
      .then(response => response.json()) // Objektin muuntaminen JSON-muotoon
      .then(json => {
        const now = new Date().toISOString().split('T')[0]; // Ottaa ajan
        const modifiedData = json
        .filter(game => game.start.split('T')[0] <= now) // Poistaa tulevaisuuden pelit
        .map(game => ({
          ...game,
          start: game.start.split('T')[0] // Poistaa ajankohdasta muut kuin pvm
        }))
        .sort((b, a) => a.start.localeCompare(b.start)); // lajittelee ajankohdan perusteella
      setGames(modifiedData);
    })
    .catch(error => console.error(error))
  }, []);

  return (

    
    <LinearGradient colors={['#829dc7', '#a6b1c3', '#b8d2fc']} style={styles.linearGradient}>

        <View style={styles.container}>
          <StatusBar
            animated
            barStyle="light-content"
            backgroundColor="rgba(130,157,199,1)" />

          <View style={styles.imageStack}>

            <Image
              source={require("./Logo.png")}
              resizeMode="contain"
              style={styles.image}>
            </Image>

            <View style={styles.scrollArea}>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={games}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.scoreContainer}
                    onPress={() => handlePress(item.id)}>
                    <Text style={styles.date}>{item.start}</Text>
                    <Text style={styles.teamName}>{item.homeTeam.teamName}</Text>
                    <Text style={styles.score}>{item.homeTeam.goals}</Text>
                    <Text style={styles.scoreDivider}>-</Text>
                    <Text style={styles.score}>{item.awayTeam.goals}</Text>
                    <Text style={styles.teamName}>{item.awayTeam.teamName}</Text>
                  </TouchableOpacity>
                )} />

            </View>
          </View>
        </View>
      </LinearGradient>
  );
} // End of main
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="Game" component={Game} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    top: 0,
    width: 200,
    height: 200,
    position: "absolute"
  },
  icon: {
    top: -30,
    left: -55,
    width: 60,
    height: 60,
    position: "absolute"
  },
  iconText: {
    top: -30,
    left: -55,
    width: 60,
    height: 60,
    fontSize: 0,
    fontWeight: 'bold',
    position: "absolute"
  },
  scrollArea: {
    top: 195,
    width: 350,
    height: 550,
    borderRadius: 8,
    alignItems: 'center'
  },
  scrollArea_contentContainerStyle: {
    flexDirection: "row"
  },
  scoreContainer: {
    width: 296,
    height: 67,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: 36/3,
    borderTopLeftRadius: 36/3,
    borderLeftWidth: 3,
    borderLeftColor: "rgba(42,73,150,1)",
    borderRadius: 10,
    elevation: 5,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStack: {
    width: 283,
    height: 648,
    marginTop: 22,
    alignItems: 'center'
  },
  date: {
    position: 'absolute',
    top: 0,
  },
  teamName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  scoreDivider: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray'
  },
  scoreContainerGame: {
    width: 346,
    height: 120,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: 36/3,
    borderTopLeftRadius: 36/3,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spectator: {
    flex: 1,
    marginTop: 78,
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center'
  },
  runkosarja: {
    flex: 1,
    marginTop: 2,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center'
  },
  teamNameGame: {
    flex: 1,
    marginTop: 48,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scoreGame: {
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  scoreDividerGame: {
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
    color: 'gray'
  },
  dateGame: {
    position: 'absolute',
    top: 0,
  },
});


export default App;