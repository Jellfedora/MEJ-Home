import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import List from '../Components/List'
import ItemDetail from '../Components/ItemDetail'
import FilmDetail from '../Components/BabyCheck'

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
    ItemDetail: {
        screen: ItemDetail
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)