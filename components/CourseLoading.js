import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text } from 'react-native';

const LoadingIcon = () => {
    return (
        <View
            className="mx-auto mt-2 rounded-2xl bg-backgroundGreen"
            style={{ backgroundColor: '#dfe7d5', width: '92%', height: '76%' }}
        >
            {/* <View className="h-full flex items-center justify-around">
                <Text className="font-semibold text-4xl text-gray-600 p-4 bg-white rounded-xl">
                    <Ionicons name="sunny-outline" className="animate-spin" size={36}></Ionicons>loading
                </Text>
            </View> */}
            <View className="flex h-full items-center justify-around">
                <View className="flex items-center">
                    <Text className="my-2 rounded-xl bg-white px-6 pb-4 pt-5 text-3xl font-semibold text-gray-600">
                        課程載入中
                    </Text>
                    <Ionicons
                        name="happy-outline"
                        size={80}
                        style={{ color: 'rgb(75 85 99)' }}
                    ></Ionicons>
                </View>
            </View>
        </View>
    );
};

export default LoadingIcon;
