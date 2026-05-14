import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Zap, Award, Edit2, Crown, UserPlus } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

export function Profile() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { totalMatches, wins } = useGameStore();

    // Calculate win rate from game store
    const calculatedWinRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0.0';

    const stats = [
        { label: 'Matches Played', value: totalMatches, icon: Target, color: '#00d9ff' },
        { label: 'Win Rate', value: `${calculatedWinRate}%`, icon: Trophy, color: '#fbbf24' },
        { label: 'Total XP', value: user?.xp || 0, icon: Zap, color: '#00ff88' },
        { label: 'Level', value: user?.level || 1, icon: Crown, color: '#a855f7' },
    ];

    const achievements = [
        { id: 1, name: 'First Victory', icon: '🏆', unlocked: true },
        { id: 2, name: 'Win Streak', icon: '🔥', unlocked: true },
        { id: 3, name: 'Perfect Game', icon: '⭐', unlocked: false },
        { id: 4, name: 'Speed Demon', icon: '⚡', unlocked: false },
        { id: 5, name: 'Champion', icon: '👑', unlocked: false },
        { id: 6, name: 'Sharpshooter', icon: '🎯', unlocked: true },
    ];

    const matchHistory = [
        { id: 1, date: '2 hours ago', opponent: 'Player123', result: 'won', score: '25-18' },
        { id: 2, date: '5 hours ago', opponent: 'ProGamer', result: 'lost', score: '15-25' },
        { id: 3, date: '1 day ago', opponent: 'Champion99', result: 'won', score: '25-20' },
        { id: 4, date: '1 day ago', opponent: 'QuickShot', result: 'won', score: '25-22' },
        { id: 5, date: '2 days ago', opponent: 'TableMaster', result: 'lost', score: '20-25' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Guest User Notice */}
                {user?.isGuest && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="bg-gradient-to-r from-[#00d9ff]/10 to-[#00ff88]/10 border-2 border-[#00d9ff]/50">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <UserPlus className="text-[#00d9ff]" size={32} />
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">You're playing as a Guest</h3>
                                        <p className="text-gray-400 text-sm">
                                            Sign up to save your progress permanently and unlock more features!
                                        </p>
                                    </div>
                                </div>
                                <Button onClick={() => navigate('/signup')}>
                                    Create Account
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: user?.isGuest ? 0.1 : 0 }}
                >
                    <Card neonGlow>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center text-black text-5xl font-bold shadow-[0_0_40px_rgba(0,217,255,0.5)]">
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-[#1a1f35] rounded-full p-2 border-2 border-[#00d9ff]">
                                    <Crown className="text-[#fbbf24]" size={20} />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
                                    <span className="inline-block px-3 py-1 bg-[#a855f7]/20 text-[#a855f7] rounded-full text-sm font-semibold">
                                        Level {user?.level}
                                    </span>
                                </div>
                                <p className="text-gray-400 mb-4">{user?.email}</p>

                                <div className="w-full bg-[#1a1f35] rounded-full h-3 mb-2">
                                    <div
                                        className="bg-gradient-to-r from-[#00d9ff] to-[#00ff88] h-3 rounded-full"
                                        style={{ width: '65%' }}
                                    />
                                </div>
                                <p className="text-sm text-gray-400">
                                    {user?.xp} / {((user?.level || 1) + 1) * 1000} XP to next level
                                </p>
                            </div>

                            <Button variant="outline" icon={<Edit2 size={18} />}>
                                Edit Profile
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover>
                                <div
                                    className="p-3 rounded-xl mb-3 inline-block"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <stat.icon size={24} style={{ color: stat.color }} />
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Achievements */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="text-[#00d9ff]" size={24} />
                            <h2 className="text-xl font-semibold text-white">Achievements</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={achievement.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`glass p-4 rounded-lg text-center ${achievement.unlocked
                                            ? 'border border-[#00d9ff]/30'
                                            : 'opacity-50 grayscale'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{achievement.icon}</div>
                                    <p className="text-xs text-white">{achievement.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    {/* Match History */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="text-[#fbbf24]" size={24} />
                            <h2 className="text-xl font-semibold text-white">Match History</h2>
                        </div>

                        <div className="space-y-2">
                            {matchHistory.map((match) => (
                                <div
                                    key={match.id}
                                    className="glass p-3 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center text-black font-bold text-sm">
                                            {match.opponent.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{match.opponent}</p>
                                            <p className="text-gray-400 text-xs">{match.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded-full ${match.result === 'won'
                                                    ? 'bg-[#00ff88]/20 text-[#00ff88]'
                                                    : 'bg-[#ff3366]/20 text-[#ff3366]'
                                                }`}
                                        >
                                            {match.result === 'won' ? 'Won' : 'Lost'}
                                        </span>
                                        <p className="text-gray-400 text-xs mt-1">{match.score}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
