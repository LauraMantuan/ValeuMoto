import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useState } from "react";

import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const estadoInicial = {
  nome: "",
  sobrenome: "",
  email: "",
  telefone: "",
  assunto: "",
  descricao: "",
};

export default function Sugestoes() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [form, setForm] = useState(estadoInicial);

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  const handleChange = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleEnviar = () => {
    if (Object.values(form).some((valor) => valor.trim() === "")) {
      Alert.alert("Alerta", "Existe campos nulos que devem ser preenchidos!");
      return;
    }
    Alert.alert("Reclamação", "Sua reclamação foi enviada, agradecemos sua opinião!");
    setForm(estadoInicial);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}> Cadastrar Sugestão</Text>
        <View>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={styles.input}
            value={form.nome}
            onChangeText={(val) => handleChange("nome", val)}
          />

          <Text style={styles.label}>Sobrenome</Text>
          <TextInput
            placeholder="Digite seu sobrenome"
            style={styles.input}
            value={form.sobrenome}
            onChangeText={(val) => handleChange("sobrenome", val)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Digite seu email"
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => handleChange("email", val)}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            placeholder="Digite seu telefone"
            style={styles.input}
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={(val) => handleChange("telefone", val)}
          />

          <Text style={styles.label}>Assunto</Text>
          <TextInput
            placeholder="Digite o assunto"
            style={styles.input}
            value={form.assunto}
            onChangeText={(val) => handleChange("assunto", val)}
          />

          <Text style={styles.label}>Descrição da reclamação</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Digite a descrição da reclamação"
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            value={form.descricao}
            onChangeText={(val) => handleChange("descricao", val)}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F1F4FA",
  },
  input: {
    width: 320,
    height: 50,
    borderColor: "#060506",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000000",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 33,
    color: "#E0007A",
    marginBottom: 20,
    marginTop: 65,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#141314",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#E0007A",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    minWidth: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "#f1e1e1",
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 16,
    textAlign: "center",
  },
});
