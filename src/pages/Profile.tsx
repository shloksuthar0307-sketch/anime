import { User, Mail, LogOut, BarChart3, Heart, Bookmark, CheckCircle, Play } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import PageWrapper from '../components/layout/PageWrapper';

export default function Profile() {
  const { user, signOut } = useAuth();
  const { items } = useWatchlistStore();
  const navigate = useNavigate();

  const watching = items.filter((i) => i.status === 'watching').length;
  const completed = items.filter((i) => i.status === 'completed').length;
  const planToWatch = items.filter((i) => i.status === 'plan_to_watch').length;
  const favorites = items.filter((i) => i.isFavorite).length;

  if (!user) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-void flex items-center justify-center">
          <div className="text-center">
            <User className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted text-lg font-display mb-4">Sign in to view your profile</p>
            <NeonButton onClick={() => navigate('/auth')}>Sign In</NeonButton>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan/50 flex items-center justify-center shadow-neon-cyan">
                <User className="w-10 h-10 text-neon-cyan" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-display font-bold text-2xl text-text-primary">{user.email?.split('@')[0] || 'User'}</h1>
                <p className="text-text-muted text-sm flex items-center gap-1.5 justify-center sm:justify-start mt-1">
                  <Mail className="w-3.5 h-3.5" /> {user.email}
                </p>
              </div>
              <div className="sm:ml-auto">
                <NeonButton variant="pink" onClick={signOut}>
                  <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</span>
                </NeonButton>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Play, label: 'Watching', value: watching, color: 'text-green-400' },
              { icon: CheckCircle, label: 'Completed', value: completed, color: 'text-blue-400' },
              { icon: Bookmark, label: 'Plan to Watch', value: planToWatch, color: 'text-neon-cyan' },
              { icon: Heart, label: 'Favorites', value: favorites, color: 'text-neon-pink' },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-4 text-center">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="font-display font-bold text-2xl text-text-primary">{stat.value}</p>
                <p className="text-text-muted text-xs font-mono">{stat.label}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6">
            <h2 className="font-display font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-neon-cyan" /> Your Anime DNA
            </h2>
            {items.length > 0 ? (
              <div className="space-y-3">
                {['watching', 'completed', 'plan_to_watch', 'dropped'].map((status) => {
                  const count = items.filter((i) => i.status === status).length;
                  const pct = items.length > 0 ? (count / items.length) * 100 : 0;
                  const colors: Record<string, string> = {
                    watching: 'bg-green-500',
                    completed: 'bg-blue-500',
                    plan_to_watch: 'bg-neon-cyan',
                    dropped: 'bg-red-500',
                  };
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-text-muted w-28 capitalize">{status.replace('_', ' ')}</span>
                      <div className="flex-1 bg-void-surface rounded-full h-2 overflow-hidden">
                        <div className={`h-full rounded-full ${colors[status] || 'bg-gray-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-mono text-text-secondary w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-text-muted text-sm">Add anime to your watchlist to see your stats</p>
            )}
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  );
}
