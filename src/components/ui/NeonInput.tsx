import { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  label?: string;
  error?: string;
}

const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ icon = false, label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display font-semibold text-text-secondary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          )}
          <input
            ref={ref}
            className={`
              w-full bg-void-surface/50 border border-glass-border rounded-card
              ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
              text-text-primary font-body text-sm
              placeholder:text-text-muted
              focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan
              transition-all duration-300
              ${error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

NeonInput.displayName = 'NeonInput';
export default NeonInput;
