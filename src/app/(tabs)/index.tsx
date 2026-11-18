
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';

const videos = {
  Todas: require('../../../assets/gifs/gifsTodasLinhas.mp4'),
  'Cidade Nova': require('../../../assets/gifs/gifCidadeNova.mp4'),
  Facciolo: require('../../../assets/gifs/gifFacciolo.mp4'),
  'Leonor Mendes': require('../../../assets/gifs/gifLeonorMendes.mp4'),
};

export default function Mapa() {
  const [linhaSelecionada, setLinhaSelecionada] = useState('Todas');

  const player = useVideoPlayer(videos.Todas, (player) => {
    player.loop = true;
    player.play();
  });

  function mudarLinha(linha: keyof typeof videos) {
    setLinhaSelecionada(linha);
    player.replace(videos[linha]);
    player.play();
  }

  return (
    <View style={styles.container}>

      <View style={styles.conteudo}>

      
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.voltar}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Mapa em tempo real</Text>
        </View>

      
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.linhas}
          contentContainerStyle={styles.linhasConteudo}
        >
          {(Object.keys(videos) as (keyof typeof videos)[]).map((linha) => (
            <TouchableOpacity
              key={linha}
              style={[
                styles.botaoLinha,
                linhaSelecionada === linha && styles.botaoSelecionado,
              ]}
              onPress={() => mudarLinha(linha)}
            >
              <Text
                style={[
                  styles.textoLinha,
                  linhaSelecionada === linha && styles.textoSelecionado,
                ]}
              >
                {linha}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      
        <View style={styles.mapaContainer}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="contain"
            nativeControls={false}
          />
        </View>

        
        <View style={styles.informacao}>
          <Text style={styles.textoInformacao}>
            Toque em uma parada para ver as chegadas.
            {'\n'}
            Simulação acelerada para demonstração.
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5fa',
    justifyContent: 'center',
  },

  conteudo: {
    flex: 1,
    marginTop: 65,
    marginBottom: 15,
  },

  header: {
    height: 65,
    backgroundColor: '#b51b75',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    gap: 20,
  },

  voltar: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },

  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  linhas: {
    flexGrow: 0,
    marginTop: 30,
    marginBottom: 10,
  },

  linhasConteudo: {
    paddingHorizontal: 15,
    gap: 8,
  },

  botaoLinha: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#dedee5',
  },

  botaoSelecionado: {
    backgroundColor: '#242631',
    borderColor: '#242631',
  },

  textoLinha: {
    color: '#292936',
    fontSize: 12,
    fontWeight: '600',
  },

  textoSelecionado: {
    color: '#fff',
  },

  mapaContainer: {
    marginHorizontal: 8,
    marginTop: 15,
    flex: 1,
    backgroundColor: '#f5f5fa',
    overflow: 'hidden',
    borderRadius: 20,
  },

  video: {
    width: '100%',
    height: '100%',
  },

  informacao: {
    marginTop: 15,
    marginBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  textoInformacao: {
    fontSize: 13,
    color: '#858590',
    textAlign: 'center',
    lineHeight: 21,
  },
});
