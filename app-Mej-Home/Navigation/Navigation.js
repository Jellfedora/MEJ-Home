import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import List from '../Components/List'
import ItemDetail from '../Components/ItemDetail'
import FilmDetail from '../Components/BabyCheck'

const SearchStackNavigator = createStackNavigator({
    List: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: List,
        navigationOptions: {
            title: 'Ma Val de poche'
        }
    },
    ItemDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: ItemDetail
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)