export type MarginValues = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type MarginEditorProps = {
  margins: MarginValues;
  setStyles: React.Dispatch<React.SetStateAction<{
    margins: MarginValues;
    marginClass: string;
  }>>;
};
