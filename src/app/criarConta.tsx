import { useState } from 'react';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold,} from '@expo-google-fonts/poppins';

import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CriarConta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  async function cadastrar() {
    if (nome === '' || email === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else if (!email.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
    } else if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
    } else {
      const emailSalvo = await AsyncStorage.getItem('@usuario_email');

      if (emailSalvo === email) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado!');
      } else if (emailSalvo !== null) {
        Alert.alert('Erro', 'Já existe uma conta cadastrada neste dispositivo!');
      } else {
        await AsyncStorage.setItem('@usuario_nome', nome);
        await AsyncStorage.setItem('@usuario_email', email);
        await AsyncStorage.setItem('@usuario_senha', senha);

        Alert.alert('Sucesso', 'Conta criada com sucesso!', [
          {
            text: 'OK',
            onPress: () => router.navigate('/'),
          },
        ]);
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
          source={require('../../assets/images/bus-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logo}>ValeuMotô!</Text>
      </View>

      <Text style={styles.title}>Criar Conta</Text>

      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={cadastrar} activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>Criar Conta</Text>
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