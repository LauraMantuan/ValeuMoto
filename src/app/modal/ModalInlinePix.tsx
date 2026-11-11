import { Modal, StyleSheet, Text, View } from "react-native";

interface ModalInlinePixProps {
  visivel: boolean;
  valor: string;
  aoFechar: () => void;
}

export function ModalInlinePix({ visivel, aoFechar, valor }: ModalInlinePixProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visivel} onRequestClose={aoFechar}>
      <View style={styles.modalOverlay}>
        <View style={styles.pixContainer}>
          {/* No pontilhado vai estar o número que o cliente digitou no input   */}
          <Text style={styles.labelTitle}>
            {!valor ? "Insira um valor para recarga" : `Recarregue R$ ${parseFloat(valor).toFixed(2).replace(".", ",")} com o código Pix abaixo:`}
          </Text>
          <View style={styles.CodigoPixContainer}>
            <Text style={styles.label}>00020126BR.GOV.BCB.PIX-valeumoto-519r5n98-15.00 </Text>
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
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#141314",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
  CodigoPixContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#d0cfd1",
    borderRadius: 25,
    padding: 20,
    marginTop: 10,
    width: 320,
    marginBottom: 25,
  },
});
