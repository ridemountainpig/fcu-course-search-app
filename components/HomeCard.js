import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function HomeCard(props) {
    return (
        <View className="mx-8 my-4 w-80 rounded-lg bg-slate-200 pt-10">
            {/* <a href="/followcourse"> */}
            <View className="my-8 flex items-center justify-center bg-white p-5">
                <Ionicons name={props.iconName} size={50}></Ionicons>
            </View>
            <View className="flex justify-center">
                <View className="pb-10">
                    <Text className="mx-auto py-1 text-2xl font-bold text-gray-600">
                        {props.title}
                    </Text>
                    <Text className="mx-auto text-sm font-medium text-gray-400">
                        {props.subtitle}
                    </Text>
                </View>
            </View>
            {/* </a> */}
        </View>
    );
}

export default HomeCard;
