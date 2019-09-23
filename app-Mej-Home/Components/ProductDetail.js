import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getProduct } from '../API/MEJ-API'

class ItemDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
        }
    }
    componentDidMount() {
        console.log('component list mount:')


    }


    render() {
        console.log(this.props.navigation)
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>Détail du produit {this.props.navigation.state.params.nameProduct}</Text>
                <Text>Page d'édition d'un produit, nom, sous produit,quantité,commentaire. A venir!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    }
})

export default ItemDetail