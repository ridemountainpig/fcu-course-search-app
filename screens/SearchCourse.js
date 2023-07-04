import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function SearchCourse() {
    const [courseInputValue, setCourseInputValue] = useState('');
    const courseInputRef = useRef(null);
    const [showCourseState, setShowCourseState] = useState(false);
    const [courseData, setCourseData] = useState({
        0: {
            courseBalance: '',
            courseClass: '',
            courseDate: '',
            courseIntroduceUrl: '',
            courseName: '',
            courseNumber: '',
            courseSum: '',
            courseTeacher: '',
        },
    });

    const getCourseData = async () => {
        if (courseInputValue) {
            try {
                let checkUrl =
                    'https://fcu-course-search.repl.co/searchcourse/' +
                    courseInputValue;
                let response = await fetch(checkUrl, {
                    method: 'GET',
                });
                let data = await response.json();
                if (data) {
                    setCourseInputValue('');
                    courseInputRef.current.blur();
                    setCourseData(data);
                    setShowCourseState('true');
                } else {
                    // courseErrorAlert();
                    setCourseInputValue('');
                    courseInputRef.current.blur();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View className="relative h-screen bg-slate-100">
            <Text className="absolute -left-20 bottom-6 h-64 w-64 rounded-full bg-gradient4 opacity-60 blur-3xl"></Text>
            <View className="relative mx-auto mb-2 mt-6">
                <Text className="absolute -right-40 -top-20 h-44 w-44 rounded-full bg-gradient1 opacity-20 blur-3xl"></Text>
                <Text className="text-3xl font-bold text-gray-600">
                    Search Course
                </Text>
                <Text className="mx-auto mt-1 text-lg font-semibold text-gray-400">
                    查詢課程
                </Text>
            </View>
            <View className="relative mx-5 flex h-3/5 items-center justify-center">
                <Text className="absolute -left-20 top-6 h-44 w-44 rounded-full bg-gradient2 opacity-100 blur-3xl"></Text>
                <Text className="absolute -right-16 bottom-24 h-44 w-44 rounded-full bg-gradient3 opacity-20 blur-3xl"></Text>
                {!showCourseState ? (
                    <View className="h-1/3 w-full">
                        <TextInput
                            ref={courseInputRef}
                            placeholder="請輸入課程號碼"
                            keyboardType="numeric"
                            onChangeText={(text) => setCourseInputValue(text)}
                            // onBlur={() => Keyboard.dismiss()}
                            value={courseInputValue}
                            style={{ color: '#6b7280' }}
                            className="block w-full rounded-lg border-8 border-white bg-slate-100 p-6 text-center text-lg font-semibold text-gray-500"
                        />
                        <TouchableOpacity
                            onPress={getCourseData}
                            activeOpacity={0.8}
                        >
                            <View className="mx-auto mt-4 rounded-lg border-8 border-white bg-orange-100 px-6 py-4">
                                <Text className="text-center text-lg font-semibold text-gray-500">
                                    查詢課程
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="h-full w-full">
                        <View className="opacity-bg-80 relative mx-auto mt-20 h-fit w-11/12 rounded-2xl bg-white px-4 pb-4">
                            <TouchableOpacity
                                className="opacity-bg-60 absolute -right-4 -top-4 rounded-full bg-orange-400 p-2"
                                onPress={() => setShowCourseState(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={25}
                                    color={'#ffffff'}
                                ></Ionicons>
                            </TouchableOpacity>
                            <Text className="mx-auto -mt-8 rounded-2xl bg-backgroundGreen px-16 py-6 text-center text-xl font-bold text-gray-600">
                                {courseData['0']['courseNumber']}
                            </Text>
                            <View className="mx-8">
                                <Text className="mt-10 text-2xl font-extrabold text-gray-600">
                                    {courseData['0']['courseName']}
                                </Text>
                                <Text className="mt-4 items-center text-base font-semibold text-gray-400">
                                    開課系所：{courseData['0']['courseClass']}
                                </Text>
                                <Text className="mt-2 items-center text-base font-semibold text-gray-400">
                                    上課時間：{courseData['0']['courseDate']}
                                </Text>
                                <Text className="mt-2 items-center text-base font-semibold text-gray-400">
                                    教師：{courseData['0']['courseTeacher']}
                                </Text>
                            </View>
                            <Text className="mx-auto mt-4 justify-end text-2xl font-bold text-orange-400">
                                <Text>
                                    {courseData['0']['courseBalance']}
                                    <Ionicons name="flash" size={20}></Ionicons>
                                    {courseData['0']['courseSum']}
                                </Text>
                            </Text>
                            <View className="mx-auto">
                                <Text
                                    className="m-4 rounded-lg p-5 text-base font-bold text-gray-600"
                                    style={{ backgroundColor: '#dfe7d5' }}
                                    onPress={() =>
                                        Linking.openURL(
                                            `${courseData['0']['courseIntroduceUrl']}`
                                        )
                                    }
                                >
                                    課程大綱
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

export default SearchCourse;
