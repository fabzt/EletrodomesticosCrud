import React, { useState, useEffect } from 'react';
import { View, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { fetchProdutos, deleteProdutos } from './Api';
import { useFocusEffect } from '@react-navigation/native'

export default function Home({ navigation }) {
    const [registro, setRegistros] = useState([]);

    useEffect(() => {
        fetchProdutos(setRegistros);
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja deletar este item?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    onPress: () => deleteProdutos(id, setRegistros),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Produtos </Text>
            <FlatList
                data={registro}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.infoColumn}>
                                <Text style={styles.title}>Código: {item.id}</Text>
                                <Text>Produto: {item.produto}</Text>
                                <Text>Marca: {item.marca}</Text>
                                <Text>Valor: {item.valor}</Text>
                            </View>
                            <View style={styles.actionColumn}>
                                <IconButton
                                    icon="pencil"
                                    size={24}
                                    iconColor="#3498db"
                                    onPress={() => navigation.navigate('Alterar', { produtos: item })}
                                />
                                <IconButton
                                    icon="delete"
                                    size={24}
                                    iconColor="#e74c3c"
                                    onPress={() => handleDelete(item.id)}
                                />
                            </View>
                        </View>
                    </Card>
                )}
            />

            <TouchableOpacity
                style={styles.floatingButtom}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.plusIcon}> + </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        marginBottom: 5,
        elevation: 3,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    infoColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    actionColumn: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    floatingButtom: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: "#27ae60",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    plusIcon: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 36,
        marginBottom: 2,
    },
});
