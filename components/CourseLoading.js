import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text } from 'react-native';

const LoadingIcon = () => {
    return (
        <View className="rounded-2xl mx-auto mt-2 bg-backgroundGreen"
            style={{ backgroundColor: '#dfe7d5', width: '92%', height: '76%' }}
        >
            {/* <View className="h-full flex items-center justify-around">
                <Text className="font-semibold text-4xl text-gray-600 p-4 bg-white rounded-xl">
                    <Ionicons name="sunny-outline" className="animate-spin" size={36}></Ionicons>loading
                </Text>
            </View> */}
            <View className="h-full flex items-center justify-around">
                <View className="flex items-center">
                    <Text className="font-semibold text-3xl px-6 pt-5 pb-4 my-2 text-gray-600 bg-white rounded-xl">課程載入中</Text>
                    <Ionicons name="happy-outline" size={80} style={{ color: 'rgb(75 85 99)' }}></Ionicons>
                </View>
            </View>
        </View>
    );
};

export default LoadingIcon;
