import React, { useMemo } from 'react';
import { evaluatePasswordStrength } from '../../utils/passwordStrength';

interface PasswordStrengthMeterProps {
  password: string;
  showLabel?: boolean;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ 
  password, 
  showLabel = true 
}) => {
  const { score, feedback } = useMemo(() => 
    evaluatePasswordStrength(password), 
    [password]
  );

  // Colors based on strength
  const getColor = () => {
    switch (score) {
      case 0: return 'bg-gray-300';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-300 ease-in-out`}
          style={{ width: `${score * 25}%` }}
        />
      </div>
      
      {showLabel && password && (
        <p className={`mt-1 text-xs font-medium ${score <= 1 ? 'text-red-600' : score === 2 ? 'text-orange-600' : score === 3 ? 'text-yellow-600' : 'text-green-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;