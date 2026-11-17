import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { formatPrice } from '../formatPrice';

export default function BannerPromocao({ title, description, price }) {
  return (
    <LinearGradient colors={[colors.purple, colors.wine]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
      <Text style={styles.label}>✦ COMBO DO CARDÁPIO</Text>
      <Text accessibilityRole="header" style={styles.title}>{title}</Text>
      <View style={styles.bottom}><Text style={styles.description}>{description}</Text><Text style={styles.price}>{formatPrice(price)}</Text></View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: { borderRadius: 20, padding: 22, gap: 9 },
  label: { color: colors.sun, fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  bottom: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  description: { color: colors.text, fontSize: 13, lineHeight: 20, flexGrow: 1, flexBasis: 140 },
  price: { color: colors.sun, fontSize: 30, fontWeight: '900' },
});
