import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Plus, Users, Gift, TrendingUp, Clock, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    const stats = [
        { label: 'Matches Played', value: user?.matchesPlayed || 0, icon: Gamepad2, color: '#00d9ff' },
        { label: 'Win Rate', value: `${user?.winRate || 0}%`, icon: Trophy, color: '#fbbf24' },
        { label: 'Level', value: user?.level || 1, icon: TrendingUp, color: '#00ff88' },
    ];

    const recentMatches = [
        { id: 1, opponent: 'Player123', result: 'won', score: '25-18', time: '2 hours ago' },
        { id: 2, opponent: 'ProGamer', result: 'lost', score: '15-25', time: '5 hours ago' },
        { id: 3, opponent: 'Champion99', result: 'won', score: '25-20', time: '1 day ago' },
    ];

    const handleCreateRoom = () => {
        navigate('/lobby');
    };

    const handleJoinRoom = () => {
        if (roomCode.trim()) {
            navigate('/lobby');
            setShowJoinModal(false);
        }
    };

    const handleQuickPlay = () => {
        navigate('/game');
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card neonGlow>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Welcome back, {user?.username}!
                                </h1>
                                <p className="text-gray-400">Ready for your next match?</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button onClick={handleQuickPlay} icon={<Gamepad2 size={20} />}>
                                    Quick Play
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCreateRoom}
                                    icon={<Plus size={20} />}
                                >
                                    Create Room
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowJoinModal(true)}
                                    icon={<Users size={20} />}
                                >
                                    Join Room
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: `${stat.color}20` }}
                                    >
                                        <stat.icon size={24} style={{ color: stat.color }} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Matches */}
                    <div className="lg:col-span-2">
                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">Recent Matches</h2>
                            <div className="space-y-3">
                                {recentMatches.map((match) => (
                                    <motion.div
                                        key={match.id}
                                        whileHover={{ x: 4 }}
                                        className="glass p-4 rounded-lg border border-[#00d9ff]/20 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">
                                                    {match.opponent.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{match.opponent}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Clock size={14} />
                                                    <span>{match.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`text-sm font-semibold px-3 py-1 rounded-full ${match.result === 'won'
                                                        ? 'bg-[#00ff88]/20 text-[#00ff88]'
                                                        : 'bg-[#ff3366]/20 text-[#ff3366]'
                                                    }`}
                                            >
                                                {match.result === 'won' ? 'Won' : 'Lost'}
                                            </span>
                                            <p className="text-gray-400 text-sm mt-1">{match.score}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Daily Rewards & Quick Actions */}
                    <div className="space-y-6">
                        <Card neonGlow className="cursor-pointer" hover>
                            <div className="text-center">
                                <Gift className="w-12 h-12 mx-auto mb-3 text-[#fbbf24]" />
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Daily Reward
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">Claim your daily bonus!</p>
                                <Button fullWidth variant="secondary">
                                    Claim 500 Coins
                                </Button>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Friends Online
                            </h3>
                            <div className="space-y-3">
                                {['Alice', 'Bob', 'Charlie'].map((friend) => (
                                    <div
                                        key={friend}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full" />
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00ff88] rounded-full border-2 border-[#0a0e1a]" />
                                            </div>
                                            <span className="text-white text-sm">{friend}</span>
                                        </div>
                                        <Button size="sm" variant="ghost">
                                            Invite
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Join Room Modal */}
            <Modal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                title="Join Room"
            >
                <div className="space-y-4">
                    <Input
                        label="Room Code"
                        placeholder="Enter 6-digit room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        maxLength={6}
                    />
                    <Button fullWidth onClick={handleJoinRoom}>
                        Join Room
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
