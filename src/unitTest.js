import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MainComponent from './components/MainComponent';
import FormComponent from './components/FormComponent';
import DataComponent from './components/DataComponent';
import InputComponent from './components/InputComponent';
import ButtonComponent from './components/ButtonComponent';

jest.mock('axios');

// Test 1: Component Rendering
test('renders MainComponent without crashing', () => {
  render(<MainComponent />);
});

// Test 2: Form Submission
test('form submits successfully', () => {
  render(<FormComponent />);
  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);
  expect(screen.getByText('Submission successful')).toBeInTheDocument();
});

// Test 3: API Call Mock
test('fetches data from API', async () => {
  axios.get.mockResolvedValue({ data: { results: ['item1', 'item2'] } });
  render(<DataComponent />);
  const items = await screen.findAllByText(/item/i);
  expect(items.length).toBe(2);
});

// Test 4: Input Field Update
test('updates input value', () => {
  render(<InputComponent />);
  const input = screen.getByPlaceholderText('Enter value');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
});

// Test 5: Button Click State Change
test('button click changes state', () => {
  render(<ButtonComponent />);
  const button = screen.getByText('Click me');
  fireEvent.click(button);
  expect(screen.getByText('Clicked')).toBeInTheDocument();
});


