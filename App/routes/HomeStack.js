import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import GeneralStudies from '../screens/GeneralStudies';

const screens = {
    Home: {
        screen: Home,
    },
    GeneralStudies: {
        screen: GeneralStudies,
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);