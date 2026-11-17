import { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

export const phoneNumber = '+5561999998888';

export default function EntregaFlutuante({ bottomInset = 0, onLayout }) {
  const [opening, setOpening] = useState(false);
  const [failed, setFailed] = useState(false);

  async function openDialer() {
    if (opening) return;
    setOpening(true);
    setFailed(false);
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      console.warn('[Entrega] Não foi possível abrir o discador.', error);
      setFailed(true);
      Alert.alert('Discador indisponível', 'Ligue para (61) 99999-8888 usando um aparelho com suporte a chamadas.');
    } finally {
      setOpening(false);
    }
  }

  return (
    <View onLayout={onLayout} style={[styles.container, { paddingBottom: bottomInset + 12 }]}>
      {failed && <Text accessibilityRole="alert" style={styles.error}>Discador indisponível. Telefone: (61) 99999-8888.</Text>}
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Ligar para André Lanches"
        accessibilityHint="Abre o discador com o número (61) 99999-8888"
        accessibilityState={{ disabled: opening }} disabled={opening} onPress={openDialer}
        style={[styles.button, opening && styles.disabled]} activeOpacity={0.8}>
        <Text style={styles.icon} accessible={false}>☎</Text>
        <View style={styles.copy}><Text style={styles.title}>{opening ? 'Abrindo discador…' : 'Bateu a fome? Ligue!'}</Text><Text style={styles.phone}>(61) 99999-8888 · Pedidos e entrega</Text></View>
        <Text style={styles.arrow} accessible={false}>↗</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border },
  button: { backgroundColor: colors.teal, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, minHeight: 68, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 8 },
  disabled: { opacity: 0.7 },
  icon: { color: colors.background, fontSize: 28 },
  copy: { flex: 1, gap: 4 },
  title: { color: colors.background, fontSize: 16, fontWeight: '900' },
  phone: { color: colors.background, fontSize: 11 },
  arrow: { color: colors.background, fontSize: 23 },
  error: { color: colors.coral, fontSize: 12, marginBottom: 8 },
});
