import { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold,} from '@expo-google-fonts/poppins';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const emailSalvo = await AsyncStorage.getItem('@usuario_email');
    if (emailSalvo) {
      setEmail(emailSalvo);
    }
  }

  async function handleLogin() {
  if (email === '' || senha === '') {
    Alert.alert('Erro', 'Preencha todos os campos!');
  } else if (!email.includes('@')) {
    Alert.alert('Erro', 'Digite um e-mail válido!');
  } else if (senha.length < 6) {
    Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
  } else {
    const emailSalvo = await AsyncStorage.getItem('@usuario_email');
    const senhaSalva = await AsyncStorage.getItem('@usuario_senha');

    if (email === emailSalvo && senha === senhaSalva) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.navigate('/(tabs)/mapa');
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos!');
    }
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

      <Text style={styles.title}>Entrar</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#8a7b7b"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#8a7b7b"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate('/novaSenha')} activeOpacity={0.7}>
        <Text style={styles.subtitle}>Esqueceu a senha ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate('/criarConta')} activeOpacity={0.7}>
        <Text style={styles.criarConta}>Criar Conta</Text>
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
  form: {
    width: 320,
  },
  input: {
    width: 320,
    height: 50,
    borderColor: '#060506',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
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
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#141314',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8a7b7b',
    fontFamily: 'Poppins_400Regular',
    padding: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#E0007A',
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f1e1e1',
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 16,
    textAlign: 'center',
  },
  criarConta: {
    color: '#E0007A',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
