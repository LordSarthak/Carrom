# Carrom Pro - Multiplayer Web Game

A modern, real-time multiplayer Carrom web application built with React, TypeScript, and premium gaming UI/UX.

## Features

- 🎮 **Real-time Multiplayer** - Play with friends or match with players worldwide
- 🏆 **Competitive Rankings** - Global and weekly leaderboards
- 💰 **In-game Economy** - Earn coins, unlock skins, and customize your experience
- 🎨 **Premium UI** - Dark gaming theme with glassmorphism and neon accents
- 📱 **Fully Responsive** - Optimized for desktop and mobile devices
- ⚡ **Smooth Animations** - Framer Motion powered transitions
- 🔥 **Real-time Chat** - In-game messaging with emoji support
- 🎯 **Daily Rewards** - Login daily for bonus coins and rewards

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion (Motion)
- **Authentication**: Firebase Auth
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd carrom-pro
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials and Socket.IO server URL.

### Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
pnpm build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components (Navbar)
│   │   └── game/            # Game-specific components
│   ├── pages/               # Page components
│   ├── store/               # Zustand state management
│   ├── services/            # API and Socket services
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app component with routing
├── styles/                  # Global styles and theme
└── main.tsx                 # App entry point
```

## Features Breakdown

### Pages
- **Landing** - Hero section with features showcase
- **Authentication** - Login, Signup with Firebase/Google
- **Dashboard** - User stats, quick play, recent matches
- **Room Lobby** - Multiplayer room with player management
- **Game** - Live Carrom game board with real-time sync
- **Leaderboard** - Global rankings and player search
- **Profile** - User stats, achievements, match history
- **Store** - Board skins, striker skins, coin packs
- **Settings** - Audio, notifications, privacy controls

### State Management
- **authStore** - User authentication and profile
- **roomStore** - Multiplayer room state
- **gameStore** - Game state and scoring
- **chatStore** - In-game messaging

### Services
- **socketService** - Socket.IO client wrapper for real-time events
- **firebase** - Firebase authentication configuration

## Customization

### Theme Colors
Edit `src/styles/theme.css` to customize:
- `--neon-blue`: Primary accent color
- `--neon-green`: Secondary accent color
- `--gaming-bg`: Background colors
- `--glass-bg`: Glassmorphism background

### Animation Variants
Edit `src/app/utils/animations.ts` to modify:
- Fade in/out animations
- Slide transitions
- Scale animations
- Floating effects

## Backend Integration

This frontend is designed to work with a Socket.IO backend server. Key events:

**Room Events:**
- `create-room` - Create a new game room
- `join-room` - Join existing room
- `leave-room` - Leave current room
- `ready-status` - Update player ready status

**Game Events:**
- `game-move` - Send game move
- `chat-message` - Send chat message
- `game-start` - Start match
- `game-end` - End match

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or production.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and modern web technologies.