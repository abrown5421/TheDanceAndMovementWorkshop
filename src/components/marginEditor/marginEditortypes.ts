import type { TextStyles } from "../text/textTypes";

export type MarginValues = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export interface MarginEditorProps {
  margins: MarginValues;
  setTextStyles: React.Dispatch<React.SetStateAction<TextStyles>>;
}
