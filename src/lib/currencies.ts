export interface Currency {
  code: string;
  name: string;
  id: string; // CoinGecko API ID
  logo?: string; // Optional logo URL
}

export const currencies: Currency[] = [
  { code: 'BOB', name: 'Boliviano Boliviano', id: 'bolivian-boliviano', logo: 'https://flagcdn.com/w40/bo.png' },
  { code: 'USDT', name: 'Tether (USDT)', id: 'tether', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
  { code: 'USD', name: 'Dólar Estadounidense', id: 'united-states-dollar', logo: 'https://flagcdn.com/w40/us.png' },
  { code: 'BTC', name: 'Bitcoin', id: 'bitcoin', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { code: 'ETH', name: 'Ethereum', id: 'ethereum', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { code: 'EUR', name: 'Euro', id: 'euro', logo: 'https://flagcdn.com/w40/eu.png' },
  { code: 'ARS', name: 'Peso Argentino', id: 'argentine-peso', logo: 'https://flagcdn.com/w40/ar.png' },
  { code: 'BRL', name: 'Real Brasileño', id: 'brazilian-real', logo: 'https://flagcdn.com/w40/br.png' },
  { code: 'COP', name: 'Peso Colombiano', id: 'colombian-peso', logo: 'https://flagcdn.com/w40/co.png' },
  { code: 'PEN', name: 'Sol Peruano', id: 'peruvian-sol', logo: 'https://flagcdn.com/w40/pe.png' },
];
