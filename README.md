# Tablet POS

A modern Point of Sale (POS) system designed for tablets, built with React Native and Expo. This application provides an intuitive interface for managing orders, products, and cart operations in a restaurant or retail environment.

## Installation Requirements

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Expo CLI**: Install globally with `npm install -g @expo/cli`

### For Platform-Specific Development
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK
- **Web**: Modern web browser

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ayced31/tablet-pos.git
   cd tablet-pos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on specific platforms:
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For Web
   ```

## Libraries Used

### Core Framework
- **React** (v19.1.0) - UI library
- **React Native** (v0.81.5) - Mobile framework
- **Expo** (~v54.0.25) - Development platform

### UI & Styling
- **NativeWind** (v4.2.1) - TailwindCSS for React Native
- **TailwindCSS** (v3.3.2) - Utility-first CSS framework
- **Lucide React Native** (v0.554.0) - Icon library
- **React Native Reanimated** (~v4.1.1) - Animation library
- **React Native Safe Area Context** (~v5.6.0) - Safe area handling

### State Management
- **Zustand** (v5.0.8) - Lightweight state management

### Utilities
- **clsx** (v2.1.1) - Conditional class names
- **tailwind-merge** (v3.4.0) - Merge Tailwind classes

### Development
- **TypeScript** (~v5.9.2) - Type safety
- **Babel** - JavaScript compiler

## UI Explanation

The application features a split-screen layout optimized for landscape tablet use:

### Left Section - Cart & Checkout (35% width)
- **Customer & Order Type**: Add customer information and select order type (Takeaway/Dine-in)
- **Order ID**: Unique identifier for each order
- **Cart Display**: Lists all items added with quantity controls
- **Course & Status Badges**: Shows order course number and status (Unpaid, Building, Opened)
- **Price Breakdown**: Displays subtotal, tax (10%), and total
- **Action Buttons**: 
  - Discounts: Apply discounts to the order
  - Send to Kitchen: Submit order items to kitchen
  - More: Additional options
  - Pay: Complete the transaction

### Right Section - Product Menu (65% width)
- **Navigation Bar**: Top navigation with branding and controls
- **Category Filter**: Quick access to product categories (Appetizers, Main Course, Dessert)
- **Toolbar Icons**: 
  - Grid/List view toggle
  - Search functionality
  - Settings
  - Calendar
  - Orders list
  - Main menu dropdown
- **Product Grid**: 4-column grid displaying products with:
  - Product image or placeholder icon
  - Product name
  - Price
  - Stock status indicator

### Interactive Features
- **Product Selection**: Tap any product to open an item modal
- **Item Modal**: Configure quantity, add notes, and add to cart
- **Cart Management**: Increase/decrease quantities or remove items
- **Real-time Calculations**: Automatic price updates as items are modified

### Design Theme
- **Dark Mode**: Sleek dark interface with zinc/gray color scheme
- **Landscape Orientation**: Optimized for tablet landscape view
- **Responsive Layout**: Adapts to different tablet screen sizes
- **Touch-Optimized**: Large, easy-to-tap controls for quick service

## Project Structure

```
tablet-pos/
├── src/
│   ├── components/     # Reusable UI components
│   ├── data/          # Product and category data
│   ├── store/         # Zustand state management
│   └── types/         # TypeScript type definitions
├── assets/            # Images and icons
├── App.tsx           # Main application component
└── package.json      # Dependencies and scripts
```

## License

Private project - All rights reserved
