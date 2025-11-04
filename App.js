import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Pressable } from "react-native";
import Login from "./src/pages/login/login";
import Splash from "./src/pages/splash/splash";
import Teste from "./src/pages/testeCamera/teste";
import Geolocalizacao from "./src/pages/geolocalizacao/geo";
import Cadastro from "./src/pages/cadastro/cadastro";
import Home from "./src/pages/home/home";
import PageOne from "./src/pages/pageOne/pageOne";
import Calorias from "./src/pages/calorias/calorias";
import Agua from "./src/pages/agua/agua";
import Imc from "./src/pages/imc/imc";
import Perfil from "./src/pages/perfil/perfil";
import Geo from "./src/pages/geolocalizacao/geo";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="PageOne" component={PageOne} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="teste" component={Teste} />

    </Stack.Navigator>
  );
};

function AppStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name = "Home" component={Home} />
      <Stack.Screen name = "Perfil" component={Perfil} />
      <Stack.Screen name="geo" component={Geo} />
      <Stack.Screen name="calorias" component={Calorias}/>
      <Stack.Screen name="Agua" component={Agua}/>
      <Stack.Screen name="Imc" component={Imc}/>
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

    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
 
    </NavigationContainer>
  );
}

