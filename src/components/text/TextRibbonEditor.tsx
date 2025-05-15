import React from 'react';
import { Italic, Underline } from 'lucide-react';
import type { TextRibbonEditorProps } from './textTypes';

const sizes = [
  'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
  'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
  'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'
];

const weights = [
  'font-hairline', 'font-thin', 'font-light', 'font-normal',
  'font-medium', 'font-semibold', 'font-bold', 'font-extrabold'
];

const fonts = [
  'font-primary', 'font-secondary', 'font-mono', 'font-sans', 'font-serif'
];

const TextRibbonEditor: React.FC<TextRibbonEditorProps> = ({ textStyles, setTextStyles }) => {
  const { size, weight, font, italic, underline } = textStyles;

  const handleChange = (key: keyof typeof textStyles, value: any) => {
    setTextStyles(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex gap-4 flex-wrap items-end w-full">
      <label className="flex flex-col text-sm flex-1">
        Size
        <select
          value={size}
          onChange={(e) => handleChange('size', e.target.value)}
          className="relative flex items-center rounded border px-3 pb-2 pt-2 w-full transition-all border-gray-300 focus-within:ring-2 focus-within:ring-blue-300"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-sm flex-1">
        Weight
        <select
          value={weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          className="relative flex items-center rounded border px-3 pb-2 pt-2 w-full transition-all border-gray-300 focus-within:ring-2 focus-within:ring-blue-300"
        >
          {weights.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-sm flex-1">
        Font
        <select
          value={font}
          onChange={(e) => handleChange('font', e.target.value)}
          className="relative flex items-center rounded border px-3 pb-2 pt-2 w-full transition-all border-gray-300 focus-within:ring-2 focus-within:ring-blue-300"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={() => handleChange('italic', !italic)}
        className={`px-3 pb-2 pt-2 border border-gray-300 rounded ${italic ? 'bg-gray-300' : ''}`}
      >
        <Italic />
      </button>

      <button
        onClick={() => handleChange('underline', !underline)}
        className={`px-3 pb-2 pt-2 border border-gray-300 rounded ${underline ? 'bg-gray-300' : ''}`}
      >
        <Underline />
      </button>
    </div>
  );
};

export default TextRibbonEditor;
