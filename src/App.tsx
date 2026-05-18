import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

const Landing = lazy(() => import('./pages/Landing'));
const Explore = lazy(() => import('./pages/Explore'));
const AnimeDetail = lazy(() => import('./pages/AnimeDetail'));
const MoodSearch = lazy(() => import('./pages/MoodSearch'));
const AIRecommend = lazy(() => import('./pages/AIRecommend'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Quiz = lazy(() => import('./pages/Quiz'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-cyber border-2 border-neon-cyan flex items-center justify-center animate-glow-pulse">
          <span className="font-display font-bold text-lg gradient-text">A</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/mood" element={<MoodSearch />} />
              <Route path="/ai-recommend" element={<AIRecommend />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/quiz" element={<Quiz />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={<Auth />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
