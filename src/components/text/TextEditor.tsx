import React, { useEffect, useState } from 'react';
import MarginEditor from '../marginEditor/MarginEditor';
import PaddingEditor from '../paddingEditor/PaddingEditor';
import TextRibbonEditor from './TextRibbonEditor';

const TextEditor: React.FC = () => {
  const [textStyles, setTextStyles] = useState({
    size: 'text-base',
    weight: 'font-normal',
    underline: false,
    italic: false,
    font: 'font-sans',
    paddings: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    margins: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    paddingClass: '',
    marginClass: ''
  });

  useEffect(()=>{console.log(textStyles)}, [textStyles])
  return (
    <div className='flex flex-col w-full'>
        <div className='flex flex-row w-full'>
            <div className='flex flex-col w-full'>
                <MarginEditor
                    margins={textStyles.margins}
                    setTextStyles={setTextStyles}
                />
            </div>
        </div>
        <div className='flex flex-row w-full'>
            <div className='flex flex-col w-full'>
                <PaddingEditor 
                    paddings={textStyles.paddings}
                    setTextStyles={setTextStyles}
                 />
            </div>
        </div>
        <TextRibbonEditor 
          textStyles={textStyles}
          setTextStyles={setTextStyles}
         />
    </div>
  );
};

export default TextEditor;
