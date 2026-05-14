import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { RealisticCarromBoard } from '../components/game/RealisticCarromBoard';
import { PlayerCard } from '../components/game/PlayerCard';
import { GameControls } from '../components/game/GameControls';
import { Card } from '../components/common/Card';
import { Gamepad2, Users } from 'lucide-react';
import { toast } from 'sonner';

export function MainGame() {
    const { initializeGuestSession } = useAuthStore();

    const {
        players,
        currentPlayerIndex,
        gameStarted,
        roundNumber,
        winner,
        pieces,
        startGame,
        nextTurn,
        resetGame,
        setPlayerName,
        setWinner,
    } = useGameStore();

    const [showWelcome, setShowWelcome] = useState(!gameStarted);

    useEffect(() => {
        initializeGuestSession();
    }, [initializeGuestSession]);

    useEffect(() => {
        if (gameStarted) {
            setShowWelcome(false);
            toast.success('Game Started! 🎮');
        }
    }, [gameStarted]);

    useEffect(() => {
        const activePieces = pieces.filter((p) => !p.isPocketed);

        if (activePieces.length === 0 && gameStarted) {
            const highestScorer = [...players].sort((a, b) => b.score - a.score)[0];
            setWinner(highestScorer);
            toast.success(`🏆 ${highestScorer.name} wins with ${highestScorer.score} points!`);
        }
    }, [pieces, gameStarted, players, setWinner]);

    const currentPlayer = players[currentPlayerIndex];

    const handleStartGame = () => {
        startGame();
    };

    const handleNextTurn = () => {
        const nextIndex = (currentPlayerIndex + 1) % 4;
        nextTurn();
        toast.info(`${players[nextIndex].name}'s turn!`);
    };

    const handleReset = () => {
        resetGame();
        setShowWelcome(true);
        toast.success('Game reset! Ready for a new match.');
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <AnimatePresence>
                {showWelcome && !gameStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 20 }}
                            className="glass backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-[#00d9ff]/30"
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,217,255,0.5)]"
                                >
                                    <Gamepad2 size={40} className="text-black" />
                                </motion.div>

                                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent mb-2">
                                    Carrom Pro
                                </h1>
                                <p className="text-gray-400">4-Player Multiplayer Game</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Users size={20} className="text-[#00d9ff]" />
                                    Players (Click names to edit)
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {players.map((player) => (
                                        <div
                                            key={player.id}
                                            className="glass p-4 rounded-lg border border-[#00d9ff]/20 flex items-center gap-3"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold"
                                                style={{
                                                    background: `linear-gradient(135deg, ${player.color}, ${player.color}dd)`,
                                                }}
                                            >
                                                {player.name.charAt(0)}
                                            </div>

                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={player.name}
                                                    onChange={(e) =>
                                                        setPlayerName(player.id, e.target.value)
                                                    }
                                                    className="w-full bg-transparent border-none text-white focus:outline-none"
                                                    placeholder={`Player ${player.id}`}
                                                />
                                                <p className="text-xs text-gray-400">
                                                    Player {player.id}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 glass p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-2">
                                    🎯 Quick Rules:
                                </h3>
                                <ul className="text-sm text-gray-300 space-y-1">
                                    <li>• Click pieces to pocket them</li>
                                    <li>• White & Black = 1 point, Red Queen = 5 points</li>
                                    <li>• Take turns using "Next Turn"</li>
                                    <li>• Highest score wins</li>
                                </ul>
                            </div>

                            <button
                                onClick={handleStartGame}
                                className="w-full py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff88] text-black font-semibold rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:scale-105 transition"
                            >
                                Start Game
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Card neonGlow>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-xl flex items-center justify-center">
                                    <Gamepad2 size={24} className="text-black" />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        Carrom Pro
                                    </h1>
                                    <p className="text-gray-400 text-sm">
                                        Round {roundNumber}
                                    </p>
                                </div>
                            </div>

                            {gameStarted && currentPlayer && (
                                <div className="px-6 py-2 glass rounded-lg border border-[#00d9ff]/50 text-center">
                                    <p className="text-gray-400 text-sm">Current Turn</p>
                                    <p
                                        className="font-bold"
                                        style={{ color: currentPlayer.color }}
                                    >
                                        {currentPlayer.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left */}
                    <div className="lg:col-span-3 space-y-4">
                        {players.slice(0, 2).map((player) => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                isCurrentTurn={currentPlayer?.id === player.id}
                                onNameChange={(name) => setPlayerName(player.id, name)}
                                position="left"
                            />
                        ))}
                    </div>

                    {/* Board */}
                    <div className="lg:col-span-6">
                        <RealisticCarromBoard />
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-3 space-y-4">
                        {players.slice(2, 4).map((player) => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                isCurrentTurn={currentPlayer?.id === player.id}
                                onNameChange={(name) => setPlayerName(player.id, name)}
                                position="right"
                            />
                        ))}

                        <GameControls
                            gameStarted={gameStarted}
                            onStart={handleStartGame}
                            onReset={handleReset}
                            onNextTurn={handleNextTurn}
                            currentPlayer={currentPlayer}
                            winner={winner}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}