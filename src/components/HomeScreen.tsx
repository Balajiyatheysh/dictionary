import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Pressable, Modal, Text, Alert, FlatList } from "react-native"
import Axios from 'axios'
import { Data } from '../interface'

const HomeScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [fModal, setfModal] = React.useState(false);
    const [randomWord, setRandomWord] = useState("");
    const [element, setElement] = useState(false);
    const [data, setData] = useState<Data[]>([]);
    const [definition, setDefinition] = useState("");

    useEffect(() => {
        fetchapicall();
    }, [])

    const fetchapicall = async () => {
        const response = await Axios(`https://random-words-api.vercel.app/word`)
        setRandomWord((response.data[0].word))
        setDefinition((response.data[0].definition))
    }

    const handleWord = async () => {
        try{
            const response = await Axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
            setData((response.data))
            setElement(true)
        } catch(e){
            console.warn('no results found')
        }
        
    }
    return (
        <View>
            <View style={styles.fullView}>
                <View style={{ width: '85%', backgroundColor: 'white', alignItems: "center", margin: '10%', padding: 5, flexDirection: 'column', justifyContent: 'space-around', borderColor: 'black', borderWidth: 1 }}>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Keyword.."
                            onChangeText={newText => setRandomWord(newText)}
                            onChange={() => setElement(true)}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={handleWord}
                        >
                            <Text style={styles.textStyle}>Search</Text>
                        </Pressable>
                    </View>
                    {!element ?
                        <Pressable
                            onPress={() => {
                                setfModal(true)
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Word of the day:</Text>
                            <Text>{randomWord}{'\n'}</Text>
                            <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Definition:</Text>
                            <Text>{definition}</Text>
                        </Pressable>
                        :
                        <FlatList
                            style={{ flex: 1 }}
                            data={data}
                            renderItem={({ item }) =>
                            (
                                <Pressable style={{ backgroundColor: '#d6d6d0', margin: 5 }} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={{ fontWeight: 'bold' }}>WORD :</Text>
                                    <Text>{item.word}</Text>
                                    <View>
                                        {item.meanings.map(meaning => {
                                            return (
                                                <View>
                                                    <Text>{meaning.partOfSpeech}</Text>
                                                    <View>
                                                        {meaning.definitions.map(definitio => {
                                                            return (
                                                                <View>
                                                                    <Text style={{ fontWeight: 'bold' }}>Definition :</Text>{'\n'}
                                                                    <Text>{definitio.definition ? definitio.definition : "no results"}</Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </Pressable>
                            )}
                        />
                    }
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={fModal}
                        onRequestClose={() => {
                            setfModal(false);
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', margin: 2, backgroundColor: '#eddaea', borderWidth: 1, borderRadius: 30 }}>

                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <Text style={{ fontWeight: 'bold' }}>WORD</Text>
                                <Text>{randomWord}</Text>
                                <Text style={{ fontWeight: 'bold' }}>DEFINITION</Text>
                                <Text>{definition}</Text>
                            </View>

                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => { setfModal(false) }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>

                        </View>

                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                        style={{ alignContent: 'center', justifyContent: 'center', width: '70%', height: '70%' }}
                    >
                        <FlatList
                            style={{ flex: 1 }}
                            data={data}
                            renderItem={({ item }) =>
                            (
                                <Pressable style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', margin: 2, backgroundColor: '#eddaea', borderWidth: 1, borderRadius: 30 }} onPress={() => setModalVisible(!modalVisible)} >
                                    <Text style={{ fontWeight: 'bold' }}>WORD :</Text>
                                    <Text>{item.word}</Text>
                                    <View>
                                        {item.meanings.map(meaning => {
                                            return (
                                                <View>
                                                    <Text>{meaning.partOfSpeech}</Text>
                                                    <View>
                                                        {meaning.definitions.map(definitio => {
                                                            return (
                                                                <View>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.word}</Text>
                                                                    <Text style={{ fontWeight: 'bold' }}>Definition :</Text>{'\n'}
                                                                    <Text>{definitio.definition ? definitio.definition : "no results"}</Text>
                                                                    <Text style={{ fontWeight: 'bold' }}>Example :</Text>
                                                                    <Text>{definitio.example ? definitio.example : 'no results'}</Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </Pressable>
                            )}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => { !modalVisible }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </Modal>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create
    (
        {
            textStyle: {
                color: "white",
                fontWeight: "bold",
                textAlign: 'center'
            },
            input: {
                paddingLeft: 5,
                width: '70%',
            },
            fullView: {
                flex: 1,
                flexDirection: "column",
                width: '100%',
            },
            centeredView: {
                flex: 1,
                justifyContent: "center",
                marginTop: '20%',
                margin: 10,
            },
            modalView: {
                backgroundColor: "white",
                borderRadius: 15,
                padding: 5,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.75,
                shadowRadius: 4,
                elevation: 5
            },
            modalText: {
                marginBottom: 5,
            },
            button: {
                borderRadius: 15,
                padding: 8,
                elevation: 1,
                margin: 5
            },
            buttonClose: {
                backgroundColor: "#2196F3",
            },
            buttonOpen: {
                backgroundColor: "#3a46e8",
            }
        });

export default HomeScreen;