import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import EntregaFlutuante from './src/components/EntregaFlutuante';
import { colors } from './src/theme';

function AppContent() {
  const [activeScreen, setActiveScreen] = useState('Lanches');
  const [footerHeight, setFooterHeight] = useState(110);
  const insets = useSafeAreaInsets();

  function navigate(screen) {
    Keyboard.dismiss();
    setActiveScreen(screen);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.app} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header activeScreen={activeScreen} onNavigate={navigate} />
        <View style={[styles.content, { paddingBottom: footerHeight }]}>
          {activeScreen === 'Lanches' && <ListaProdutos />}
          {activeScreen === 'Sobre Nós' && <SobreNos />}
          {activeScreen === 'Contato' && <Contato />}
        </View>
        <EntregaFlutuante bottomInset={insets.bottom} onLayout={(event) => setFooterHeight(event.nativeEvent.layout.height)} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  return <SafeAreaProvider><AppContent /></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  app: { flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center' },
  content: { flex: 1 },
});
