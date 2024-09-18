import { EnhancedTable } from "./Table";
import { useEffect, useMemo, useState } from "react";
import CustomPopup from "../CustomPopup";
import { useGetTasksQuery, updateTaskInCache } from "../../app/services/data/dataService";
import { DOSSIER_COLUMNS, TASK_COLUMNS, DATA_REFETCH_INTERVAL, TABS, RESULTS_COLUMNS } from "./constants";
import DossierData from "./DossierData";
import TaskData from "./TaskData";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDossier, setCurrentTask, setNewTaskData } from '../../app/features/dossier/dossierSlice';
import { STATUS, ROLE } from "common/constants/database.js";
import { NOUN } from "common/constants/translation.js";
import { Alert } from "@mui/material";

export const DataFrame = (props) => {
  const { className, dossierRows,
    specificTasks, taskParams, setTaskParams,
    refetchSpecificTasks, isTaskQueryUninitialized,
    isLoading} = props;
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [taskRows, setTaskRows] = useState([]);
  
  const dispatch = useDispatch();
  const currentDossier = useSelector(state => state.dossier.currentDossier);
  const currentTask = useSelector(state => state.dossier.currentTask);
  const newTaskData = useSelector(state => state.dossier.newTaskData);
  const isAdmin = useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
  
  const { data: tasks } = useGetTasksQuery({dossierId: currentDossier}, 
    {
      skip: !isPopupOpen,
      pollingInterval: DATA_REFETCH_INTERVAL,
    }
  );

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openTaskPopup = () => setIsTaskPopupOpen(true);
  const closeTaskPopup = () => setIsTaskPopupOpen(false);

  const expandDossier = async (id) => {
    dispatch(setCurrentDossier(id));
    openPopup();
  }

  const expandTask = async (id) => {
    dispatch(setCurrentTask(id));
    openTaskPopup();
  }

  useEffect(() => {
    if (newTaskData) {
      if (currentTask === -1) {
        setTaskParams({dossierId: currentDossier});
      } else {
        setTaskParams({taskId: currentTask});
      }

      dispatch(setNewTaskData(false));
    }

  }, [newTaskData]);

  useEffect(() => {
    if (taskParams && !isTaskQueryUninitialized && !isLoading) {
      setTimeout(() => refetchSpecificTasks(), 0);
    }
  }, [taskParams]);

  const transformTask = (task) => {
    const {
      deadline,
      createdAt,
      completedAt,
      startedAt,
      criterionDetails,
      productDetails,
      users,
      ...rest
    } = task;

    return {
      ...rest,
      assignees: users,
      criterion: criterionDetails,
      product: productDetails,
      deadline: deadline ? dayjs(deadline) : null,
      createdAt: dayjs(createdAt),
      completedAt: completedAt ? dayjs(completedAt) : null,
      startedAt: startedAt ? dayjs(startedAt) : null,
      productId: productDetails.name,
      criterionId: criterionDetails.name,
    };
  };

  // debug
  // const queries = useSelector(state => state.dataApi.queries);
  // useEffect(() => {
  //   if (queries) {
  //     console.log('queries', queries);
  //   }
  // }, [queries]);

  useEffect(() => {
    if (tasks) {
      const rows = tasks.map(transformTask);

      setTaskRows(rows);
    }
  }, [tasks]);

  useEffect(() => {
    if (specificTasks) {
      // console.log('dossier specificTasks', specificTasks);
      specificTasks.forEach(specificTask => {
        setTaskRows(prevTasks => prevTasks.map(task => {
          if (task.id === specificTask?.id) {
            dispatch(updateTaskInCache({taskId: task.id, updatedTaskData: specificTask, param: {dossierId: currentDossier}}));

            return transformTask(specificTask);
          }

          return task;
        }));
      });
    }
  }, [specificTasks]);

  const lateDossiers = useMemo(() => {
    return dossierRows.filter(dossier => dossier.status === STATUS.LATE).map(dossier => dossier.id);
  }, [dossierRows]);

  const activeDossiers = useMemo(() => {
    return dossierRows.filter(dossier => dossier.status !== STATUS.COMPLETED);
  }, [dossierRows]);

  const [currentTaskTab, setCurrentTaskTab] = useState(TABS.find(tab => tab.label === NOUN.OVERVIEW).index);

  return (
    <div className={`dataframe ${className} relative flex flex-col items-start gap-[20px]`}>
      <div className="inline-flex flex-col items-start flex-none relative">
        <div className="text-neutral-800 font-semibold text-[19px] leading-normal mt-[-1px] relative w-fit">{NOUN.INSPECTION_DOSSIER.toUpperCase()}</div>
      </div>
      {lateDossiers.length > 0 &&
        <div className={`late-alert w-full transition-all duration-700 ease-in-out 
        ${lateDossiers.length > 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <Alert variant="outlined" severity="error"
          sx={
            {
              fontSize: '15px',
              backgroundColor: '#fcedef',
            }
          }>
            {`${NOUN.DOSSIER} ID ${lateDossiers.join(', ')} đang trễ tiến độ.`}
          </Alert>
        </div>
      }
      <EnhancedTable 
        rows={isAdmin ? dossierRows : activeDossiers}
        handleRowClick={expandDossier}
        columns={DOSSIER_COLUMNS}
        tableTitle={NOUN.DOSSIER}
        isDossier={true}
      />

      <CustomPopup 
        content={
          <div className="flex flex-col gap-y-5">
            <DossierData dossier={dossierRows.find(dossier => dossier.id === currentDossier)} />
            <EnhancedTable 
                rows={taskRows}
                closePopup={closePopup}
                handleRowClick={expandTask}
                columns={currentTaskTab === TABS.find(tab => tab.label === NOUN.OVERVIEW).index ? TASK_COLUMNS : RESULTS_COLUMNS}
                tableTitle={NOUN.TASK}
                tabs={TABS}
                currentTab={currentTaskTab}
                setCurrentTab={setCurrentTaskTab}
            />
          </div>
        }

        isOpen={isPopupOpen}
        onClose={closePopup}
      />

      <CustomPopup
          content={
            <TaskData task={taskRows.find(task => task.id === currentTask)} />
          }
          isOpen={isTaskPopupOpen}
          onClose={closeTaskPopup}
      />
    </div>
  );
};
