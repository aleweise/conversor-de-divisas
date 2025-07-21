import { useState, useEffect } from 'react';
import { currencies, Currency } from '@/lib/currencies';
import { toast } from 'sonner';

interface Rates {
  [key: string]: number;
}

interface UseCurrencyDataReturn {
  rates: Rates | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  supportedCurrencies: Currency[];
}

export function useCurrencyData(): UseCurrencyDataReturn {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener tasas de cambio de múltiples fuentes
      const promises = [
        // 1. Obtener precios de criptomonedas en USD
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd'),
        // 2. Obtener tasas de cambio fiat vs USD
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
      ];

      const [cryptoResponse, fiatResponse] = await Promise.all(promises);
      
      if (!cryptoResponse.ok) {
        throw new Error(`Error al obtener precios de criptomonedas: ${cryptoResponse.status}`);
      }

      const cryptoData = await cryptoResponse.json();
      const finalRates: Rates = {};

      // Procesar precios de criptomonedas en USD
      if (cryptoData.bitcoin?.usd) finalRates['BTC'] = cryptoData.bitcoin.usd;
      if (cryptoData.ethereum?.usd) finalRates['ETH'] = cryptoData.ethereum.usd;
      if (cryptoData.tether?.usd) finalRates['USDT'] = cryptoData.tether.usd;

      // Procesar tasas fiat
      if (fiatResponse.ok) {
        const fiatData = await fiatResponse.json();
        if (fiatData.rates) {
          // Agregar tasas fiat (cuántas unidades de cada moneda por 1 USD)
          Object.entries(fiatData.rates).forEach(([code, rate]) => {
            finalRates[code] = rate as number;
          });
        }
      }

      // Tasas específicas para Bolivia (valores más precisos)
      // 1 USD = ~7.0 BOB (tasa oficial)
      // 1 USDT = ~14.60 BOB (tasa de mercado para compra)
      // 1 USDT = ~14.15 BOB (tasa de mercado para retiro)
      finalRates['BOB'] = 7.0; // BOB por USD (tasa oficial aproximada)
      
      // Tasas directas USDT <-> BOB
      finalRates['USDT_BOB'] = 14.60; // Tasa de compra USDT a BOB
      finalRates['BOB_USDT'] = 1 / 14.15; // Tasa de retiro BOB a USDT (inversa)

      // USD como base
      finalRates['USD'] = 1;

      console.log('Tasas cargadas:', finalRates);
      setRates(finalRates);
      setLastUpdated(new Date());
      toast.success('¡Tasas de cambio actualizadas!');

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        toast.error(`Error al obtener las tasas: ${e.message}`);
      } else {
        setError('Ocurrió un error desconocido');
        toast.error('Error al obtener las tasas: Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return { rates, loading, error, lastUpdated, supportedCurrencies: currencies };
}
