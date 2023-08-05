import { TaskInterface } from "./TaskTypes";

export type DoStackParamList = {
  Daily: undefined;
  Week: undefined;
  Quarter: undefined;
  ReviewDay: { tasks: TaskInterface[] };
};
