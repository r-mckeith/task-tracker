interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurringOptions: {
    isRecurring: boolean | null;
    selectedDays: string | null;
    timesPerDay: string | null;
  };
  depth: number;
}

const apiCall = (): Task[] => [
  {
    id: 1,
    name: 'Health',
    parentId: null,
    completed: false,
    recurringOptions: {
      isRecurring: null,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 0,

  },
  {
    id: 2,
    name: 'Wealth',
    parentId: null,
    completed: false,
    recurringOptions: {
      isRecurring: null,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 0,
  },
  {
    id: 3,
    name: 'Relationships',
    parentId: null,
    completed: false,
    recurringOptions: {
      isRecurring: null,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 0,
  },
  {
    id: 4,
    name: 'Not tied to goals',
    parentId: null,
    completed: false,
    recurringOptions: {
      isRecurring: null,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 0,
  },
  {
    id: 5,
    name: 'Get off blood pressure meds',
    parentId: 1,
    completed: false,
    recurringOptions: {
      isRecurring: null,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 1,
  },
  {
    id: 6,
    name: 'Walk 20 minutes a day',
    parentId: 5,
    completed: false,
    recurringOptions: {
      isRecurring: true,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 2,
  },
  {
    id: 7,
    name: 'Track macros',
    parentId: 5,
    completed: false,
    recurringOptions: {
      isRecurring: true,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 2,
  },
  {
    id: 8,
    name: 'Buy walking shoes',
    parentId: 6,
    completed: true,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 3,
  },
  {
    id: 9,
    name: 'Map routes',
    parentId: 6,
    completed: true,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 3,
  },
  {
    id: 10,
    name: 'Start business to quit my job',
    parentId: 2,
    completed: false,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 1,
  },
  {
    id: 11,
    name: 'Write business plan',
    parentId: 10,
    completed: false,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 2,
  },
  {
    id: 12,
    name: 'Read 20 mins business lit',
    parentId: 10,
    completed: false,
    recurringOptions: {
      isRecurring: true,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 2,
  },
  {
    id: 13,
    name: 'Buy Atomic Habits',
    parentId: 12,
    completed: true,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 3,
  },
  {
    id: 14,
    name: 'Build website',
    parentId: 10,
    completed: false,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 2,
  },
  {
    id: 15,
    name: 'Buy domain',
    parentId: 14,
    completed: true,
    recurringOptions: {
      isRecurring: false,
      selectedDays: null,
      timesPerDay: null,
    },
    depth: 3,
  },
]

export default apiCall;