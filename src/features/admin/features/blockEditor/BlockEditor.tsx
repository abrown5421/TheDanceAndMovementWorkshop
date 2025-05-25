import React, { useState } from 'react';
import type { MarginValues } from '../../../../components/marginEditor/marginEditortypes';
import type { PaddingValues } from '../../../../components/paddingEditor/paddingEditortypes';
import MarginEditor from '../../../../components/marginEditor/MarginEditor';
import PaddingEditor from '../../../../components/paddingEditor/PaddingEditor';

const BlockEditor: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('text');
  const [tailwindClassArr, setTailwindClassArr] = useState<string[]>([]);
  const [blockProps, setBlockProps] = useState<Record<string, any>>({});
  const [marginStyles, setMarginStyles] = useState<{
    margins: MarginValues;
    marginClass: string;
  }>({
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
    marginClass: '',
  });
  const [paddingStyles, setPaddingStyles] = useState<{
    paddings: PaddingValues;
    paddingClass: string;
  }>({
    paddings: { top: 0, right: 0, bottom: 0, left: 0 },
    paddingClass: '',
  });

  const getBlockJson = (type: string) => {
    switch (type) {
      case 'text':
        return {
          type: "Block",
          props: {
            children: "", 
            tailwindClass: [""],
          }
        };
      case 'img':
        return {
          type: "Block",
          props: {
            alt: "",
            src: "",
            as: "img", 
            tailwindClass: [""],
          }
        };
      case 'transition':
        return {
          children: [],
          type: "Transition",
          props: {
            entry: "fadeInRight",
            speed: "medium",
            exit: "fadeOutRight",
            isEntering: true, 
            tailwindClass: [""],
          }
        };
      case 'list':
        return {
          props: {
            as: "ul", 
            tailwindClass: ['list-disc'],
          },
          children: [
            {
              props: {
                as: "li", 
                children: "", 
              },
              type: "Block"
            }
          ],
          type: "Block"
        };
      case 'row':
        return {
          type: "Block",
          props: { 
            tailwindClass: ['flex', 'flex-row'],
          }
        };
      case 'column':
        return {
          type: "Block",
          props: {
            tailwindClass: ['flex', 'flex-col'],
          }
        };
      default:
        return {};
    }
  };

  const mergeTailwindClasses = (base: string[], ...classStrings: string[]): string[] => {
    const extraClasses = classStrings.flatMap(str => str.split(' ').filter(Boolean));
    return Array.from(new Set([...base, ...extraClasses]));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    const json = getBlockJson(type);
    setBlockProps(json.props || {});
    setTailwindClassArr(json.props?.tailwindClass || []);
  };

  const handlePropChange = (key: string, value: any) => {
    setBlockProps((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const blockJson = {
    ...(getBlockJson(selectedType)),
    props: {
      ...blockProps,
      tailwindClass: mergeTailwindClasses(
        tailwindClassArr,
        marginStyles.marginClass,
        paddingStyles.paddingClass
      ),
      ...(selectedType === 'img' && { as: 'img' }),
      ...(selectedType === 'transition' && { isEntering: true }),
      ...(selectedType === 'list' && { as: 'ul' }),
    }
  };

  const animateSpeed = ["slowest", "slow", "medium", "fast", "fastest"];
  const animateEntrances = ["backInDown", "backInLeft", "backInRight", "backInUp", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeInTopLeft", "fadeInTopRight", "fadeInBottomLeft", "fadeInBottomRight", "flipInX", "flipInY", "lightSpeedInRight", "lightSpeedInLeft", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp"];
  const animateExits = ["backOutDown", "backOutLeft", "backOutRight", "backOutUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "fadeOutTopLeft", "fadeOutTopRight", "fadeOutBottomLeft", "fadeOutBottomRight", "flipOutX", "flipOutY", "lightSpeedOutRight", "lightSpeedOutLeft", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"];

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto">
      <label className="w-full">
        <MarginEditor
          margins={marginStyles.margins}
          setStyles={setMarginStyles}
        />
        <PaddingEditor
          paddings={paddingStyles.paddings}
          setStyles={setPaddingStyles}
        />
        <span className="block mb-1 font-semibold">Type:</span>
        <select value={selectedType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="text">Text</option>
          <option value="img">Image</option>
          <option value="transition">Transition</option>
          <option value="list">List</option>
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </label>

      {Object.keys(blockProps).length > 0 && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Props</h2>

          {selectedType === 'transition' && (
            <div className="flex gap-4 mb-4">
              {['entry', 'speed', 'exit'].map((key) => (
                <label key={key} className="flex flex-col flex-1">
                  <span className="font-medium capitalize">{key}</span>
                  <select
                    value={blockProps[key]}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select {key}</option>
                    {(key === 'entry' ? animateEntrances : key === 'exit' ? animateExits : animateSpeed).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {Object.entries(blockProps)
              .filter(([key]) => !['as', 'isEntering', 'tailwindClass', 'entry', 'exit', 'speed'].includes(key))
              .map(([key, value]) => (
                <label key={key} className="flex flex-col">
                  <span className="font-medium capitalize">{key}</span>
                  <input
                    type={typeof value === 'boolean' ? 'checkbox' : 'text'}
                    checked={typeof value === 'boolean' ? value : undefined}
                    value={typeof value !== 'boolean' ? value : undefined}
                    onChange={(e) =>
                      handlePropChange(
                        key,
                        typeof value === 'boolean' ? e.target.checked : e.target.value
                      )
                    }
                    className="p-2 border rounded"
                  />
                </label>
              ))}
          </div>
        </div>
      )}

      <pre className="bg-gray-100 p-4 rounded w-full overflow-auto max-h-[400px]">
        {JSON.stringify(blockJson, null, 2)}
      </pre>
    </div>
  );
};

export default BlockEditor;
