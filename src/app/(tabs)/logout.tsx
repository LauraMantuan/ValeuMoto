import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import {
  useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold,  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

export default function Logout() {
  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold,  });

  useEffect(() => {
    carregarDados();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    const emailSalvo = await AsyncStorage.getItem('@usuario_email');
    if (emailSalvo) {
      setEmail(emailSalvo);
    } else {
      setEmail('');
    }
  }

  async function handleLogout() {
    const emailSalvo = await AsyncStorage.getItem('@usuario_email');

    if (emailSalvo !== null) {
      await AsyncStorage.removeItem('@usuario_email');
      await AsyncStorage.removeItem('@usuario_senha');
      await AsyncStorage.removeItem('@usuario_nome');
      Alert.alert('Sucesso', 'Você saiu da conta com sucesso!');
      router.replace('/');
    } else {
      Alert.alert('Aviso', 'Nenhum usuário conectado!');
      router.replace('/');
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/bus-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logo}>ValeuMotô!</Text>
      </View>

      <Text style={styles.title}>Sair da Conta</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.mensagem}>Deseja realmente sair da sua conta?</Text>
        {email ? (
          <Text style={styles.userEmail}>{email}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={handleLogout} activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F1F4FA',
  },
  logoImage: {
    width: 75,
    height: 74,
    marginRight: -15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 75,
  },
  logo: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 38,
    color: '#a81f6b',
    marginLeft: 8,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 33,
    color: '#0b0a0b',
    marginBottom: 15,
  },
  infoContainer: {
    width: 320,
    alignItems: 'center',
    marginBottom: 20,
  },
  mensagem: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#141314',
    textAlign: 'center',
    marginBottom: 10,
  },
  userEmail: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#a81f6b',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E0007A',
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    minWidth: 250,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#f1e1e1',
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 16,
    textAlign: 'center',
  },
  voltar: {
    color: '#E0007A',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
