import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Pressable } from "react-native";
import Login from "./src/pages/login/login";
import Splash from "./src/pages/splash/splash";
import Teste from "./src/pages/testeCamera/teste";
import Cadastro from "./src/pages/cadastro/cadastro";
import Home from "./src/pages/home/home";
import Calorias from "./src/pages/calorias/calorias";
import Perfil from "./src/pages/perfil/perfil";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="cadastro" component={Cadastro} />
      <Stack.Screen name="teste" component={Teste} />
      <Stack.Screen name="calorias" component={Calorias}/>
      <Stack.Screen name="home" component={Home}/>
      <Stack.Screen name="Perfil" component={Perfil}/>
    </Stack.Navigator>
  );
};

function AppStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name = "home" component={Home} />
      <Stack.Screen name = "Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [usuarioLogin, setUsuarioLogin] = useState(null);

  useEffect(() => {
    async function veriLogin() {
      const usuarioSalvo = await AsyncStorage.getItem("usuario");
      if (usuarioSalvo) setUsuarioLogin(JSON.parse(usuarioSalvo));
      setLoading(false);
    }
    veriLogin();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {usuarioLogin ? <AppStack setUsuarioLogin={setUsuarioLogin} />
       : <AuthStack />}
    </NavigationContainer>
  );
}

