import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gamepad2, Users, Trophy, Zap, Crown, Shield } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export function Landing() {
    const features = [
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Multiplayer Battles',
            description: 'Play with friends or challenge players worldwide in real-time matches',
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Competitive Rankings',
            description: 'Climb the leaderboard and prove you are the ultimate Carrom champion',
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Fast-Paced Action',
            description: 'Quick matches with smooth gameplay and instant matchmaking',
        },
        {
            icon: <Crown className="w-8 h-8" />,
            title: 'Daily Rewards',
            description: 'Login daily to collect coins, power-ups, and exclusive rewards',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Fair Play',
            description: 'Advanced anti-cheat system ensures fair and competitive gameplay',
        },
        {
            icon: <Gamepad2 className="w-8 h-8" />,
            title: 'Custom Skins',
            description: 'Unlock and customize boards, strikers, and unique cosmetics',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-[#00d9ff] rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: Math.random() * 0.5 + 0.5,
                                opacity: 0.1,
                            }}
                            animate={{
                                y: [null, Math.random() * window.innerHeight],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="inline-block mb-8"
                        >
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(0,217,255,0.5)]">
                                <Gamepad2 size={48} className="text-black" />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] via-[#00ff88] to-[#00d9ff] bg-clip-text text-transparent">
                            Carrom Pro
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            The ultimate multiplayer Carrom experience. Challenge players worldwide, climb the ranks, and become a champion!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/dashboard">
                                <Button size="lg" className="min-w-[200px]">
                                    <Gamepad2 size={20} />
                                    Play Now
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="lg" variant="outline" className="min-w-[200px]">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent">
                            Premium Features
                        </h2>
                        <p className="text-gray-400 text-lg">Everything you need for an amazing Carrom experience</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card hover neonGlow>
                                    <div className="text-[#00d9ff] mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card neonGlow className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Trophy className="w-16 h-16 mx-auto mb-6 text-[#fbbf24]" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                Ready to Become a Champion?
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                Join thousands of players competing daily. Start your journey to the top now!
                            </p>
                            <Link to="/signup">
                                <Button size="lg">
                                    Get Started Free
                                </Button>
                            </Link>
                        </motion.div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
