import React, { useEffect } from 'react';
import Input from '../../../../components/input/Input';
import type { MarginValues, MarginEditorProps } from './marginEditortypes';

const suffixes = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8',
  '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'
];

const getMarginClass = (side: keyof MarginValues, value: number): string => {
  const prefixMap: Record<keyof MarginValues, string> = {
    top: 'mt-',
    right: 'mr-',
    bottom: 'mb-',
    left: 'ml-',
  };

  const absVal = Math.abs(value);
  const suffix = suffixes[absVal] || '0';
  const sign = value < 0 ? '-' : '';
  return `${sign}${prefixMap[side]}${suffix}`;
};

const MarginEditor: React.FC<MarginEditorProps> = ({ margins, setStyles }) => {
  const handleInputChange = (side: keyof MarginValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10) || 0;
    const clampedValue = Math.max(-18, Math.min(18, value));

    setStyles(prev => ({
      ...prev,
      margins: {
        ...prev.margins,
        [side]: clampedValue,
      },
    }));
  };

  const finalClass = [
    getMarginClass('top', margins.top),
    getMarginClass('right', margins.right),
    getMarginClass('bottom', margins.bottom),
    getMarginClass('left', margins.left),
  ]
    .filter(Boolean)
    .join(' ');

    useEffect(()=>{
      setStyles(prev => ({
        ...prev,
        marginClass: finalClass
      }));
    }, [finalClass])
    

  return (
    <div className="flex flex-col gap-4 mt-5 w-full">
      <div className="flex gap-4 w-full">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <div key={side} className="flex flex-col flex-1">
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
    </div>
  );
};

export default MarginEditor;
