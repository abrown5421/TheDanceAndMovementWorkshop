import type { MarginValues } from "../marginEditor/marginEditortypes";

export interface TextProps {
  children: string;
  tailwindClasses?: string; 
}

export interface TextStyles {
  size: string;
  weight: string;
  underline: boolean;
  italic: boolean;
  font: string;
  paddings: MarginValues;
  margins: MarginValues;
  paddingClass: string,
  marginClass: string
}

export interface TextRibbonEditorProps {
  textStyles: TextStyles;
  setTextStyles: React.Dispatch<React.SetStateAction<TextStyles>>;
}