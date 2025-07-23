'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight, Trophy, Leaf, Users, Heart, BadgeCheck } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ImpactStatCard = ({ icon, value, label, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-gray-900 dark:bg-gray-800 rounded-lg p-4 shadow-lg border-l-4 ${color} h-full`}
  >
    <div className="flex gap-3 items-center">
      <div className="p-2 rounded-full bg-gray-800">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  </motion.div>
);

const LeaderboardCard = ({ rank, name, value, isCurrentUser }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition">
    <span
      className={`font-bold ${
        rank <= 3 ? 'text-yellow-400' : 'text-gray-400'
      } min-w-8 text-center`}
    >
      {rank}
    </span>
    <span
      className={`flex-1 truncate ${
        isCurrentUser ? 'text-yellow-400 font-semibold' : 'text-white'
      }`}
    >
      {name}
    </span>
    <span className="font-medium text-gray-300">{value}</span>
  </div>
);

const MilestoneCard = ({ icon, title, date, description, badge }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gray-900 dark:bg-green-900/20 rounded-lg p-3 border border-green-800/50 shadow flex gap-3 items-start h-full"
  >
    <div className="p-2 rounded-full bg-green-900/20">{icon}</div>
    <div>
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-semibold text-white">{title}</h4>
        {badge && (
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center gap-1">
            <BadgeCheck size={14} /> {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">{date}</p>
      <p className="text-sm text-gray-300 mt-1">{description}</p>
    </div>
  </motion.div>
);

const CommunityPost = ({ title, description, label }) => (
  <motion.div
    whileHover={{ translateY: -2 }}
    className="p-3 rounded-lg bg-gray-800/60 border border-gray-700 shadow"
  >
    <h4 className="font-medium text-green-400">{title}</h4>
    <p className="text-xs text-gray-400 mt-1">{description}</p>
    <span className="text-xs text-yellow-400 font-medium">{label}</span>
  </motion.div>
);

export default function TrackImpact() {
  const [impact, setImpact] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [stats, setStats] = useState({
    mealsDonated: 0,
    co2Saved: 0,
    donors: 0,
    communities: 0,
  });
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/impact');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setImpact(data);
      } catch (error) {
        console.error('Impact fetch error:', error);
      }
    };
    fetchImpact();

    // Mock data for leaderboard
    setLeaderboard([
      { rank: 1, name: 'Eco Warriors', value: '1,204 meals', isCurrentUser: true },
      { rank: 2, name: 'Green Valley', value: '972 meals' },
      { rank: 3, name: 'Helping Hands', value: '856 meals' },
      { rank: 4, name: 'Food Rescue', value: '723 meals' },
      { rank: 5, name: 'Neighbors Care', value: '689 meals' },
    ]);

    // Mock data for community posts
    setCommunityPosts([
      { title: 'Feeding 1000 people!', description: 'We did it! Thanks team!', label: 'Milestone' },
      { title: 'Recipe: Zero Waste Smoothies', description: 'Check out new ideas to reduce waste.', label: 'Recipe' },
      { title: 'Volunteer Day Success', description: '25 volunteers joined last weekend!', label: 'Event' },
    ]);

    // Mock stats
    setStats({
      mealsDonated: '12,485',
      co2Saved: '2,340 kg',
      donors: '189',
      communities: '47',
    });

    // Mock milestones
    setMilestones([
      { title: '10K Meals Milestone', date: 'Jul 15, 2025', description: 'Reached 10,000 meals donated!', badge: 'Gold' },
      { title: 'Monthly Streak', date: 'Jun 1 - Jun 30, 2025', description: 'Donated every day this month', badge: 'Streak' },
      { title: 'CO2 Reduction', date: 'Jul 10, 2025', description: 'Saved 2,000 kg CO2 this year', badge: 'Eco' },
    ]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const darkModePref = localStorage.getItem('darkMode') === 'true';
    if (token && user) {
      setIsAuthenticated(true);
      setUserName(user.username || 'User');
    }
    if (darkModePref) {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const Header = () => (
    <header className="bg-white dark:bg-gray-900 shadow-md h-20 fixed top-0 w-full z-50 px-2">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
        <Link href="/" className="flex items-center gap-2 mt-1">
          <Image
            src="/images/logo1.png"
            alt="Re-Plate Logo"
            width={180}
            height={180}
            priority
          />
        </Link>
        <div className="flex items-center gap-10 pr-4">
          <nav className="flex items-center gap-10 text-gray-700 dark:text-gray-200 font-medium">
            <Link
              href="/about"
              className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
            >
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition duration-200">
                Our Products <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[200px]">
                <DropdownMenuItem asChild>
                  <Link
                    href="/donate"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Food Donation Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/recipe"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    AI-Powered Recipe Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/track-impact"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Impact Tracker
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/community"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    NGO & Volunteer Hub
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold">
              Contact
            </span>
          </nav>
          {!isAuthenticated ? (
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                Login / Signup
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[160px]">
                <DropdownMenuItem className="text-gray-600 dark:text-white font-semibold text-sm cursor-default px-4 py-2" inset={undefined}>
                  {userName}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleDarkMode}
                  className="px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded cursor-pointer text-sm"
                  inset={undefined}
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
                  inset={undefined}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 text-white flex flex-col items-center">
      <Header />
      <main className="flex flex-col flex-1 justify-center items-center p-4 w-full mt-24 max-w-screen-xl space-y-10">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
            Track Impact
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            See your community’s food rescue efforts, donations, and environmental impact—updated in real time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <ImpactStatCard
            icon={<Heart size={24} className="text-green-400" />}
            value={stats.mealsDonated}
            label="Meals Donated"
            color="border-l-green-600"
          />
          <ImpactStatCard
            icon={<Leaf size={24} className="text-green-400" />}
            value={stats.co2Saved}
            label="CO₂ Saved"
            color="border-l-yellow-600"
          />
          <ImpactStatCard
            icon={<Users size={24} className="text-green-400" />}
            value={stats.donors}
            label="Active Donors"
            color="border-l-cyan-600"
          />
          <ImpactStatCard
            icon={<Trophy size={24} className="text-green-400" />}
            value={stats.communities}
            label="Communities"
            color="border-l-purple-600"
          />
        </div>

        {/* Interactive Impact Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-gray-900 rounded-xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Donations & Impact Over Time</h3>
          <div className="h-[400px]">
            {impact ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="month" stroke="#a0aec0" />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="donations" fill="#34d399" name="Donations (meals)" animationDuration={2000} />
                  <Bar dataKey="volunteers" fill="#60a5fa" name="Volunteers" animationDuration={2000} />
                  <Bar dataKey="food_saved_kg" fill="#c084fc" name="Food Saved (kg)" animationDuration={2000} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">Loading impact data...</div>
            )}
          </div>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-300">Top Communities</h3>
              <span className="text-xs text-yellow-400">Weekly</span>
            </div>
            <div className="space-y-2">
              {leaderboard.map((item) => (
                <LeaderboardCard key={item.rank} rank={item.rank} name={item.name} value={item.value} isCurrentUser={item.isCurrentUser} />
              ))}
              <div className="pt-2 text-center">
                <a href="#" className="flex items-center justify-center gap-1 text-sm text-yellow-400 hover:text-yellow-500 transition">
                  View all <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-green-800/30">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Recent Milestones</h3>
            <div className="grid gap-3">
              {milestones.map((ms, idx) => (
                <MilestoneCard key={idx} icon={<Trophy size={20} className="text-yellow-400" />} title={ms.title} date={ms.date} description={ms.description} badge={ms.badge} />
              ))}
            </div>
          </div>

          {/* Community Shoutouts */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-300">Community Shoutouts</h3>
              <Link href="/community" className="text-xs text-yellow-400 hover:text-yellow-500">
                View All
              </Link>
            </div>
            <div className="grid gap-3">
              {communityPosts.map((post, idx) => (
                <CommunityPost key={idx} title={post.title} description={post.description} label={post.label} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 pt-8 max-w-2xl">
          <h3 className="text-xl font-bold text-white">
            Ready to Make a Bigger Impact?
          </h3>
          <p className="text-gray-400">
            Invite friends, join our community, or organize a food drive.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold uppercase px-6 py-3 rounded-full shadow-lg transition">
              Share Your Story
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-yellow-400 border-yellow-400 hover:bg-yellow-400/10 font-bold uppercase px-6 py-3 rounded-full shadow-lg transition"
            >
              Join a Community
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
