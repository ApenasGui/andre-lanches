import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

export default function SobreNos() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>ESSA É A NOSSA VIBE</Text>
      <Text accessibilityRole="header" style={styles.title}>Sabor que vira{ '\n' }ponto de encontro.</Text>
      <Image source={require('../../assets/images/xsalada.jpg')} accessibilityLabel="X-Salada do nosso cardápio" style={styles.image} />
      <Text style={styles.heading}>Nossa história</Text>
      <Text style={styles.paragraph}>Toda boa história pode começar com uma mesa, uma conversa e um lanche. É esse encontro que inspira o André Lanches: a pausa depois de um dia cheio, a turma reunida e a vontade de repetir um momento bom.</Text>
      <Text style={styles.paragraph}>A gente acredita que um clássico pode ganhar novas cores sem perder sua essência. Por isso, nosso cardápio encontra o clima tropical: pôr do sol, luzes de neon e espaço para cada pessoa escolher seu favorito.</Text>
      <LinearGradient colors={[colors.purple, colors.wine]} style={styles.mission}>
        <Text style={styles.kickerLight}>NOSSA MISSÃO</Text>
        <Text style={styles.missionText}>Transformar a hora da fome em uma pausa gostosa no seu dia.</Text>
      </LinearGradient>
      <Text style={styles.heading}>O que faz a nossa vibe</Text>
      {[
        ['01', 'Clássicos com personalidade', 'Do X-Salada ao Big Tower, uma escolha para cada tamanho de fome.'],
        ['02', 'Conversa sem complicação', 'Cardápio claro e contato por telefone para combinar seu pedido.'],
        ['03', 'Um toque tropical', 'Cores quentes, energia leve e sabor como ponto de encontro.'],
      ].map(([number, title, text]) => (
        <View key={number} style={styles.value}><Text style={styles.number}>{number}</Text><View style={styles.valueContent}><Text style={styles.valueTitle}>{title}</Text><Text style={styles.paragraph}>{text}</Text></View></View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, gap: 18 },
  kicker: { color: colors.teal, fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 34, fontWeight: '900', lineHeight: 39, letterSpacing: -1 },
  image: { width: '100%', maxWidth: 320, height: 320, alignSelf: 'center', borderRadius: 22, resizeMode: 'cover' },
  heading: { color: colors.coral, fontSize: 22, fontWeight: '800', marginTop: 8 },
  paragraph: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  mission: { padding: 24, borderRadius: 22, gap: 12 },
  kickerLight: { color: colors.sun, fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  missionText: { color: colors.text, fontSize: 24, fontWeight: '700', lineHeight: 32 },
  value: { flexDirection: 'row', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 18 },
  number: { color: colors.teal, fontSize: 24, fontWeight: '900' },
  valueContent: { flex: 1, gap: 6 },
  valueTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
});
