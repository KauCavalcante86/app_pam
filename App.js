import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/pages/splash/splash";
import Login from "./src/pages/login/login";
import Cadastro from "./src/pages/cadastro/cadastro";
import Home from "./src/pages/home/home";

import { Image, Pressable } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{headerShown:false,}}/>     
        <Stack.Screen name="login" component={Login} options={{headerShown:false,}}/>     
        <Stack.Screen name="cadastro" component={Cadastro} options={{headerShown:false,}}/>     
        <Stack.Screen name="home" component={Home} options={{headerShown:false,}}/>     
  
 </Stack.Navigator>
    </NavigationContainer>
 
)};
