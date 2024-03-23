export interface Tag extends NewTagProps {
  id: number;
  user_id: number;
  tag_data: TagDataProps[]; 
};

export type NewTagProps = {
  name: string;
  section: string;
}

export type TagDataProps = {
  created_at: Date;
  tag_id: number;
  count: number;
  tag_name: string;
  date: Date;
}

export enum DateRange {
  Today,
  ThisWeek,
  ThisMonth,
  ThisYear
}

export interface TagProps extends NewTagProps {
  id: number;
  user_id: number;
  tag_data: TagDataProps[];
  inScopeDay?: string | null;
  completed?: string | null;
  depth?: number;
  parentId?: number; 
};