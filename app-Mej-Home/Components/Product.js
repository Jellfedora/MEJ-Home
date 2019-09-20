import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { apiDeleteProduct } from '../API/MEJ-API'

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props
        }
    }

    componentDidMount() {
        // console.log('component product mount:')
    }

    componentDidUpdate() {
        // console.log("component Product DidUpdate : ")
        // console.log(this.state.product)

    }

    // Supprime un produit de la liste
    _deleteProduct(value) {
        apiDeleteProduct(value.id).then(data => {
            if (data == true) {
                console.log(data)
            }
        })
        // console.log(value)
        const action = { type: "DELETE_PRODUCT", value: value }
        this.props.dispatch(action)
    }

    _addQuantity(value) {
        const action = { type: "ADD_QUANTITY", value: value }
        this.props.dispatch(action)
    }

    _removeQuantity(value) {
        const action = { type: "REMOVE_QUANTITY", value: value }
        this.props.dispatch(action)
    }

    // _removeQuantity() {
    //     // Définition de notre action ici
    //     // console.log(this.state)
    //     const action = { type: "LESS_QUANTITY", value: this.state.product }
    //     this.props.dispatch(action)
    // }



    // Affichage
    render() {
        // console.log(this.state)
        const product = this.props.product
        if (product.archive !== 1) {
            return (
                <View
                    style={styles.item}>
                    <Text style={styles.title_item}>{product.name}({product.quantity})</Text>
                    <View style={styles.container_action}>
                        {/* REMOVE QUANTITY*/}
                        <TouchableOpacity onPress={() => this._removeQuantity(this.props.product)}>
                            <View>
                                <Ionicons name="ios-remove" size={50} color="white" />
                            </View>
                        </TouchableOpacity>
                        {/* ADD QUANTITY*/}
                        <TouchableOpacity onPress={() => this._addQuantity(this.props.product)}>
                            <View>
                                <Ionicons name="ios-add" size={50} color="white" />
                            </View>
                        </TouchableOpacity>
                        {/* DELETE PRODUCT */}
                        <TouchableOpacity onPress={() => this._deleteProduct(this.props.product)}>
                            <View>
                                <Ionicons name="ios-trash" size={50} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
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
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        padding: 10,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
        // height: 60,


    },
    title_item: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 2,
        marginTop: 12
    },
    container_action: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: 100,
        height: '100 %',
        justifyContent: 'space-between'
    },
    quantity_item: {
        color: 'white',
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