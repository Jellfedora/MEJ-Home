// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator, TouchableHighlight, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import { getListOfProducts } from '../API/MEJ-API'
import { postListOfProducts } from '../API/MEJ-API'

import { Updates } from 'expo';



import Product from './Product'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            products: [],
            isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
            showTextInput: false,
            showTextUpdate: false
        }
    }

    async componentDidMount() {
        console.log('component list mount:')

        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                this.setState({
                    showTextUpdate: true,
                })
                Updates.reloadFromCache();
            }
        } catch (e) {
            // handle or log error
        }

        // Charge la liste de course au démarrage de l'app
        this._loadList()
    }
    componentDidUpdate() {
        // console.log("componentListDidUpdate : ")

    }

    // Mise à jour de l'app
    _updateApp() {
        Updates.reload()
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
    }

    // Affiche le textinput pour ajouter un produit
    _showTextInput() {

        if (this.state.showTextInput == false) {
            this.setState({ showTextInput: true })
        } else {
            this.setState({ showTextInput: false })
        }
    }

    // Ajoute un produit de la liste
    _addProduct() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            // Récupére le dernier id de list et lincremente de 1
            // TRES TRES MOCHE 
            let lastIdOfList = this.state.products.length
            lastIdOfList++
            let newProduct = {
                id: lastIdOfList,
                name: this.searchedText,
                archive: false,
                quantity: 1
            }
            postListOfProducts(newProduct).then(data => {
                if (data = true) {
                    // this.state.products.push(newProduct)
                    this.state.products.splice(0, 0, newProduct)
                    // Bug a lajout dun nouveau produit dans le state, passer par un reducer!
                    // this.setState({ products: newProduct })
                    this._textInput.setNativeProps({ text: ' ' })
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
        setTimeout(() => this.hideTextInput(), 700)
    }
    hideTextInput() {
        this.setState({ showTextInput: false })
    }

    // _displayDetailForItem = (idItem) => {
    //     console.log("Display item with id " + idItem)
    //     this.props.navigation.navigate('ItemDetail')
    // }

    render() {
        return (
            <View style={styles.main_container}>
                <LinearGradient
                    colors={['#9071E9', '#fff']}
                    style={styles.header}>
                    <TouchableOpacity style={styles.load_data} onPress={() => this._loadList()}>
                        <View>
                            <Ionicons name="ios-cloud-download" size={35} color="white" />
                        </View>
                    </TouchableOpacity>

                    {/* Bouton pour ajouter un produit */}
                    {this.state.showTextInput == false &&

                        <View>
                            <TouchableOpacity onPress={() => this._showTextInput()}>
                                <View>
                                    <Ionicons name="ios-add-circle" size={35} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    }
                    {this.state.showTextInput == true &&
                        <TouchableOpacity onPress={() => this._showTextInput()}>
                            <View>
                                <Ionicons name="ios-close-circle" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    }
                    {this.state.showTextUpdate &&
                        <TouchableOpacity onPress={() => this._updateApp()}>
                            <View>
                                <Ionicons name="ios-thunderstorm" size={35} color="green" />
                            </View>
                        </TouchableOpacity>
                    }
                </LinearGradient>

                {this.state.showTextInput &&
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <TextInput
                            style={styles.textinput}
                            placeholder='Ajouter un produit'
                            placeholderTextColor="#9071E9"
                            autoFocus={true}
                            ref={component => this._textInput = component}
                            onChangeText={(text) => this._searchTextInputChanged(text)}
                            onSubmitEditing={() => this._addProduct()}
                        />
                    </KeyboardAvoidingView>
                }


                {/* TODO ajouter condition si il y a un produit */}
                <FlatList
                    style={styles.list}
                    data={this.state.products}
                    // Identifie l'item de maniére unique
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Product product={item} quantityOfItem={this.quantityOfItem} />}
                />
                <FlashMessage position="top" />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 0
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        borderRadius: 0,

    },
    load_data: {
        paddingTop: 5
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },
    textinput: {
        height: 50,
        fontSize: 25,
        textAlign: 'center',
        color: '#9071E9'
    },
    addProduct: {
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
})

export default List
