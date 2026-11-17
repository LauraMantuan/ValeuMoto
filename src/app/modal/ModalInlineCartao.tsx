import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

interface ModalInlineCartaoProps {
  visivel: boolean;
  aoFechar: () => void;
  valor: string;
}

export function ModalInlineCartao({ visivel, aoFechar, valor }: ModalInlineCartaoProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visivel} onRequestClose={aoFechar}>
      <View style={styles.modalOverlay}>
        <View style={styles.pixContainer}>
          {/* No pontilhado vai estar o número que o cliente digitou no input   */}
          <Text style={styles.labelTitle}> {!valor ? 'Insira um valor para recarga' : `Recarregue R$ ${parseFloat(valor).toFixed(2).replace('.',',')} com seu cartão de crédito!`} </Text>
          <Text style={styles.labelTitle2}> Insira as informações abaixo: </Text>

          <TextInput placeholder="Digite o número do cartão" style={styles.input} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput placeholder="MM/AA" style={styles.inputMenor} />

            <TextInput placeholder="CVV" style={styles.inputMenor} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: "#111827",
    fontFamily: "Inter_700Bold",
  },
  modalText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_400Regular",
  },
  pixContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#E8E4EE",
    borderRadius: 25,
    padding: 20,
    marginTop: 30,
    borderWidth: 2.5,
    borderColor: "#8D1A5C",
    borderStyle: "dashed",
    width: 370,
  },
  labelTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#141314",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
    fontStyle: "italic",
  },
  labelTitle2: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#141314",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
    marginTop: 23,
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
  inputMenor: {
    width: 150,
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
});
