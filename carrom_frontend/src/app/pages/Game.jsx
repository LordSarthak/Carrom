import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, User, MessageCircle, Pause, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useAuthStore } from '../store/authStore';

export function Game() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [showPauseMenu, setShowPauseMenu] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState('');

    const players = [
        { id: '1', username: user?.username || 'You', score: 15, isCurrentTurn: true },
        { id: '2', username: 'Opponent', score: 12, isCurrentTurn: false },
    ];

    const handleExit = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <Card className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button size="sm" variant="ghost" onClick={() => setShowPauseMenu(true)}>
                                <Pause size={20} />
                            </Button>
                            <div className="flex items-center gap-2 text-white">
                                <Clock size={20} className="text-[#00d9ff]" />
                                <span className="font-mono text-lg">05:30</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">Round 1</p>
                            <p className="text-white font-semibold">Best of 3</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => setChatOpen(!chatOpen)}>
                            <MessageCircle size={20} />
                        </Button>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Players Info */}
                    <div className="space-y-4">
                        {players.map((player) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Card
                                    neonGlow={player.isCurrentTurn}
                                    className={player.isCurrentTurn ? 'ring-2 ring-[#00d9ff]' : ''}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center">
                                            <span className="text-black font-bold">
                                                {player.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{player.username}</p>
                                            {player.isCurrentTurn && (
                                                <p className="text-[#00d9ff] text-sm">Your Turn</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Score</span>
                                        <span className="text-2xl font-bold text-white">{player.score}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Game Board */}
                    <div className="lg:col-span-3">
                        <Card className="aspect-square max-w-2xl mx-auto">
                            <div className="w-full h-full bg-gradient-to-br from-[#8b4513] to-[#654321] rounded-lg p-4 border-4 border-[#3d2817] relative">
                                {/* Carrom Board */}
                                <div className="w-full h-full bg-[#f5deb3] rounded-lg relative shadow-[inset_0_0_50px_rgba(0,0,0,0.3)]">
                                    {/* Corner Pockets */}
                                    {[
                                        { top: '2%', left: '2%' },
                                        { top: '2%', right: '2%' },
                                        { bottom: '2%', left: '2%' },
                                        { bottom: '2%', right: '2%' },
                                    ].map((pos, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-12 h-12 bg-black rounded-full border-4 border-[#8b4513]"
                                            style={pos}
                                        />
                                    ))}

                                    {/* Center Circle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-32 h-32 border-4 border-gray-400 rounded-full" />
                                    </div>

                                    {/* Instructions */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                        <p className="text-gray-600 text-sm">Carrom Board</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Game board will be rendered here
                                        </p>
                                    </div>

                                    {/* Diagonal Lines */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute w-full h-0.5 bg-gray-400 top-1/2 -translate-y-1/2" />
                                        <div className="absolute h-full w-0.5 bg-gray-400 left-1/2 -translate-x-1/2" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Game Controls */}
                        <div className="mt-4 flex justify-center gap-4">
                            <Button variant="outline">
                                <Trophy size={20} />
                                View Stats
                            </Button>
                            <Button variant="danger" onClick={() => setShowExitConfirm(true)}>
                                <X size={20} />
                                Leave Match
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Chat Sidebar */}
                {chatOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed right-4 top-20 bottom-4 w-80"
                    >
                        <Card className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Chat</h3>
                                <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 glass rounded-lg p-3 mb-4 overflow-y-auto">
                                <p className="text-gray-500 text-sm text-center mt-8">No messages yet...</p>
                            </div>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <Input
                                    placeholder="Type a message..."
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                />
                                <Button size="sm" type="submit">
                                    Send
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}

                {/* Pause Menu Modal */}
                <Modal
                    isOpen={showPauseMenu}
                    onClose={() => setShowPauseMenu(false)}
                    title="Game Paused"
                >
                    <div className="space-y-3">
                        <Button fullWidth onClick={() => setShowPauseMenu(false)}>
                            Resume Game
                        </Button>
                        <Button fullWidth variant="outline">
                            Game Settings
                        </Button>
                        <Button fullWidth variant="danger" onClick={() => setShowExitConfirm(true)}>
                            Leave Match
                        </Button>
                    </div>
                </Modal>

                {/* Exit Confirmation Modal */}
                <Modal
                    isOpen={showExitConfirm}
                    onClose={() => setShowExitConfirm(false)}
                    title="Leave Match?"
                >
                    <p className="text-gray-300 mb-6">
                        Are you sure you want to leave? You'll lose this match and it will count as a forfeit.
                    </p>
                    <div className="flex gap-3">
                        <Button fullWidth variant="outline" onClick={() => setShowExitConfirm(false)}>
                            Cancel
                        </Button>
                        <Button fullWidth variant="danger" onClick={handleExit}>
                            Leave Match
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
