import React from 'react';
import { Italic, Bold } from 'lucide-react';

interface TextEditorProps {
  tailwindClassArr: string[];
  setTailwindClassArr: React.Dispatch<React.SetStateAction<string[]>>;
}

const textSizes = [
  'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
  'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
  'text-7xl', 'text-8xl', 'text-9xl'
];

const fontOptions = [
  'font-primary', 'font-secondary', 'font-mono', 'font-sans', 'font-serif'
];

const TextEditor: React.FC<TextEditorProps> = ({ tailwindClassArr, setTailwindClassArr }) => {
  const replaceClass = (newClass: string, classGroup: string[]) => {
    setTailwindClassArr(prev => {
      const filtered = prev.filter(cls => !classGroup.includes(cls));
      return newClass ? [...filtered, newClass] : filtered;
    });
  };

  const toggleClass = (cls: string) => {
    setTailwindClassArr(prev =>
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  return (
    <div className="flex flex-row gap-3 w-full items-end">
      <label className="flex flex-col">
        <span className="font-medium">Text Size</span>
        <select
          onChange={(e) => {
            const selected = e.target.value;
            if (selected) replaceClass(`text-${selected}`, textSizes);
          }}
          className="p-2 border rounded"
        >
          <option value="">Select a size</option>
          {textSizes.map(size => (
            <option key={size} value={size.replace('text-', '')}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        <span className="font-medium">Font Family</span>
        <select
          onChange={(e) => {
            const selected = e.target.value;
            if (selected) replaceClass(selected, fontOptions);
          }}
          className="p-2 border rounded"
        >
          <option value="">Select a font</option>
          {fontOptions.map(font => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggleClass('italic')}
          style={{height: '41px'}}
          className={`p-2 border rounded ${tailwindClassArr.includes('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => toggleClass('font-bold')}
          style={{height: '41px'}}
          className={`p-2 border rounded ${tailwindClassArr.includes('font-bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold size={18} />
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
