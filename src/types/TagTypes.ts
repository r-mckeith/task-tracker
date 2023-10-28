export interface TagProps extends NewTagProps {
  id: number;
  user_id: number;
  onRemove: (color: string, tag: string) => void;
  onSelect: () => void;
};

export type NewTagProps = {
  name: string;
  section: string;
}

export type TagDataProps = {
  id: number;
  user_id: number;
  tag_id: number;
  count: number;
}