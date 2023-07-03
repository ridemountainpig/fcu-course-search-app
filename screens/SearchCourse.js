import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CourseLoading from '../components/CourseLoading';
import Ionicons from '@expo/vector-icons/Ionicons';

function SearchCourse() {
    const [courseInputValue, setCourseInputValue] = useState('');
    const courseInputRef = useRef(null);

    return (
        <View className="h-screen bg-slate-100 relative">
            <Text className="absolute bottom-6 -left-20 w-64 h-64 rounded-full bg-gradient4 opacity-60 blur-3xl"></Text>
            <View className="mx-auto mb-2 mt-6 relative">
                <Text className="absolute -top-20 -right-40 w-44 h-44 rounded-full bg-gradient1 opacity-20 blur-3xl"></Text>
                <Text className="text-3xl font-bold text-gray-600">
                    Search Course
                </Text>
                <Text className="mx-auto mt-1 text-lg font-semibold text-gray-400">
                    查詢課程
                </Text>
            </View>
            <View className="h-3/5 flex items-center justify-center mx-5 mt-10 relative">
                <Text className="absolute top-6 -left-20 w-44 h-44 rounded-full bg-gradient2 opacity-20 blur-3xl"></Text>
                <Text className="absolute bottom-24 -right-16 w-44 h-44 rounded-full bg-gradient3 opacity-20 blur-3xl"></Text>
                <TextInput
                    ref={courseInputRef}
                    placeholder="請輸入課程號碼"
                    keyboardType="numeric"
                    onChangeText={(text) => setCourseInputValue(text)}
                    // onBlur={() => Keyboard.dismiss()}
                    value={courseInputValue}
                    style={{ color: '#6b7280' }}
                    className="block w-full rounded-lg bg-slate-100 p-6 text-center text-lg font-semibold text-gray-500 border-8 border-white"
                />
                <TouchableOpacity activeOpacity={0.8}>
                    <View className="mx-auto rounded-lg mt-4 px-6 py-4 bg-orange-100 border-8 border-white">
                        <Text className="text-center text-lg font-semibold text-gray-500">
                            查詢課程
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchCourse;
