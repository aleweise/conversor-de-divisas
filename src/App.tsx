import { CurrencyConverter } from '@/components/CurrencyConverter';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun, Coins } from 'lucide-react';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Coins className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Convertidor de Divisas</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </header>
      <main className="w-full">
        <CurrencyConverter />
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Potenciado por <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="underline">la API de CoinGecko</a>.</p>
        <p>Realizado por Alejandro Zbontar.</p>
      </footer>
    </div>
  );
}

export default App;
