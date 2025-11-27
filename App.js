// App.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Contexto e MiniPlayer
import { PlayerProvider } from "./context/PlayerContext"; 
import GlobalMiniPlayer from "./src/components/GlobalMiniPlayer"; 

// Utils
import { getUserStorage } from "./src/utils/storage";

// Screens
import Splash from "./src/pages/splash/splash";
import Login from "./src/pages/login/login";
import Cadastro from "./src/pages/cadastro/cadastro";
import PageOne from "./src/pages/pageOne/pageOne";
import Home from "./src/pages/home/home";
import Sangue from "./src/pages/sangue/TipoSangue"
import Perfil from "./src/pages/perfil/perfil";
import Geo from "./src/pages/geolocalizacao/geo";
import Calorias from "./src/pages/calorias/calorias";
import Agua from "./src/pages/agua/agua";
import Imc from "./src/pages/imc/imc";
import Sons from "./src/pages/sons/sons";
import Vacinas from "./src/pages/vacinas/Vacinas";
import Alergias from "./src/pages/alergias/Alergias";
import Dicas from "./src/pages/dicas/dicas";
import Pressao from "./src/pages/pressao/Pressao";


const Stack = createStackNavigator();

function AuthStack({ setUsuarioLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PageOne" component={PageOne} />
      <Stack.Screen name="Login">
        {props => <Login {...props} setUsuarioLogin={setUsuarioLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Teste" component={Teste} />
    </Stack.Navigator>
  );
}

function AppStack({ usuarioLogin, setUsuarioLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Perfil">
        {props => <Perfil {...props} setUsuarioLogin={setUsuarioLogin} />}
      </Stack.Screen>
      <Stack.Screen name="sangue" component={Sangue} />
      <Stack.Screen name="Geo" component={Geo} />
      <Stack.Screen name="Calorias" component={Calorias} />
      <Stack.Screen name="Agua" component={Agua} />
      <Stack.Screen name="Imc" component={Imc} />
      <Stack.Screen name="Sons" component={Sons} />
      <Stack.Screen name="Vacinas" component={Vacinas} />
      <Stack.Screen name="Alergias" component={Alergias} /> 
      <Stack.Screen name="Dicas" component={Dicas} /> 
      <Stack.Screen name="Pressao" component={Pressao} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [usuarioLogin, setUsuarioLogin] = useState(null);

  // Carrega usuário do AsyncStorage ao iniciar
  useEffect(() => {
    async function loadUser() {
      const user = await getUserStorage();
      if (user) setUsuarioLogin(user);
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) {
  return <Splash/>;
}


  return (
    <PlayerProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          {usuarioLogin ? (
            // Usuário logado → AppStack + MiniPlayer
            <>
              <AppStack usuarioLogin={usuarioLogin} setUsuarioLogin={setUsuarioLogin} />
              <GlobalMiniPlayer />
            </>
          ) : (
            // Usuário não logado → AuthStack
            <AuthStack setUsuarioLogin={setUsuarioLogin} />
          )}
        </NavigationContainer>
      </View>
    </PlayerProvider>
  );
}
