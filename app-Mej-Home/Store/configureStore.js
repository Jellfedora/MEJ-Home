import { createStore } from 'redux';
import manageItem from './Reducers/itemReducer'

export default createStore(manageItem)