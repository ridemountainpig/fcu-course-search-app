import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons';

function FollowCourse() {

    const [inputValue, setInputValue] = useState('');
    const textInputRef = useRef(null);

    const [courseNumber, setCourseNumber] = useState('');
    // useEffect(() => {
    //     console.log("courseNumber:", courseNumber);
    // }, [courseNumber]);

    const addCourse = async () => {
        if (inputValue) {
            try {
                let checkUrl = 'https://fcu-course-search.repl.co/checkcourse/' + inputValue;
                let response = await fetch(checkUrl, {
                    method: 'GET',
                });
                let data = await response.json();
                if (data) {
                    setInputValue('');
                    textInputRef.current.blur();
                    await AsyncStorage.setItem(inputValue, inputValue);
                    generateCourseList();
                } else {
                    courseErrorAlert();
                    setInputValue('');
                    textInputRef.current.blur();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteCourse = async (courseNumber) => {
        try {
            await AsyncStorage.removeItem(courseNumber);
            generateCourseList();
        } catch (error) {
            console.log(error);
        }
    }

    const getAllData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            if (keys && keys.length) {
                const items = await AsyncStorage.multiGet(keys)
                return items;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        generateCourseList();
    }, []);

    const generateCourseList = async () => {
        let items = await getAllData();
        let courseList = [];
        setCourseNumber(items.length);

        for (let i = 0; i < items.length; i++) {
            let url = 'https://fcu-course-search.repl.co/searchcourse/' + items[i][1];
            let response = await fetch(url, {
                method: 'GET',
            });
            let data = await response.json();
            courseList.push(data["0"]);
        }
        setData(Object.values(courseList));
    }

    const courseErrorAlert = () => {
        Alert.alert(
            '課程代碼錯誤',
            '請確認課程代碼是否正確',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    };

    return (
        <View className="h-screen bg-slate-100">
            <View className="mx-auto mt-6 mb-2">
                <Text className="font-bold text-3xl text-gray-600">Follow Course</Text>
                <Text className="font-semibold text-lg text-gray-400 mt-1 mx-auto">關注課程</Text>
            </View>
            <View className="w-10/12 mx-auto rounded-2xl"
                style={{ backgroundColor: 'white', width: '92%' }}
            >
                <View className="flex my-4 mx-6">
                    <TextInput ref={textInputRef}
                        placeholder="請輸入課程號碼"
                        keyboardType="numeric"
                        onChangeText={(text) => setInputValue(text)} onBlur={() => Keyboard.dismiss()}
                        value={inputValue}
                        style={{ color: '#6b7280' }}
                        className="block w-full text-base p-4 text-center font-bold rounded-lg bg-slate-100"
                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={addCourse}>
                    <View className="bg-sky-100 rounded-lg py-3 w-5/12 mb-2 mx-auto">
                        <Text className="text-gray-500 font-semibold text-lg text-center">
                            {/* <Ionicons name='add-circle-outline' size={16}></Ionicons> */}
                            關注課程
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.courseNumber}
                    className="rounded-2xl mx-auto mt-2 bg-backgroundGreen"
                    style={{ backgroundColor: '#dfe7d5', width: '92%', height: '58%' }}
                    renderItem={({ item }) => (
                        <View className="mx-auto items-center p-1 my-2 bg-white rounded-xl w-11/12">
                            <Text className="flex justify-center items-center p-4 m-3 w-85% text-gray-600 font-extrabold text-lg bg-slate-100 rounded-lg text-center">
                                {item.courseNumber}
                            </Text>
                            <View className="flex justify-center">
                                <Text className="text-gray-600 font-bold text-lg">
                                    {item.courseName}
                                </Text>
                            </View>
                            <View className="flex justify-center">
                                <Text className="mx-auto items-center text-gray-400 font-bold text-sm mt-2">
                                    {item.courseDate}
                                </Text>
                                <Text className="mx-auto items-center text-gray-400 font-bold text-sm mt-2">
                                    {item.courseClass}
                                </Text>
                            </View>
                            <Text className="flex justify-end items-center text-orange-400 font-bold text-xl mt-2">
                                <Text>{item.courseBalance}<Ionicons name="flash" size={20}></Ionicons>{item.courseSum}</Text>
                            </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => deleteCourse(`${item.courseNumber}`)} className="flex justify-center">
                                <Text className="p-4 m-3 text-gray-600 font-bold text-base rounded-lg" style={{ backgroundColor: 'rgb(254, 202, 202)' }}>取消關注</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default FollowCourse