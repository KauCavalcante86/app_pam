// Splash.js
import { View, ActivityIndicator, Image } from 'react-native';
import React, { useEffect } from 'react';
import { getUserStorage } from '../../utils/storege';

export default function Splash() {

  useEffect(() => {
    async function carregarUsuario() {
      // espera 1.5 segundos para mostrar o GIF
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = await getUserStorage();

      if (user) {
        setUsuarioLogin(user);   // vai direto para AppStack
      } else {
        setUsuarioLogin(null);   // vai para AuthStack
      }
    }

    carregarUsuario();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../../assets/medicine.gif')}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    </View>
  );
}
