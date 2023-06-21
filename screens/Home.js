import React from 'react'
import {
    View,
    Text,
    ScrollView,
    Linking,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import HomeCard from '../components/HomeCard';
import Ionicons from '@expo/vector-icons/Ionicons';

function Home({ navigation }) {

    return (
        <View className="h-screen bg-slate-100">
            <ScrollView>
                <View className="flex justify-center">
                    <View className="mt-20 mb-8">
                        <View className="flex justify-center items-center">
                            <Image source={require('../assets/FCU.png')} style={styles.image}></Image>
                            <Text className="font-bold tracking-wider text-4xl text-gray-600 mt-8">Course Search</Text>
                        </View>
                    </View>
                    <View className="flex justify-center">
                        <View className="flex justify-center items-center">
                            <TouchableOpacity activeOpacity={1}>
                                <HomeCard iconName="planet-outline" title="Course Number" subtitle="課程代號"></HomeCard>
                            </TouchableOpacity>
                        </View>
                        <View className="flex justify-center items-center">
                            <TouchableOpacity onPress={() => { navigation.navigate('GeneralStudies'); }} activeOpacity={1}>
                                <HomeCard iconName="cube-outline" title="General Studies" subtitle="通識課程"></HomeCard>
                            </TouchableOpacity>
                        </View>
                        <View className="flex justify-center items-center">
                            <TouchableOpacity onPress={() => { navigation.navigate('FollowCourse'); }} activeOpacity={1}>
                                <HomeCard iconName="heart-outline" title="Follow Courses" subtitle="關注課程"></HomeCard>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex items-center justify-center text-gray-400 p-8 pb-20">
                        <Text className="font-medium text-base text-gray-600" onPress={() => Linking.openURL("https://github.com/ridemountainpig")}>
                            <Ionicons name="battery-charging" size={16} color={'#22c55e'}></Ionicons> Power By ridemountainpig
                        </Text>
                        <View className="my-2 py-2 px-4 bg-white rounded-xl">
                            <Text className="font-medium text-base text-gray-600" onPress={() => Linking.openURL("https://github.com/ridemountainpig/fcu-course-search-app")}>
                                <Ionicons name="logo-github" size={16}></Ionicons> Github
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 100,
    },
});

export default Home