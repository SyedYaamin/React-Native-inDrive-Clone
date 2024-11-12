import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

interface SinglePlace {
  latitude: number;
  longitude: number;
}

interface AllPlaces {
  fsq_id: string;
  name: string;
  geocodes: { main: { latitude: number; longitude: number } };
}

export default function App() {
  const [location, setLocation] = useState<null | any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState<AllPlaces[]>([]);
  const [singlesearchPlace, setsinglesearchPlace] = useState<null | SinglePlace>(null);
  const [region, setRegion] = useState<any>(null);
  const [direction, setDirection] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const searchPlaces = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I=',
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=10000`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res.results || []);
        setShowPlaces(true);
      })
      .catch((err) => console.error(err));
  };

  const singlePlace = (item: AllPlaces) => {
    setsinglesearchPlace({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
    });
    setRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    setDirection(false);
    setShowPlaces(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={setRegion}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        )}

        {singlesearchPlace && (
          <Marker
            coordinate={{
              latitude: singlesearchPlace.latitude,
              longitude: singlesearchPlace.longitude,
            }}
          />
        )}

        {singlesearchPlace && direction && (
          <Polyline
            coordinates={[
              { latitude: location.coords.latitude, longitude: location.coords.longitude },
              {
                latitude: singlesearchPlace.latitude,
                longitude: singlesearchPlace.longitude,
              },
            ]}
            strokeWidth={5}
            strokeColor="#000000"
          />
        )}
      </MapView>

      <View style={styles.topOverlay}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search location"
        />
        <TouchableOpacity onPress={searchPlaces} style={styles.button}>
          <Text>Search Location</Text>
        </TouchableOpacity>

        {showPlaces && (
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => singlePlace(item)} style={styles.list}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.fsq_id}
          />
        )}

        {singlesearchPlace && (
          <TouchableOpacity
            onPress={() => setDirection(!direction)}
            style={styles.button}
          >
            <Text>Show Direction</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  list: {
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
});
