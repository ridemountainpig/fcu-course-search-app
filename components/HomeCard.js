import React from 'react'
import {
    View,
    Text,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function HomeCard(props) {
    return (
        <View
            className="mx-8 my-4 pt-10 w-80 bg-slate-200 rounded-lg">
            {/* <a href="/followcourse"> */}
            <View className="flex justify-center items-center my-8 p-5 bg-white">
                <Ionicons name={props.iconName} size={50}></Ionicons>
            </View>
            <View className="flex justify-center">
                <View className="pb-10">
                    <Text className="mx-auto font-bold text-2xl text-gray-600 py-1">{props.title}</Text>
                    <Text className="mx-auto font-medium text-sm text-gray-400">{props.subtitle}</Text>
                </View>
            </View>
            {/* </a> */}
        </View>
    )
}

export default HomeCard