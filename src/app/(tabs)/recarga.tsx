import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BotaoCustomizado } from "../components/BotaoCustomizado";
import { ModalInlineCartao } from "../modal/ModalInlineCartao";
import { ModalInlinePix } from "../modal/ModalInlinePix";

interface RecargaProps {
  userEmail?: string;
}

export default function Recarga({ userEmail = 'usuario1@teste.com' }: RecargaProps) {
  const [modalInlinePix, setModalInlinePix] = useState<boolean>(false);
  const [modalInlineCartao, setModalInlineCartao] = useState<boolean>(false);

  const [saldoAtual, setSaldoAtual] = useState(0);
  const [valorInput, setValorInput] = useState("");
  const [cartao,setCartao] = useState("");

  const STORAGE_KEY = `@saldo_passe:${userEmail}`;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((res) => {
      if (res !== null) {
        setSaldoAtual(parseFloat(res));
      } else {
        setSaldoAtual(0.0);
      }
    });
  }, [userEmail]);

  const handleRecarga = async () => {
    const recarga = parseFloat(valorInput.replace(',','.'));

    if (!recarga || recarga <= 0){
        Alert.alert('Insira um valor válido!')
        return
    }

    if (cartao.length !== 4) {
        Alert.alert('Insira um formato válido de cartão!')
        return
    }

    const saldoNovo = saldoAtual + recarga;
    setSaldoAtual(saldoNovo);

    await AsyncStorage.setItem(STORAGE_KEY, saldoNovo.toString());
    setValorInput('');
    setCartao('');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Recarga do passe</Text>
        <View style={styles.saldoContainer}>
          <Text style={styles.subtitle}>Saldo Atual</Text>
          {/* aqui vai ser o saldo do usuário, que será puxado do banco de dados, por uma variável,
                    que irá ser alimentada de acorodo com o que o usuário for recarregando,
                    e também com o que ele for gastando, que será puxado do banco de dados */}
          <Text style={styles.saldo}>R$ {saldoAtual.toFixed(2).replace('.',',')}</Text>
          {/* //aqui vai ser uma conta, que calculará quantas viajens o usuário poderá fazer
                     com o saldo atual, que será puxado do banco de dados, por uma variável,
                    //que irá ser alimentada de acorodo com o que o usuário for recarregando,
                    //  e também com o que ele for gastando, que será puxado do banco de dados */}
          <Text style={styles.subtitle}>Sufuciente para {Math.floor(saldoAtual/2)} viagens de R$ 2,00</Text>
        </View>
        {/* Vai passar o valor digitado pelo usuário e adicionar ao saldo */}
        <View style={styles.recargaContainer}>
          <Text style={styles.label}>Digite o número do seu passe</Text>
          <TextInput value={cartao} placeholder="(4 dígitos atrás do cartão)" onChangeText={setCartao} style={styles.input} />
          <Text style={styles.label}>Digite o valor da recarga</Text>
          <TextInput value={valorInput} placeholder="Digite o valor da recarga" style={styles.input} onChangeText={setValorInput}/>
        </View>
        <View style={styles.pagamentoContainer}>
          <Text style={styles.labelBold}> Método de pagamento</Text>
          <View style={styles.pixCartaoContainer}>
            <BotaoCustomizado title="Pix" onPress={() => setModalInlinePix(true)} />

            <ModalInlinePix valor={valorInput} visivel={modalInlinePix} aoFechar={() => setModalInlinePix(false)} />
            <BotaoCustomizado title="Cartão de Crédito" onPress={() => setModalInlineCartao(true)} />

            <ModalInlineCartao valor={valorInput} visivel={modalInlineCartao} aoFechar={() => setModalInlineCartao(false)} />
          </View>

          <View>
            <TouchableOpacity activeOpacity={0.7} style={styles.buttonConfirma} onPress={handleRecarga}>
              <Text style={styles.buttonTextConfirma}>CONFIRMAR RECARGA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F4FA ",
  },
  title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 35,
    color: "#a81f6b",
    marginLeft: 8,
    marginTop: 65,
  },
  saldoContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#8D1A5C",
    borderRadius: 25,
    padding: 20,
    width: 360,
    height: 170,
    marginTop: 20,
  },
  saldo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 40,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#141314",
    marginBottom: 5,
  },
  labelBold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 19,
    color: "#141314",
    marginTop: 5,
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
  recargaContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#E8E4EE",
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
  },
  pixCartaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  pagamentoContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#E8E4EE",
    borderRadius: 25,
    padding: 20,
    marginTop: 30,
    width: 360,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#E8E4EE",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    width: 150,
    borderColor: "#8D1A5C",
    borderWidth: 3,
  },
  buttonConfirma: {
    width: 320,
    backgroundColor: "#8D1A5C",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
  },
  buttonTextConfirma: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#8D1A5C",
    textAlign: "center",
  },
});
