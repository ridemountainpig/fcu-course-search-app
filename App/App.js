import React from 'react';
import { Text, View } from 'react-native';
import Home from './components/Home';
import Navigator from './routes/HomeStack';

export default function App() {
  return (
    <Navigator />
  );
}