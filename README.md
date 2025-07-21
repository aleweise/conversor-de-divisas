# 💱 Conversor de Divisas

Un convertidor de divisas moderno y elegante construido con React, TypeScript y Tailwind CSS. Especializado en conversiones entre criptomonedas y monedas fiat, con soporte específico para el mercado boliviano.

![Conversor de Divisas](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## ✨ Características

- 🔄 **Conversión en tiempo real** entre criptomonedas y monedas fiat
- 🇧🇴 **Soporte específico para Bolivia** con tasas de mercado precisas
- 🌙 **Modo oscuro/claro** con persistencia de preferencias
- 📱 **Diseño responsivo** que funciona en todos los dispositivos
- ⚡ **Interfaz rápida** construida con Vite
- 🎨 **UI moderna** usando shadcn/ui y Radix UI
- 🔒 **TypeScript** para mayor seguridad de tipos

## 🚀 Monedas Soportadas

### Criptomonedas
- **USDT** (Tether)
- **BTC** (Bitcoin)
- **ETH** (Ethereum)

### Monedas Fiat
- **BOB** (Boliviano Boliviano) 🇧🇴
- **USD** (Dólar Estadounidense) 🇺🇸
- **EUR** (Euro) 🇪🇺
- **ARS** (Peso Argentino) 🇦🇷
- **BRL** (Real Brasileño) 🇧🇷
- **COP** (Peso Colombiano) 🇨🇴
- **PEN** (Sol Peruano) 🇵🇪

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework CSS utilitario
- **shadcn/ui** - Componentes de UI de alta calidad
- **Radix UI** - Primitivos de UI accesibles
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Lucide React** - Iconos modernos
- **Sonner** - Notificaciones toast

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/conversor-de-divisas.git
   cd conversor-de-divisas
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en `http://localhost:5173`

## 🔧 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la construcción de producción
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI (shadcn/ui)
│   ├── CurrencyConverter.tsx
│   └── ThemeProvider.tsx
├── hooks/              # Hooks personalizados
│   ├── use-toast.ts
│   └── useCurrencyData.ts
├── lib/                # Utilidades y configuraciones
│   ├── utils.ts
│   └── currencies.ts
├── App.tsx             # Componente principal
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🌐 APIs Utilizadas

- **CoinGecko API** - Para precios de criptomonedas
- **ExchangeRate API** - Para tasas de cambio de monedas fiat

## 💰 Tasas Específicas para Bolivia

El convertidor utiliza tasas de mercado específicas para Bolivia:
- **Compra USDT**: ~14.60 BOB por 1 USDT
- **Retiro USDT**: ~14.15 BOB por 1 USDT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [CoinGecko](https://www.coingecko.com) por la API de precios de criptomonedas
- [shadcn/ui](https://ui.shadcn.com) por los componentes de UI
- [Radix UI](https://www.radix-ui.com) por los primitivos accesibles
- [Lucide](https://lucide.dev) por los iconos

---

Hecho con ❤️ para la comunidad boliviana de criptomonedas