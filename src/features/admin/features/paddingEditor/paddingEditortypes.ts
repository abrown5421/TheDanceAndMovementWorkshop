export type PaddingValues = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type PaddingEditorProps = {
  paddings: PaddingValues;
  setStyles: React.Dispatch<React.SetStateAction<{
    paddings: PaddingValues;
    paddingClass: string;
  }>>;
};