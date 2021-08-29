import './App.css';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
