import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class BabyCheck extends React.Component {
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