import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, tabs } from '../theme';

export default function Header({ activeScreen, onNavigate }) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} accessibilityLabel="Logo do André Lanches" />
        <View><Text style={styles.name}>ANDRÉ<Text style={styles.dot}>.</Text></Text><Text style={styles.subtitle}>LANCHES • VIBE TROPICAL</Text></View>
      </View>
      <View style={styles.tabs} accessibilityRole="tablist">
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => onNavigate(tab)} accessibilityRole="tab"
            accessibilityState={{ selected: activeScreen === tab }}
            style={[styles.tab, activeScreen === tab && styles.selected]} activeOpacity={0.75}>
            <Text style={[styles.tabText, activeScreen === tab && styles.selectedText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  logo: { width: 42, height: 42, resizeMode: 'contain' },
  name: { color: colors.text, fontSize: 26, fontWeight: '900', letterSpacing: -1 },
  dot: { color: colors.coral },
  subtitle: { color: colors.coral, fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, minHeight: 46, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 12, backgroundColor: colors.surface },
  selected: { backgroundColor: colors.teal },
  tabText: { color: colors.muted, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  selectedText: { color: colors.background },
});
