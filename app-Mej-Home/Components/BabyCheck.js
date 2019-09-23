import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getListOfBabychecks } from '../API/MEJ-API'

class BabyCheck extends React.Component {

    async componentDidMount() {
        console.log('component list mount:')



        // Charge la liste de course au démarrage de l'app
        this._loadList()
    }

    _loadList() {
        getListOfBabychecks().then(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Babycheck</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default BabyCheck