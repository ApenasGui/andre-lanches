import { useState } from 'react';
import { Animated, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BannerPromocao from './BannerPromocao';
import { colors } from '../theme';
import { products } from '../data/products';
import { formatPrice } from '../formatPrice';

const categories = ['Todos', 'Lanches', 'Porções', 'Bebidas'];

export default function ListaProdutos() {
  const [category, setCategory] = useState('Todos');
  const [heroMotion] = useState(() => new Animated.Value(0));
  const visibleProducts = category === 'Todos' ? products : products.filter((product) => product.category === category);

  function setHeroMotion(active) {
    Animated.spring(heroMotion, {
      toValue: active ? 1 : 0,
      useNativeDriver: Platform.OS !== 'web',
      speed: 20,
      bounciness: 7,
    }).start();
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Animated.View style={[styles.heroMotion, { transform: [
        { scale: heroMotion.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] }) },
        { translateY: heroMotion.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) },
      ] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Banner André Lanches. Toque para ver o cardápio."
          onPressIn={() => setHeroMotion(true)}
          onPressOut={() => setHeroMotion(false)}
          onHoverIn={() => setHeroMotion(true)}
          onHoverOut={() => setHeroMotion(false)}
        >
          <LinearGradient colors={[colors.purple, colors.wine, colors.coral]} style={styles.hero}>
            <View style={styles.sun} accessible={false} />
            <Text style={styles.eyebrow}>SABOR LOCAL. VIBE TROPICAL.</Text>
            <Text accessibilityRole="header" style={styles.title}>FOME DE{ '\n' }OUTRO NÍVEL.</Text>
            <Text style={styles.intro}>O sol se põe. A fome chega.</Text>
            <Image source={require('../../assets/images/bigtower.jpg')} accessibilityLabel="Hambúrguer Big Tower" style={styles.heroImage} />
            <View style={styles.heroTag}><Text style={styles.heroTagText}>SEU PRÓXIMO PIT STOP ↗</Text></View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
      <BannerPromocao title="X-Salada + Batata" description="Dupla boa demais pra deixar passar." price={9.9} />
      <View><Text style={styles.kicker}>ESCOLHA SEU FAVORITO</Text><Text accessibilityRole="header" style={styles.heading}>Nosso cardápio<Text style={styles.coral}>.</Text></Text></View>
      <View style={styles.filters}>
        {categories.map((item) => (
          <TouchableOpacity key={item} accessibilityRole="button" accessibilityLabel={`Filtrar ${item.toLowerCase()}`}
            accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)}
            style={[styles.filter, category === item && styles.activeFilter]}>
            <Text style={[styles.filterText, category === item && styles.activeFilterText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.count} accessibilityLiveRegion="polite">{visibleProducts.length} opções para sua fome</Text>
      {visibleProducts.map((product) => (
        <View key={product.id} style={styles.card} testID={`product-${product.id}`}>
          <Image source={product.image} accessibilityLabel={product.name} style={styles.productImage} />
          <View style={styles.details}>
            <Text style={styles.category}>{product.category.toUpperCase()}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </View>
      ))}
      <Text style={styles.note}>Consulte ingredientes, sabores, disponibilidade e condições de entrega por telefone.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 20 },
  heroMotion: { borderRadius: 26, zIndex: 1 },
  hero: { borderRadius: 26, padding: 24, overflow: 'hidden' },
  sun: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: colors.sun, top: 112, right: -40, opacity: 0.6 },
  eyebrow: { color: colors.sun, fontSize: 9, letterSpacing: 1.6, fontWeight: '800' },
  title: { color: colors.text, fontSize: 39, fontWeight: '900', lineHeight: 42, letterSpacing: -1.5, marginTop: 16 },
  intro: { color: colors.text, fontSize: 13, marginTop: 12 },
  heroImage: { width: '100%', height: 168, borderRadius: 18, marginTop: 22, resizeMode: 'cover', transform: [{ rotate: '-3deg' }] },
  heroTag: { alignSelf: 'flex-start', marginTop: 20, backgroundColor: colors.background, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 8 },
  heroTagText: { color: colors.teal, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  kicker: { color: colors.coral, fontSize: 10, fontWeight: '700', letterSpacing: 2, marginTop: 8 },
  heading: { color: colors.text, fontSize: 29, fontWeight: '800', letterSpacing: -1, marginTop: 5 },
  coral: { color: colors.coral },
  filters: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  filter: { borderRadius: 24, paddingHorizontal: 15, minHeight: 44, justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  activeFilter: { backgroundColor: colors.teal, borderColor: colors.teal },
  filterText: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  activeFilterText: { color: colors.background },
  count: { color: colors.muted, fontSize: 12 },
  card: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 18, padding: 12, gap: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  productImage: { width: 92, height: 110, borderRadius: 12, resizeMode: 'cover', backgroundColor: colors.slate },
  details: { flex: 1, gap: 5 },
  category: { color: colors.teal, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  productName: { color: colors.text, fontSize: 19, fontWeight: '800' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  price: { color: colors.coral, fontSize: 19, fontWeight: '800', marginTop: 3 },
  note: { color: colors.muted, fontSize: 12, lineHeight: 19, textAlign: 'center' },
});
