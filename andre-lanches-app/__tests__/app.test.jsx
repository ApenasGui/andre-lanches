import { Alert, Linking } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import App from '../App';
import { formatPrice } from '../src/formatPrice';

afterEach(() => jest.restoreAllMocks());

test('navega entre as três telas e retorna ao cardápio', async () => {
  await render(<App />);
  expect(screen.getAllByTestId(/^product-/)).toHaveLength(9);
  await fireEvent.press(screen.getByRole('tab', { name: 'Sobre Nós' }));
  expect(screen.getByText('Nossa história')).toBeTruthy();
  await fireEvent.press(screen.getByRole('tab', { name: 'Contato' }));
  expect(screen.getByLabelText('E-mail')).toBeTruthy();
  await fireEvent.press(screen.getByRole('tab', { name: 'Lanches' }));
  expect(screen.getAllByTestId(/^product-/)).toHaveLength(9);
});

test('filtra os produtos sem perder itens ao retornar para Todos', async () => {
  await render(<App />);
  for (const [category, count] of [['lanches', 5], ['porções', 2], ['bebidas', 2], ['todos', 9]]) {
    await fireEvent.press(screen.getByRole('button', { name: `Filtrar ${category}` }));
    expect(screen.getAllByTestId(/^product-/)).toHaveLength(count);
  }
  expect(formatPrice(1.5).replace(/\s/g, ' ')).toBe('R$ 1,50');
  expect(formatPrice(9.9).replace(/\s/g, ' ')).toBe('R$ 9,90');
});

test('valida formulário vazio e e-mail inválido, e confirma o envio demonstrativo', async () => {
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await render(<App />);
  await fireEvent.press(screen.getByRole('tab', { name: 'Contato' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Enviar mensagem ↗' }));
  expect(screen.getByText('Informe seu nome com pelo menos 2 caracteres.')).toBeTruthy();
  expect(screen.getByText('Informe um e-mail válido.')).toBeTruthy();
  await fireEvent.changeText(screen.getByLabelText('Nome'), 'Cliente Teste');
  await fireEvent.changeText(screen.getByLabelText('E-mail'), 'invalido');
  await fireEvent.changeText(screen.getByLabelText('Mensagem'), 'Gostaria de conhecer o cardápio.');
  await fireEvent.press(screen.getByRole('button', { name: 'Enviar mensagem ↗' }));
  expect(alert).not.toHaveBeenCalledWith('Mensagem recebida — demonstração', expect.anything());
  await fireEvent.changeText(screen.getByLabelText('E-mail'), 'cliente@example.com');
  await fireEvent.press(screen.getByRole('button', { name: 'Enviar mensagem ↗' }));
  expect(alert).toHaveBeenCalledWith('Mensagem recebida — demonstração', expect.stringContaining('Nenhum dado foi enviado'));
  expect(screen.getByLabelText('Nome').props.value).toBe('');
});

test('abre o discador com o telefone fornecido', async () => {
  const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  await render(<App />);
  await fireEvent.press(screen.getByRole('button', { name: 'Ligar para André Lanches' }));
  await waitFor(() => expect(openURL).toHaveBeenCalledWith('tel:+5561999998888'));
});

test('mostra telefone e permite nova tentativa quando o discador falha', async () => {
  const openURL = jest.spyOn(Linking, 'openURL').mockRejectedValueOnce(new Error('Sem discador')).mockResolvedValue(undefined);
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  await render(<App />);
  await fireEvent.press(screen.getByRole('button', { name: 'Ligar para André Lanches' }));
  await waitFor(() => expect(screen.getByText('Discador indisponível. Telefone: (61) 99999-8888.')).toBeTruthy());
  expect(alert).toHaveBeenCalledWith('Discador indisponível', expect.stringContaining('(61) 99999-8888'));
  await fireEvent.press(screen.getByRole('button', { name: 'Ligar para André Lanches' }));
  await waitFor(() => expect(openURL).toHaveBeenCalledTimes(2));
});
