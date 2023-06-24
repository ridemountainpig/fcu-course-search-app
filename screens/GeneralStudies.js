import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import CourseLoading from '../components/CourseLoading';
import Ionicons from '@expo/vector-icons/Ionicons';

function GeneralStudies() {
    const [data, setData] = useState([]);
    const [courseCount, setCourseCount] = useState('');

    useEffect(() => {
        setCourseCount('loading');
        fetch('https://fcu-course-search.repl.co/getGeneralStudiesList', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setData(Object.values(data));
                setCourseCount(Object.keys(data).length);
            });
    }, []);

    return (
        <View className="h-screen bg-slate-100">
            <View className="mx-auto mb-2 mt-6">
                <Text className="text-3xl font-bold text-gray-600">
                    General Studies
                </Text>
                <Text className="mx-auto mt-1 text-lg font-semibold text-gray-400">
                    通識課程
                </Text>
            </View>
            {courseCount == 'loading' ? (
                <CourseLoading />
            ) : courseCount ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.courseNumber}
                    className="mx-4 mb-20 rounded-xl bg-backgroundGreen py-2"
                    renderItem={({ item }) => (
                        <View className="mx-auto my-2 w-11/12 items-center rounded-xl bg-white p-1">
                            <Text className="m-3 flex w-85% items-center justify-center rounded-lg bg-slate-100 p-4 text-center text-lg font-extrabold text-gray-600">
                                {item.courseNumber}
                            </Text>
                            <View className="flex justify-center">
                                <Text className="text-lg font-extrabold text-gray-600">
                                    {item.courseName}
                                </Text>
                            </View>
                            <View className="flex justify-center">
                                <Text className="mx-auto mt-2 items-center text-sm font-bold text-gray-400">
                                    {item.courseDate}
                                </Text>
                                <Text className="mx-auto mt-2 items-center text-sm font-bold text-gray-400">
                                    {item.courseClass}
                                </Text>
                            </View>
                            <Text className="mt-2 flex items-center justify-end text-xl font-bold text-orange-400">
                                <Text>
                                    {item.courseBalance}
                                    <Ionicons name="flash" size={20}></Ionicons>
                                    {item.courseSum}
                                </Text>
                            </Text>
                            <View className="flex justify-center">
                                <Text
                                    className="m-3 rounded-lg p-4 text-base font-bold text-gray-600"
                                    style={{ backgroundColor: '#dfe7d5' }}
                                    onPress={() =>
                                        Linking.openURL(
                                            `${item.courseIntroduceUrl}`
                                        )
                                    }
                                >
                                    課程大綱
                                </Text>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View
                    className="mx-auto mt-2 rounded-2xl bg-backgroundGreen"
                    style={{
                        backgroundColor: '#dfe7d5',
                        width: '92%',
                        height: '76%',
                    }}
                >
                    <View className="flex h-full items-center justify-around">
                        <View className="flex items-center">
                            <Text className="my-2 rounded-xl bg-white px-6 pb-4 pt-5 text-3xl font-black text-gray-600">
                                通識課程皆已額滿
                            </Text>
                            <Ionicons
                                name="sad-outline"
                                size={80}
                                style={{ color: 'rgb(75 85 99)' }}
                            ></Ionicons>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

export default GeneralStudies;
