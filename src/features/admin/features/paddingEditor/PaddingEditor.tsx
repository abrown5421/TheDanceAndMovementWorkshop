import React, { useEffect } from 'react';
import Input from '../../../../components/input/Input';
import type { PaddingValues, PaddingEditorProps } from './paddingEditortypes';

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

const PaddingEditor: React.FC<PaddingEditorProps> = ({ paddings, setStyles }) => {
  const handleInputChange = (side: keyof PaddingValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10) || 0;
    const clamped = Math.max(-18, Math.min(18, value));

    setStyles(prev => ({
      ...prev,
      paddings: {
        ...prev.paddings,
        [side]: clamped,
      },
    }));
  };

  const finalClass = [
    getPaddingClass('top', paddings.top),
    getPaddingClass('right', paddings.right),
    getPaddingClass('bottom', paddings.bottom),
    getPaddingClass('left', paddings.left),
  ]
    .filter(Boolean)
    .join(' ');

    useEffect(()=>{
      setStyles(prev => ({
      ...prev,
      paddingClass: finalClass
    }));
    }, [finalClass])
    

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <div key={side} className="flex flex-col flex-1">
            <Input
              type="number"
              value={paddings[side]}
              onChange={handleInputChange(side)}
              min={-18}
              max={18}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaddingEditor;
