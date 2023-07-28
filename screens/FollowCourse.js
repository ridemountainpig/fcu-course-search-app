import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Alert,
} from 'react-native';
import CourseLoading from '../components/CourseLoading';
import CourseNumberErrorModal from '../components/CourseNumberErrorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

function FollowCourse() {
    const [inputValue, setInputValue] = useState('');
    const textInputRef = useRef(null);

    const [courseCount, setCourseCount] = useState('');
    // useEffect(() => {
    //     console.log("courseCount:", courseCount);
    // }, [courseCount]);

    const [modalVisible, setModalVisible] = React.useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    const addCourse = async () => {
        if (inputValue) {
            try {
                let checkUrl =
                    'https://fcu-course-search.zeabur.app/checkcourse/' +
                    inputValue;
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
                    // courseErrorAlert();
                    setModalVisible(true);
                    setInputValue('');
                    textInputRef.current.blur();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteCourse = async (courseNumber) => {
        try {
            await AsyncStorage.removeItem(courseNumber);
            generateCourseList();
        } catch (error) {
            console.log(error);
        }
    };

    const getAllData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            if (keys && keys.length) {
                const items = await AsyncStorage.multiGet(keys);
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
        setCourseCount('loading');
        let items = await getAllData();
        let courseList = [];

        for (let i = 0; i < items.length; i++) {
            let url =
                'https://fcu-course-search.zeabur.app/searchcourse/' + items[i][1];
            let response = await fetch(url, {
                method: 'GET',
            });
            let data = await response.json();
            courseList.push(data['0']);
        }
        setData(Object.values(courseList));
        setCourseCount(items.length);
    };

    const courseErrorAlert = () => {
        Alert.alert(
            '課程代碼錯誤',
            '請確認課程代碼是否正確',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    };

    return (
        <View className="h-screen bg-slate-100">
            <View className="mx-auto mb-2 mt-6">
                <Text className="text-3xl font-bold text-gray-600">
                    Follow Course
                </Text>
                <Text className="mx-auto mt-1 text-lg font-semibold text-gray-400">
                    關注課程
                </Text>
            </View>
            <View
                className="mx-auto w-10/12 rounded-2xl"
                style={{ backgroundColor: 'white', width: '92%' }}
            >
                <View className="mx-6 my-4 flex">
                    <TextInput
                        ref={textInputRef}
                        placeholder="請輸入課程號碼"
                        keyboardType="numeric"
                        onChangeText={(text) => setInputValue(text)}
                        onBlur={() => Keyboard.dismiss()}
                        value={inputValue}
                        style={{ color: '#6b7280' }}
                        className="block w-full rounded-lg bg-slate-100 p-4 text-center text-base font-bold"
                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={addCourse}>
                    <View className="mx-auto mb-2 w-5/12 rounded-lg bg-sky-100 py-3">
                        <Text className="text-center text-lg font-semibold text-gray-500">
                            {/* <Ionicons name='add-circle-outline' size={16}></Ionicons> */}
                            關注課程
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                {courseCount == 'loading' ? (
                    <CourseLoading />
                ) : courseCount ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.courseNumber}
                        className="mx-auto mt-2 rounded-2xl bg-backgroundGreen"
                        style={{
                            backgroundColor: '#dfe7d5',
                            width: '92%',
                            height: '58%',
                        }}
                        renderItem={({ item }) => (
                            <View className="mx-auto my-2 w-11/12 items-center rounded-xl bg-white p-1">
                                <Text className="m-3 flex w-85% items-center justify-center rounded-lg bg-slate-100 p-4 text-center text-lg font-extrabold text-gray-600">
                                    {item.courseNumber}
                                </Text>
                                <View className="flex justify-center">
                                    <Text className="text-lg font-bold text-gray-600">
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
                                        <Ionicons
                                            name="flash"
                                            size={20}
                                        ></Ionicons>
                                        {item.courseSum}
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        deleteCourse(`${item.courseNumber}`)
                                    }
                                    className="flex justify-center"
                                >
                                    <Text
                                        className="m-3 rounded-lg p-4 text-base font-bold text-gray-600"
                                        style={{
                                            backgroundColor:
                                                'rgb(254, 202, 202)',
                                        }}
                                    >
                                        取消關注
                                    </Text>
                                </TouchableOpacity>
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
                                    尚未關注課程
                                </Text>
                                <Ionicons
                                    name="happy-outline"
                                    size={80}
                                    style={{ color: 'rgb(75 85 99)' }}
                                ></Ionicons>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            {modalVisible ? (
                <CourseNumberErrorModal closeModal={closeModal} />
            ) : null}
        </View>
    );
}

export default FollowCourse;
