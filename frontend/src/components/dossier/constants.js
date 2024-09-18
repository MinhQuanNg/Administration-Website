import { NOUN } from 'common/constants/translation.js'

export const DOSSIER_COLUMNS = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: NOUN.ID,
    },
    {
      id: "referenceId",
      numeric: false,
      disablePadding: false,
      label: NOUN.REFERENCE_ID,
    },
    {
      id: "deadline",
      numeric: false,
      disablePadding: false,
      label: NOUN.DEADLINE,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: NOUN.STATUS,
    },
    {
      id: "assignees",
      numeric: false,
      disablePadding: false,
      label: NOUN.ASSIGNEES,
    },
    {
      id: "progress",
      numeric: false,
      disablePadding: false,
      label: "",
    }
  ];

export const TASK_COLUMNS = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: NOUN.ID,
    },
    {
      id: "productId",
      numeric: false,
      disablePadding: false,
      label: NOUN.PRODUCT,
    },
    {
      id: "criterionId",
      numeric: false,
      disablePadding: false,
      label: NOUN.CRITERION,
    },
    {
      id: "deadline",
      numeric: false,
      disablePadding: false,
      label: NOUN.DEADLINE,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: NOUN.STATUS,
    },
    {
      id: "assignees",
      numeric: false,
      disablePadding: false,
      label: NOUN.ASSIGNEES,
    },
  ]

export const MYTASK_COLUMNS = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: NOUN.ID,
  },
  {
    id: "assignedAt",
    numeric: false,
    disablePadding: false,
    label: NOUN.TASK_ASSIGNMENT_DATE,
  },
  {
    id: "productId",
    numeric: false,
    disablePadding: false,
    label: NOUN.PRODUCT,
  },
  {
    id: "criterionId",
    numeric: false,
    disablePadding: false,
    label: NOUN.CRITERION,
  },
  {
    id: "deadline",
    numeric: false,
    disablePadding: false,
    label: NOUN.DEADLINE,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: NOUN.STATUS,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  }
]

export const RESULTS_COLUMNS = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: NOUN.ID,
    },
    {
      id: "productId",
      numeric: false,
      disablePadding: false,
      label: NOUN.PRODUCT,
    },
    {
      id: "criterionId",
      numeric: false,
      disablePadding: false,
      label: NOUN.CRITERION,
    },
    {
      id: "startedAt",
      numeric: false,
      disablePadding: false,
      label: NOUN.START_DATE,
    },
    {
      id: "completedAt",
      numeric: false,
      disablePadding: false,
      label: NOUN.COMPLETION_DATE,
    },
    {
      id: "notes",
      numeric: false,
      disablePadding: false,
      label: NOUN.NOTES,
    }
  ]

export const DATA_REFETCH_INTERVAL = 30 * 60 * 1000;
export const CHECK_UNSTARTED_TASKS_INTERVAL = 5 * 60 * 1000;

export const TABS = [{label: NOUN.OVERVIEW, index: 0}, {label: NOUN.RESULTS, index: 1}];

export const DATE_FIELDS = ['deadline', 'collectionDeadline', 'createdAt', 'completedAt', 'assignedAt', 'startedAt'];
