import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';


const index = () => {
    return (
        <View style={styles.Container}>
            <View style={styles.ContainerView}>
                <Entypo name="login" size={24} color="#32cd32" />
                <Text style={styles.ContainerText}><Link href={'./signup'}>Rider</Link></Text>
            </View>
            <View style={styles.ContainerView}>
                <FontAwesome name="car" size={24} color="#32cd32" />
                <Text style={styles.ContainerText}><Link href={'./home'}>Find Rides</Link></Text>
            </View>
        </View>
    )
}

export default index


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30,
        backgroundColor: '#000',
    },
    ContainerText: {
        fontSize: 25,
        color: '#32cd32',
    },
    ContainerView: {
        borderWidth: 2,
        padding: 10,
        width: 150,
        height: 120,
        borderRadius: 20,
        borderColor: '#32cd32',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#000',
    },
})
