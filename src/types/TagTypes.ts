export interface TagProps extends NewTagProps {
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
}

export enum DateRange {
  Today,
  ThisWeek,
  ThisMonth,
  ThisYear
}