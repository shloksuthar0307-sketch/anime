import { Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-void-deep/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg gradient-text mb-2">ARU</h3>
            <p className="text-sm text-text-muted">Anime Recommendation Universe</p>
            <p className="text-xs text-text-muted mt-1">Discover Your Universe. Feel Every Frame.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-text-secondary mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/explore" className="text-sm text-text-muted hover:text-neon-cyan transition-colors">Browse Anime</Link>
              <Link to="/mood" className="text-sm text-text-muted hover:text-neon-cyan transition-colors">Mood Search</Link>
              <Link to="/ai-recommend" className="text-sm text-text-muted hover:text-neon-cyan transition-colors">AI Recommendations</Link>
              <Link to="/quiz" className="text-sm text-text-muted hover:text-neon-cyan transition-colors">Personality Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-text-secondary mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-neon-cyan transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-glass-border flex items-center justify-center gap-1 text-xs text-text-muted">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" />
          <span>by ARU Team</span>
        </div>
      </div>
    </footer>
  );
}
