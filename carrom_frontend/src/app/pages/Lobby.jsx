import { motion } from 'motion/react';
import { Trophy, Medal, Crown, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export function Leaderboard() {
    const [activeTab, setActiveTab] = useState('global');
    const [searchQuery, setSearchQuery] = useState('');

    const leaderboardData = [
        { rank: 1, username: 'ProGamer123', xp: 15240, wins: 432, winRate: 87.5, avatar: 'P' },
        { rank: 2, username: 'Champion99', xp: 14580, wins: 398, winRate: 85.2, avatar: 'C' },
        { rank: 3, username: 'Striker_King', xp: 13920, wins: 375, winRate: 83.1, avatar: 'S' },
        { rank: 4, username: 'CarromMaster', xp: 12450, wins: 342, winRate: 81.4, avatar: 'C' },
        { rank: 5, username: 'BoardBoss', xp: 11280, wins: 318, winRate: 79.8, avatar: 'B' },
        { rank: 6, username: 'QuickShot', xp: 10560, wins: 295, winRate: 77.2, avatar: 'Q' },
        { rank: 7, username: 'PocketPro', xp: 9840, wins: 271, winRate: 75.6, avatar: 'P' },
        { rank: 8, username: 'StrikeForce', xp: 9120, wins: 248, winRate: 73.9, avatar: 'S' },
        { rank: 9, username: 'TableTitan', xp: 8400, wins: 225, winRate: 72.1, avatar: 'T' },
        { rank: 10, username: 'AimAce', xp: 7680, wins: 202, winRate: 70.5, avatar: 'A' },
    ];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="text-[#fbbf24]" size={24} />;
        if (rank === 2) return <Medal className="text-[#c0c0c0]" size={24} />;
        if (rank === 3) return <Medal className="text-[#cd7f32]" size={24} />;
        return <span className="text-gray-400 font-bold">#{rank}</span>;
    };

    const getRankGlow = (rank) => {
        if (rank === 1) return 'shadow-[0_0_30px_rgba(251,191,36,0.3)]';
        if (rank === 2) return 'shadow-[0_0_20px_rgba(192,192,192,0.3)]';
        if (rank === 3) return 'shadow-[0_0_20px_rgba(205,127,50,0.3)]';
        return '';
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="text-center mb-6">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-[#fbbf24]" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent mb-2">
                            Leaderboard
                        </h1>
                        <p className="text-gray-400">Compete with the best players worldwide</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <Button
                                variant={activeTab === 'global' ? 'primary' : 'ghost'}
                                onClick={() => setActiveTab('global')}
                            >
                                <TrendingUp size={18} />
                                Global
                            </Button>

                            <Button
                                variant={activeTab === 'weekly' ? 'primary' : 'ghost'}
                                onClick={() => setActiveTab('weekly')}
                            >
                                <Trophy size={18} />
                                Weekly
                            </Button>
                        </div>

                        <div className="w-full sm:w-auto sm:min-w-[300px]">
                            <Input
                                placeholder="Search players..."
                                icon={<Search size={18} />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {leaderboardData.map((player, index) => (
                        <motion.div
                            key={player.rank}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card
                                hover
                                neonGlow={player.rank <= 3}
                                className={`${getRankGlow(player.rank)} ${player.rank <= 3 ? 'border-2' : ''
                                    } ${player.rank === 1
                                        ? 'border-[#fbbf24]'
                                        : player.rank === 2
                                            ? 'border-[#c0c0c0]'
                                            : player.rank === 3
                                                ? 'border-[#cd7f32]'
                                                : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-16 text-center">
                                        {getRankIcon(player.rank)}
                                    </div>

                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                            {player.avatar}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold text-lg">{player.username}</h3>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <span>{player.wins} wins</span>
                                            <span className="text-[#00ff88]">{player.winRate}% win rate</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-[#00d9ff] font-bold text-xl">
                                            {player.xp.toLocaleString()}
                                        </div>
                                        <div className="text-gray-400 text-sm">XP</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <Card className="inline-block">
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400">Your Rank:</div>
                            <div className="text-[#00d9ff] font-bold text-xl">#247</div>
                            <div className="text-gray-400">•</div>
                            <div className="text-white">Keep playing to climb higher!</div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}