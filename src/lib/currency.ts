import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Base rate relative to INR
}

export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 0.011 },
  { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.0097 },
  { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.0083 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 0.014 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 0.015 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 1.5 },
];

interface CurrencyState {
  selectedCurrency: string;
  setCurrency: (currencyCode: string) => void;
  getCurrency: () => Currency;
  formatPrice: (priceInINR: number) => string;
  getExchangeRate: () => number;
  fetchLiveRates: () => Promise<void>;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selectedCurrency: 'INR',

      setCurrency: (currencyCode: string) => {
        set({ selectedCurrency: currencyCode });
      },

      getCurrency: () => {
        const { selectedCurrency } = get();
        return currencies.find(c => c.code === selectedCurrency) || currencies[0];
      },

      formatPrice: (priceInINR: number) => {
        const currency = get().getCurrency();
        const convertedPrice = priceInINR * currency.exchangeRate;
        if (currency.code === 'INR') return `₹${convertedPrice.toFixed(0)}`;
        if (currency.code === 'JPY') return `¥${convertedPrice.toFixed(0)}`;
        return `${currency.symbol}${convertedPrice.toFixed(2)}`;
      },

      getExchangeRate: () => get().getCurrency().exchangeRate,

      // ✅ New function: Fetch real-time exchange rates from free API
      fetchLiveRates: async () => {
        try {
          const response = await fetch('https://api.exchangerate.host/latest?base=INR');
          const data = await response.json();
          const updatedCurrencies = currencies.map(c => ({
            ...c,
            exchangeRate: data.rates[c.code] ? 1 / data.rates[c.code] : c.exchangeRate,
          }));
          // replace the local rates (without breaking old references)
          updatedCurrencies.forEach(u => {
            const index = currencies.findIndex(c => c.code === u.code);
            if (index !== -1) currencies[index].exchangeRate = u.exchangeRate;
          });
        } catch (error) {
          console.error('Error fetching live exchange rates:', error);
        }
      },
    }),
    { name: 'chalk-canva-currency' }
  )
);
