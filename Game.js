import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, StatusBar, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Game = props => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  /*useEffect(() => {
    fetch('https://liiga.fi/api/v1/games') // Api 
      .then(response => response.json()) // Objektin muuntaminen JSON-muotoon
      .then(json => {
        const modifiedData = json
        .filter(game => game.id === 1) // Rajoittaa näytetyn pelin
        .map(game => ({
          ...game,
          start: game.start.split('T')[0] // Poistaa ajankohdasta muut kuin pvm
        }))
      setGames(modifiedData);
    })
    .catch(error => console.error(error))
  }, []);*/
  useEffect(() => {
    fetch(`https://liiga.fi/api/v1/games/1`)
      .then(response => response.json())
      .then(json => {
        const modifiedData = {
          ...json,
          start: json.start.split('T')[0]
        };
        setGame(modifiedData);
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
              <View style={styles.scoreContainer}>
                
                  <Text style={styles.date}>{item.start}</Text>
                  <Text style={styles.teamName}>{item.homeTeam.teamName}</Text>
                  <Text style={styles.score}>{item.homeTeam.goals}</Text>
                  <Text style={styles.scoreDivider}>-</Text>
                  <Text style={styles.score}>{item.awayTeam.goals}</Text>
                  <Text style={styles.teamName}>{item.awayTeam.teamName}</Text>
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
};

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
  video: {
    top: 0,
    flex: 1,
    width: 100,
    height: 100
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
    marginTop: 48,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  score: {
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  scoreDivider: {
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
    color: 'gray'
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
});


export default Game;