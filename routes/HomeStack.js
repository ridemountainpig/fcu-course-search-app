import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import GeneralStudies from '../screens/GeneralStudies';
import FollowCourse from '../screens/FollowCourse';

const screens = {
    Home: {
        screen: Home,
    },
    GeneralStudies: {
        screen: GeneralStudies,
    },
    FollowCourse: {
        screen: FollowCourse,
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);