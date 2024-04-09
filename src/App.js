import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import ProductList from './pages/ProductList';

function App() {
  return (
    <ChakraProvider>
      <ProductList />

    </ChakraProvider>

  );
}

export default App;
