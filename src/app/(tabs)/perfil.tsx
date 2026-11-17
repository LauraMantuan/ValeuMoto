import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

export default function Perfil() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

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
    const nomeSalvo = await AsyncStorage.getItem('@usuario_nome');

    if (emailSalvo) {
      setEmail(emailSalvo);
    } else {
      setEmail('');
    }

    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      setNome('');
    }
  }

  const sair = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.botaoVoltar}
        >
          <Text style={styles.seta}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Perfil</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cartaoPerfil}>
          <View style={styles.avatar}>
            <Text style={styles.letraAvatar}>
              {nome ? nome.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : 'P')}
            </Text>
          </View>

          <Text style={styles.nome}>
            {nome || 'Passageiro'}
          </Text>

          <Text style={styles.email}>
            {email || 'E-mail não informado'}
          </Text>
        </View>

        <View style={styles.cartaoSaldo}>
          <Text style={styles.textoSaldo}>
            Saldo do passe: R$ 43,00
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push('/(tabs)/recarga')}
        >
          <Text style={styles.textoBotao}>
            Recarregar passe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push('/(tabs)/sugestoes')}
        >
          <Text style={styles.textoBotao}>
            Nova reclamação
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSair}
          onPress={sair}
        >
          <Text style={styles.textoBotaoSair}>
            Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3FC',
  },

  header: {
    height: 118,
    backgroundColor: '#B51D78',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  botaoVoltar: {
    marginRight: 20,
  },

  seta: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 30,
  },

  cartaoPerfil: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 245,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: '#B51D78',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  letraAvatar: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  nome: {
    color: '#171725',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  email: {
    color: '#888888',
    fontSize: 17,
  },

  cartaoSaldo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  textoSaldo: {
    color: '#171725',
    fontSize: 21,
    fontWeight: 'bold',
  },

  botao: {
    height: 80,
    borderWidth: 2,
    borderColor: '#B51D78',
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  textoBotao: {
    color: '#B51D78',
    fontSize: 21,
    fontWeight: 'bold',
  },

  botaoSair: {
    height: 80,
    borderWidth: 2,
    borderColor: '#921B4C',
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotaoSair: {
    color: '#921B4C',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
