import { TaskInterface } from '../../src/types/TaskTypes';
import TaskScreen from '../../components/task/TaskScreen'

export default function WeeklyScreen() {
  const filterTasks = (tasks: TaskInterface[]) => tasks.filter((t) => t.inScopeWeek);

  return (
    <TaskScreen
      filterTasks={filterTasks}
      navigateToAdd="ScopeWeek"
      navigateToReview="ReviewWeek"
    />
  );
}
