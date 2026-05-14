import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export function Signup() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            login({
                id: Date.now().toString(),
                username: username,
                email: email,
                coins: 1000,
                xp: 0,
                level: 1,
                winRate: 0,
                matchesPlayed: 0,
                isGuest: false,
            });
            toast.success('Account created successfully! Welcome to Carrom Pro!');
            navigate('/');
            setIsLoading(false);
        }, 1000);
    };

    const handleGoogleSignup = () => {
        toast.info('Google signup coming soon!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-block p-4 glass rounded-2xl mb-4 border border-[#00d9ff]/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-xl flex items-center justify-center">
                            <span className="text-black font-bold text-3xl">C</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join thousands of players worldwide</p>
                </div>

                <Card neonGlow>
                    <form onSubmit={handleSignup} className="space-y-5">
                        <Input
                            type="text"
                            label="Username"
                            placeholder="Choose a username"
                            icon={<User size={18} />}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            icon={<Mail size={18} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Create a password"
                            icon={<Lock size={18} />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            icon={<Lock size={18} />}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" fullWidth disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#0f172a]/80 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        fullWidth
                        icon={<Chrome size={20} />}
                        onClick={handleGoogleSignup}
                    >
                        Continue with Google
                    </Button>

                    <p className="text-center text-gray-400 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#00d9ff] hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}
