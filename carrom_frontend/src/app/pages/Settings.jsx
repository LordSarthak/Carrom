import { motion } from 'motion/react';
import { Volume2, Bell, Palette, Shield, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export function Settings() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent mb-2">
                        Settings
                    </h1>
                    <p className="text-gray-400">Customize your gaming experience</p>
                </motion.div>

                <div className="space-y-6">
                    {/* Audio Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <Volume2 className="text-[#00d9ff]" size={24} />
                                <h2 className="text-xl font-semibold text-white">Audio</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Sound Effects</p>
                                        <p className="text-sm text-gray-400">Game sounds and effects</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={soundEnabled}
                                            onChange={(e) => setSoundEnabled(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00d9ff]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00d9ff] peer-checked:to-[#00ff88]"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Background Music</p>
                                        <p className="text-sm text-gray-400">Menu and game music</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={musicEnabled}
                                            onChange={(e) => setMusicEnabled(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00d9ff]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00d9ff] peer-checked:to-[#00ff88]"></div>
                                    </label>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Notification Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <Bell className="text-[#00ff88]" size={24} />
                                <h2 className="text-xl font-semibold text-white">Notifications</h2>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-400">Match invites and game updates</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notificationsEnabled}
                                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00d9ff]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00d9ff] peer-checked:to-[#00ff88]"></div>
                                </label>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Theme Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <Palette className="text-[#a855f7]" size={24} />
                                <h2 className="text-xl font-semibold text-white">Appearance</h2>
                            </div>

                            <div>
                                <p className="text-white font-medium mb-3">Theme</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="glass p-4 rounded-lg border-2 border-[#00d9ff] text-white">
                                        Dark Mode
                                    </button>
                                    <button className="glass p-4 rounded-lg border border-gray-600 text-gray-400 opacity-50">
                                        Light Mode
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Privacy Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-[#fbbf24]" size={24} />
                                <h2 className="text-xl font-semibold text-white">Privacy</h2>
                            </div>

                            <div className="space-y-3">
                                <Button variant="outline" fullWidth>
                                    Change Password
                                </Button>
                                <Button variant="outline" fullWidth>
                                    Privacy Policy
                                </Button>
                                <Button variant="outline" fullWidth>
                                    Terms of Service
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Logout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <Button
                                variant="danger"
                                fullWidth
                                icon={<LogOut size={20} />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
