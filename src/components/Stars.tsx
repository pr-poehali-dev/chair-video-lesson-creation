import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface StarsProps {
  value: number;
  onRate: (n: number) => void;
  size?: number;
}

const Stars = ({ value, onRate, size = 18 }: StarsProps) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRate(n)}
          className="transition-transform hover:scale-125"
          aria-label={`Оценить на ${n}`}
        >
          <Icon
            name="Star"
            size={size}
            className={
              (hover || value) >= n ? 'fill-accent text-accent' : 'text-muted-foreground/40'
            }
          />
        </button>
      ))}
    </div>
  );
};

export default Stars;
