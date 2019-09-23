import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import List from '../Components/List';
import ProductDetail from '../Components/ProductDetail';
import BabyCheck from '../Components/BabyCheck';

const SearchStackNavigator = createStackNavigator({
    List: {
        screen: List,
        navigationOptions: {
            title: 'Ma Val de poche',
            headerStyle: {
                backgroundColor: '#9071E9',
                shadowColor: 'transparent',
                elevation: 0
            },
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                color: 'white',
                textTransform: 'uppercase',
            },
        },

    },
    ProductDetail: {
        screen: ProductDetail
    }
})

const HomeTabNavigator = createBottomTabNavigator({
    BabyCheck: {
        screen: BabyCheck,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/babycheck-icon.png')}
                    style={styles.icon} />
            }
        }
    },
    List: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/shop-list-icon.png')}
                    style={styles.icon} />
            }
        }
    }

},
    {
        tabBarOptions: {
            activeBackgroundColor: '#9071E9', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }

)




const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(HomeTabNavigator)