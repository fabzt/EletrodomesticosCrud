import React, { useEffect } from 'react';
import { View, ActivityIndicaator, Image, StyleSheet } from 'react';
import { ImageBackground } from 'react-native/types_generated/index';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        //Defina a duração do splash (4 segundos)
        const timer = setTimeout(() => {
            navigation.replace('Home'); //Após o tempo, navega para a tela de Home
        }, 4000);

        return () => clearTimeout(timer); // Limpa o timer quando o componente for desmontado
    }, [navigation]);

    return (
        <View style={StyleSheet.splashContainer}>
            <image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0CAyJ1EPOwoI6n6qDDd8BOM835WrqbjCcQ&s' }} style={StyleSheet.splashImage} />
            <ActivityIndicaator size="large" color="#0000ff" style={styles.loader} />
        </View>    
    );
};
const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
    },
    splashImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default SplashScreen;