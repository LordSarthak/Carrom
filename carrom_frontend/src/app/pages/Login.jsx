import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Copy, Crown, Check, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { useAuthStore } from '../store/authStore';
import { useRoomStore } from '../store/roomStore';
import { toast } from 'sonner';

export function Lobby() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { players, roomCode } = useRoomStore();

    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const mockRoomCode = 'ABC123';

    const mockPlayers = [
        { id: '1', username: user?.username || 'You', isReady: false, isHost: true },
        { id: '2', username: 'Player2', isReady: true, isHost: false },
    ];

    const copyRoomCode = () => {
        navigator.clipboard.writeText(mockRoomCode);
        toast.success('Room code copied!');
    };

    const toggleReady = () => {
        toast.info('Ready status updated!');
    };

    const startGame = () => {
        navigate('/game');
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            setChatMessages([
                ...chatMessages,
                { user: user?.username || 'You', message: chatMessage },
            ]);
            setChatMessage('');
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Card neonGlow>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2">Game Lobby</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Room Code:</span>
                                    <code className="px-3 py-1 bg-[#1a1f35] rounded-lg text-[#00d9ff] font-mono text-lg">
                                        {mockRoomCode}
                                    </code>
                                    <Button size="sm" variant="ghost" onClick={copyRoomCode} icon={<Copy size={16} />}>
                                        Copy
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                                    Leave Lobby
                                </Button>
                                <Button onClick={startGame}>
                                    Start Game
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Players */}
                    <div className="lg:col-span-2">
                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Players ({mockPlayers.length}/4)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {mockPlayers.map((player, index) => (
                                    <motion.div
                                        key={player.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-4 rounded-lg border border-[#00d9ff]/20"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center relative">
                                                    <span className="text-black font-bold">
                                                        {player.username.charAt(0).toUpperCase()}
                                                    </span>
                                                    {player.isHost && (
                                                        <Crown
                                                            size={16}
                                                            className="absolute -top-1 -right-1 text-[#fbbf24]"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{player.username}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {player.isHost ? 'Host' : 'Player'}
                                                    </p>
                                                </div>
                                            </div>

                                            {player.isReady ? (
                                                <div className="flex items-center gap-1 text-[#00ff88] text-sm">
                                                    <Check size={16} />
                                                    <span>Ready</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-gray-400 text-sm">
                                                    <X size={16} />
                                                    <span>Not Ready</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {[...Array(4 - mockPlayers.length)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="glass p-4 rounded-lg border border-dashed border-[#00d9ff]/20 flex items-center justify-center"
                                    >
                                        <p className="text-gray-500">Waiting for player...</p>
                                    </div>
                                ))}
                            </div>

                            <Button fullWidth onClick={toggleReady} variant="secondary">
                                I'm Ready
                            </Button>
                        </Card>
                    </div>

                    {/* Chat */}
                    <div>
                        <Card className="h-full flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageCircle className="text-[#00d9ff]" size={20} />
                                <h2 className="text-xl font-semibold text-white">Chat</h2>
                            </div>

                            <div className="flex-1 glass rounded-lg p-3 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                                {chatMessages.length === 0 ? (
                                    <p className="text-gray-500 text-center mt-8">
                                        No messages yet...
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {chatMessages.map((msg, i) => (
                                            <div key={i} className="text-sm">
                                                <span className="text-[#00d9ff] font-medium">
                                                    {msg.user}:
                                                </span>{' '}
                                                <span className="text-gray-300">{msg.message}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <form onSubmit={sendMessage} className="flex gap-2">
                                <Input
                                    placeholder="Type a message..."
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" size="sm">
                                    Send
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}