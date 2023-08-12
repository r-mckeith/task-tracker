import { TaskInterface } from '../../src/types/TaskTypes';
import TaskScreen from '../../components/task/TaskScreen'
import { todayFormatted } from '../../helpers/taskHelpers';

export default function WeeklyScreen() {
  const filterTasks = (tasks: TaskInterface[]) => tasks.filter((t) => t.inScopeWeek && t.inScopeWeek.toString() === todayFormatted);

  return (
    <TaskScreen
      filterTasks={filterTasks}
      navigateToAdd="ScopeWeek"
      navigateToReview="ReviewWeek"
    />
  );
}
