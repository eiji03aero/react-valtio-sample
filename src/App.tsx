import { PrimeReactProvider } from "primereact/api";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "primereact/resources/themes/lara-dark-blue/theme.css";

import { RegistryProvider } from "./contexts/RegistryContext";
import { Root } from "./ui/Root";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegistryProvider queryClient={queryClient}>
        <PrimeReactProvider>
          <Root />
        </PrimeReactProvider>
      </RegistryProvider>
    </QueryClientProvider>
  );
}

export default App;
