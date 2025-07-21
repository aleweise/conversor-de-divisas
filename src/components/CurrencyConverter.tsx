import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';
import { useCurrencyData } from '@/hooks/useCurrencyData';
import { Currency } from '@/lib/currencies';

export function CurrencyConverter() {
  const { rates, loading, error, lastUpdated, supportedCurrencies } = useCurrencyData();
  
  const [amount, setAmount] = useState<number | string>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USDT');
  const [toCurrency, setToCurrency] = useState<string>('BOB');
  const [convertedAmount, setConvertedAmount] = useState<number | string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (rates && amount !== '') {
      const numAmount = parseFloat(amount as string);
      if (isNaN(numAmount) || numAmount <= 0) {
        setConvertedAmount('');
        return;
      }
      
      let result = 0;
      
      if (fromCurrency === toCurrency) {
        result = numAmount;
      } else {
        // Buscar tasa directa primero
        const directRate = rates[`${fromCurrency}_${toCurrency}`];
        if (directRate) {
          result = numAmount * directRate;
        } else {
          // Lógica de conversión específica
          if (fromCurrency === 'USDT' && toCurrency === 'BOB') {
            // USDT a BOB - usar tasa específica de mercado
            result = numAmount * (rates['USDT_BOB'] || 14.60);
          } else if (fromCurrency === 'BOB' && toCurrency === 'USDT') {
            // BOB a USDT - usar tasa específica de retiro
            result = numAmount * (rates['BOB_USDT'] || (1 / 14.15));
          } else {
            // Conversión general a través de USD
            const fromRate = rates[fromCurrency];
            const toRate = rates[toCurrency];
            
            if (fromRate && toRate) {
              const isCryptoFrom = ['BTC', 'ETH', 'USDT'].includes(fromCurrency);
              const isCryptoTo = ['BTC', 'ETH', 'USDT'].includes(toCurrency);
              
              if (isCryptoFrom && !isCryptoTo) {
                // Crypto a Fiat: precio_crypto_usd * cantidad / tasa_fiat_por_usd
                result = (numAmount * fromRate) * toRate;
              } else if (!isCryptoFrom && isCryptoTo) {
                // Fiat a Crypto: cantidad / tasa_fiat_por_usd / precio_crypto_usd
                result = numAmount / toRate / fromRate;
              } else if (isCryptoFrom && isCryptoTo) {
                // Crypto a Crypto: (cantidad * precio_from_usd) / precio_to_usd
                result = (numAmount * fromRate) / toRate;
              } else {
                // Fiat a Fiat: cantidad / tasa_from_por_usd * tasa_to_por_usd
                result = (numAmount / fromRate) * toRate;
              }
            }
          }
        }
      }
      
      if (result > 0) {
        setConvertedAmount(result.toLocaleString('es-BO', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: result < 1 ? 8 : 4 
        }));
      } else {
        setConvertedAmount('No disponible');
      }
    } else {
      setConvertedAmount('');
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const exchangeRateText = useMemo(() => {
    if (rates && fromCurrency !== toCurrency) {
      // Buscar tasa directa primero
      const directRate = rates[`${fromCurrency}_${toCurrency}`];
      if (directRate) {
        return `1 ${fromCurrency} = ${directRate.toLocaleString('es-BO', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: directRate < 1 ? 8 : 4 
        })} ${toCurrency}`;
      }
      
      // Casos específicos para USDT-BOB
      if (fromCurrency === 'USDT' && toCurrency === 'BOB') {
        const rate = rates['USDT_BOB'] || 14.60;
        return `1 USDT = ${rate.toLocaleString('es-BO', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })} BOB (Compra)`;
      } else if (fromCurrency === 'BOB' && toCurrency === 'USDT') {
        const rate = rates['BOB_USDT'] || (1 / 14.15);
        return `1 BOB = ${rate.toLocaleString('es-BO', { 
          minimumFractionDigits: 6, 
          maximumFractionDigits: 6 
        })} USDT (Retiro)`;
      }
      
      // Calcular a través de USD para otros casos
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      
      if (fromRate && toRate) {
        const isCryptoFrom = ['BTC', 'ETH', 'USDT'].includes(fromCurrency);
        const isCryptoTo = ['BTC', 'ETH', 'USDT'].includes(toCurrency);
        
        let rate = 0;
        if (isCryptoFrom && !isCryptoTo) {
          rate = fromRate * toRate;
        } else if (!isCryptoFrom && isCryptoTo) {
          rate = 1 / (toRate * fromRate);
        } else if (isCryptoFrom && isCryptoTo) {
          rate = fromRate / toRate;
        } else {
          rate = toRate / fromRate;
        }
        
        return `1 ${fromCurrency} = ${rate.toLocaleString('es-BO', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: rate < 1 ? 8 : 4 
        })} ${toCurrency}`;
      }
    }
    return fromCurrency === toCurrency ? `1 ${fromCurrency} = 1 ${toCurrency}` : 'Calculando...';
  }, [fromCurrency, toCurrency, rates]);

  const renderCurrencySelect = (
    value: string,
    onChange: (value: string) => void,
    placeholder: string
  ) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-12 text-base">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {supportedCurrencies.map((currency: Currency) => (
          <SelectItem key={currency.code} value={currency.code} className="py-3">
            <div className="flex items-center gap-3">
              {currency.logo && (
                <img 
                  src={currency.logo} 
                  alt={currency.name} 
                  className="w-6 h-6 rounded-full object-cover border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{currency.code}</span>
                <span className="text-xs text-muted-foreground">{currency.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (loading && !rates) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-2xl">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardHeader>
        <CardContent className="grid gap-6">
          <Skeleton className="h-12 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-12 flex-1" />
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-destructive/10 border-destructive/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            Error de Conexión
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-2">No se pudieron cargar las tasas de cambio.</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 bg-card/50 backdrop-blur">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Convertidor de Divisas
        </CardTitle>
        <CardDescription className="text-base">
          {lastUpdated ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Actualizado: {lastUpdated.toLocaleTimeString('es-ES')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Actualizando datos...
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="amount" className="text-base font-medium">Monto a convertir</Label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Ingresa el monto (ej: 100)"
            className="text-xl h-12 text-center font-semibold"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-2 flex-1">
            <Label className="text-base font-medium">Desde</Label>
            {renderCurrencySelect(fromCurrency, setFromCurrency, "Seleccionar moneda origen")}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="mt-6 h-10 w-10 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handleSwapCurrencies}
            aria-label="Intercambiar monedas"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          <div className="grid gap-2 flex-1">
            <Label className="text-base font-medium">Hacia</Label>
            {renderCurrencySelect(toCurrency, setToCurrency, "Seleccionar moneda destino")}
          </div>
        </div>
        <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-medium">{Number(amount || 0).toLocaleString('es-BO')}</span>
            <span className="text-lg font-bold text-primary">{fromCurrency}</span>
            <span className="text-muted-foreground">=</span>
          </div>
          <div className="mb-3">
            <p className="text-4xl font-bold text-primary break-all">
              {convertedAmount || (loading ? 'Cargando...' : 'Ingresa un monto')}
            </p>
            <p className="text-xl font-semibold text-muted-foreground">{toCurrency}</p>
          </div>
          <div className="text-sm text-muted-foreground bg-background/50 p-2 rounded-lg">
            <p>{exchangeRateText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
