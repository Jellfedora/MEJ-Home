import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { apiEditProduct } from '../API/MEJ-API'
import { apiDeleteProduct } from '../API/MEJ-API'
import FlashMessage from "react-native-flash-message"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as Animatable from 'react-native-animatable'
import * as Font from 'expo-font';

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props,
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        this.view.bounceInLeft(1000).then();
        await Font.loadAsync({
            'font-app': require('../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    // componentDidMount() {
    //     // console.log('component product mount:')
    //     this.view.bounceInLeft(1000).then();
    // }

    componentDidUpdate() {
        console.log("component Product DidUpdate : ")
        // console.log(this.state.product)


    }

    // Supprime un produit de la liste
    _deleteProduct(value) {

        apiDeleteProduct(value.name).then(data => {
            if (data.status === "ok") {
                this.view.bounceOut(1000)
                setTimeout(() => this.deleteProductWithReducer(value), 800)
            } else {
                showMessage({
                    message: 'Tiens dis donc, mais ce serait ti pas un bug ça?',
                    type: "danger",
                    animationDuration: 1000
                })
            }
        })
    }

    deleteProductWithReducer(value) {
        const action = { type: "DELETE_PRODUCT", value: value }
        this.props.dispatch(action)
    }

    _addQuantity(value) {
        const action = { type: "ADD_QUANTITY", value: value }
        this.props.dispatch(action)
        // Api MEJ-Home
        apiEditProduct(this.props.product).then(data => {
        })

    }

    _removeQuantity(value) {
        const action = { type: "REMOVE_QUANTITY", value: value }
        this.props.dispatch(action)
        // Api MEJ-Home
        apiEditProduct(this.props.product).then(data => {
        })
    }

    handleViewRef = ref => this.view = ref;
    bounce = () => this.view.bounceInLeft(800)
    // Affichage
    render() {
        const product = this.props.product
        if (product.archive !== 1) {
            return (

                <TouchableWithoutFeedback >
                    <Animatable.View ref={this.handleViewRef}>
                        <View
                            style={styles.item}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{
                                        fontFamily: 'font-app',
                                        color: '#9071E9',
                                        fontSize: 25,
                                        textAlign: 'center',
                                        flex: 1,
                                        // marginTop: 12
                                    }}>
                                        {product.name}
                                    </Text>
                                ) : null
                            }
                            {/* <Text style={styles.title_item}>{product.name}({product.quantity})</Text> */}
                            <View style={styles.container_action}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{
                                            fontFamily: 'font-app',
                                            color: '#9071E9',
                                            fontSize: 25,
                                            textAlign: 'center',
                                        }}> ( {product.quantity} )</Text>
                                    ) : null
                                }

                                {/* REMOVE QUANTITY*/}
                                {this.props.product.quantity >= 2 &&
                                    <TouchableOpacity onPress={() => this._removeQuantity(this.props.product)}>
                                        <View>
                                            <Ionicons name="ios-remove" size={50} color="#9071E9" />
                                        </View>
                                    </TouchableOpacity>
                                }
                                {/* ADD QUANTITY*/}
                                <TouchableOpacity onPress={() => this._addQuantity(this.props.product)}>
                                    <View>
                                        <Ionicons name="ios-add" size={50} color="#9071E9" />
                                    </View>
                                </TouchableOpacity>

                                {/* DELETE PRODUCT */}
                                <TouchableOpacity onPress={() => this._deleteProduct(this.props.product)}>
                                    <View>
                                        <Ionicons name="ios-trash" size={50} color="#9071E9" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <FlashMessage position="top" />
                        </View>
                    </Animatable.View>
                </TouchableWithoutFeedback>
            )
        } else {
            return null
        }
    }
}

// Css
const styles = StyleSheet.create({
    main_container: {
        height: 30
    },
    item: {
        // marginBottom: 5,
        display: 'flex',
        borderBottomWidth: 0.5,
        borderBottomColor: '#9071E9',
        // padding: 10,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        alignItems: 'center'


    },
    container_action: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: 100,
        height: '100 %',
        justifyContent: 'space-between',
        borderLeftWidth: 0.5,
        borderColor: 'white',
        paddingLeft: 20,
        display: 'flex',
        alignItems: 'center'
    },
    quantity_item: {
        color: '#9071E9',
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteProduct: {
        // backgroundColor: 'red'
        flex: 1,
    }
})


const mapStateToProps = (state) => {
    return {
        quantityOfItem: state.quantityOfItem,
        productList: state.product
    }
}

export default connect(mapStateToProps)(Product)