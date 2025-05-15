import type { TextStyles } from "../text/textTypes";

export type PaddingValues = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export interface PaddingEditorProps {
  paddings: PaddingValues;
  setTextStyles: React.Dispatch<React.SetStateAction<TextStyles>>;
}
