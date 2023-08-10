import { TaskInterface } from '../../src/types/TaskTypes';
import TaskScreen from '../../components/task/TaskScreen'

export default function DailyScreen() {
  const filterTasks = (tasks: TaskInterface[]) => tasks.filter((t) => t.inScopeQuarter);

  return (
    <TaskScreen
      filterTasks={filterTasks}
      navigateToAdd="ScopeQuarter"
      navigateToReview="ReviewQuarter"
    />
  );
}