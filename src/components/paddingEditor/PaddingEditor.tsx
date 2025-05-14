import React, { useState } from 'react';
import Input from '../input/Input';
import type { PaddingValues } from './paddingEditortypes';
import Text from '../text/Text';

const suffixes = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8',
  '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'
];

const getPaddingClass = (side: keyof PaddingValues, value: number): string => {
  const prefixMap: Record<keyof PaddingValues, string> = {
    top: 'pt-',
    right: 'pr-',
    bottom: 'pb-',
    left: 'pl-',
  };

  const absVal = Math.abs(value);
  const suffix = suffixes[absVal] || '0';
  const sign = value < 0 ? '-' : '';
  return `${sign}${prefixMap[side]}${suffix}`;
};

const PaddingEditor: React.FC = () => {
  const [margins, setPaddings] = useState<PaddingValues>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const handleInputChange = (side: keyof PaddingValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10) || 0;
    setPaddings((prev) => ({
      ...prev,
      [side]: Math.max(-18, Math.min(18, value)), 
    }));
  };

  const finalClass = [
    getPaddingClass('top', margins.top),
    getPaddingClass('right', margins.right),
    getPaddingClass('bottom', margins.bottom),
    getPaddingClass('left', margins.left),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <div key={side} className="flex flex-col">
            <Text tailwindClasses="text-xs capitalize">{side}</Text>
            <Input
              type="number"
              value={margins[side]}
              onChange={handleInputChange(side)}
              min={-18}
              max={18}
            />
          </div>
        ))}
      </div>
      <div>
        Resulting Class: <code className="bg-gray-100 px-2 py-1 rounded">{finalClass}</code>
      </div>
    </div>
  );
};

export default PaddingEditor;
