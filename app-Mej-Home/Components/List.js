// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator, TouchableHighlight, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import { getListOfProducts } from '../API/MEJ-API'
import { postListOfProducts } from '../API/MEJ-API'

import Product from './Product'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            products: [],
            isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
            fontLoaded: false,
        }
    }

    componentDidMount() {
        console.log('component list mount:')
        // Charge la liste de course au démarrage de l'app
        this._loadList()

    }

    componentDidUpdate() {
        console.log("componentListDidUpdate : ")

    }

    _loadList() {
        this.state.isLoading = true
        getListOfProducts().then(data => {
            this.setState({
                products: data,
            })
        })
        this.state.isLoading = false
    }

    // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    _searchTextInputChanged(text) {
        this.searchedText = text
        // console.log(text)
    }

    // Ajoute un produit de la liste
    _addProduct() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            // Récupére le dernier id de list et lincremente de 1
            // TRES TRES MOCHE mais en attendant d'avoir une api...
            let lastIdOfList = this.state.products.length
            lastIdOfList++
            let newProduct = {
                id: lastIdOfList,
                name: this.searchedText,
                archive: false,
                quantity: 1
            }

            // console.log(test)
            // postListOfProducts(newProduct)
            postListOfProducts(newProduct).then(data => {
                console.log(data)
                if (data = true) {
                    this.state.products.push(newProduct)
                    // Bug a lajout dun nouveau produit dans le state, passer par un reducer!
                    // this.setState({ products: newProduct })
                    this._textInput.setNativeProps({ text: ' ' });
                    showMessage({
                        message: newProduct.name + " ajouté",
                        type: "success",
                        animationDuration: 1000
                    })
                } else {
                    showMessage({
                        message: newProduct.name + " n'a pu être ajouté, veuillez vérifier votre connexion internet ou rééssayer plus tard",
                        type: "danger",
                        animationDuration: 1000
                    })
                }
            })
            this.setState({ isLoading: false })

        }
    }


    // _displayDetailForItem = (idItem) => {
    //     console.log("Display item with id " + idItem)
    //     this.props.navigation.navigate('ItemDetail')
    // }

    render() {
        console.log(this.state)
        return (
            <View style={styles.main_container}>


                <LinearGradient
                    colors={['#9071E9', '#609DFA']}
                    style={styles.header}>
                    <Text
                        style={styles.header_title

                        }>
                        Ma Liste de Course ({this.state.products.length})
                    </Text>
                    {this.state.isLoading ?
                        <View style={styles.load_data}>
                            <ActivityIndicator size='small' color="white" />
                        </View>
                        :
                        <View>
                            <TouchableOpacity style={styles.load_data} onPress={() => this._loadList()}>
                                <View>
                                    <Ionicons name="ios-cloud-download" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.load_data} onPress={() => this._loadList()}>
                                <View>
                                    <Ionicons name="ios-cloud-upload" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                    }
                </LinearGradient>

                {/* TODO ajouter condition si il y a un produit */}
                <FlatList
                    style={styles.list}
                    data={this.state.products}
                    // Identifie l'item de maniére unique
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Product product={item} quantityOfItem={this.quantityOfItem} />}
                />



                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <TextInput
                        style={styles.textinput}
                        placeholder='Ajouter un produit'
                        ref={component => this._textInput = component}
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._addProduct()}
                    />
                    <Button buttonStyle={styles.addProduct} title='Ajouter un produit' onPress={() => this._addProduct()} />
                </ScrollView>
                {/* <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Ajouter un produit'
                        ref={component => this._textInput = component}
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._addProduct()}
                    />
                    <Button buttonStyle={styles.addProduct} title='Ajouter un produit' onPress={() => this._addProduct()} />
                </KeyboardAvoidingView> */}
                <FlashMessage position="top" />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        // display: 'flex',

        // alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        // marginTop: 20,
        backgroundColor: '#609DFA'
    },

    header: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
    },
    header_title: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff'
    },
    load_data: {
        paddingTop: 5
    },
    list: {
        flex: 1,
        backgroundColor: '#609DFA'
    },
    textinput: {
        height: 50,
        borderTopColor: '#61DAFB',
        borderTopWidth: 2,
        paddingLeft: 5,
        textAlign: 'center',
        backgroundColor: 'white'
    },
    addProduct: {
        backgroundColor: '#61DAFB',
        borderColor: 'black',
        borderTopWidth: 1
    },
    loading_container: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 100,
        // bottom: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    keyboard: {
        // display: 'flex',
        flex: 1,
    },
})

export default List
