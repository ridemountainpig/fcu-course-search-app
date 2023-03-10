import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Linking } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

function GeneralStudies() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fcu-course-search.ridemountainpig.repl.co/getGeneralStudiesList', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(Object.values(data));
      })
  }, []);

  return (
    <View className="h-screen bg-slate-100">
      <View className="mx-auto mt-6 mb-2">
        <Text className="font-bold text-3xl text-gray-600">General Studies</Text>
        <Text className="font-semibold text-lg text-gray-400 mt-1 mx-auto">通識課程</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.courseNumber}
        className="mb-20 rounded-2xl mx-auto"
        style={{ backgroundColor: '#dfe7d5', width: '96%' }}
        renderItem={({ item }) => (
          <View className="mx-auto items-center p-2 my-2 bg-white rounded-xl w-11/12">
            <Text className="flex justify-center items-center p-5 m-3 text-gray-600 font-extrabold text-lg bg-slate-100 rounded-lg">
              {item.courseNumber}
            </Text>
            <View className="flex justify-center">
              <Text className="text-gray-600 font-bold text-xl">
                {item.courseName}
              </Text>
            </View>
            <View className="flex justify-center">
              <Text className="text-gray-400 font-medium text-sm mt-2">
                {item.courseDate + " " + item.courseClass}
              </Text>
            </View>
            <Text className="flex justify-end items-center text-orange-400 font-bold text-xl mt-2">
              <Text>{item.courseBalance}<Ionicons name="flash" size={20}></Ionicons>{item.courseSum}</Text>
            </Text>
            <View className="flex justify-center">
              <Text className="p-5 m-3 text-gray-600 font-bold text-lg rounded-lg" style={{ backgroundColor: '#dfe7d5' }} onPress={() => Linking.openURL(`${item.courseIntroduceUrl}`)}>課程大綱</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default GeneralStudies