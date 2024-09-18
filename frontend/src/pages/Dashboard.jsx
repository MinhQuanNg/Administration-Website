import { Sidebar } from "../components/nav/Sidebar/Sidebar";
import { Subheader } from "../components/Subheader/Subheader";
import { DataFrame } from "../components/dossier/DataFrame";
import Header from "../components/nav/Header";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import dayjs from 'dayjs';
import { EnhancedTable } from "../components/dossier/Table";
import { useDispatch, useSelector } from "react-redux";
import { useGetDossiersQuery, useGetTasksQuery, 
  updateTaskInCache, useCheckUnstartedTasksQuery } from "../app/services/data/dataService";
import { MYTASK_COLUMNS, DATA_REFETCH_INTERVAL, 
  TABS, RESULTS_COLUMNS, CHECK_UNSTARTED_TASKS_INTERVAL } from "../components/dossier/constants";
import CustomPopup from "../components/CustomPopup";
import TaskData from "../components/dossier/TaskData";
import * as dossierApi from '../app/features/dossier/dossierSlice';
import { STATUS, ROLE } from "common/constants/database.js";
import { NOUN } from "common/constants/translation.js";
import Settings from "./Settings";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import notifSound from '../assets/sounds/notification.mp3';

const Dashboard = ({ section }) => {
  const { id } = useSelector(state => state.auth.userInfo);
  const [dossierRows, setDossierRows] = useState([]);
  const [taskRows, setTaskRows] = useState([]);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  const openTaskPopup = () => setIsTaskPopupOpen(true);
  const closeTaskPopup = () => setIsTaskPopupOpen(false);
  const [dossierId, setDossierId] = useState(null);
  const [taskParams, setTaskParams] = useState(null);
  const dispatch = useDispatch();
  const newDossierData = useSelector(state => state.dossier.newDossierData);
  const currentDossier = useSelector(state => state.dossier.currentDossier);
  const currentTask = useSelector(state => state.dossier.currentTask);
  const newTaskData = useSelector(state => state.dossier.newTaskData);
  const refetchMyTasks = useSelector(state => state.dossier.refetchMyTasks);
  const amTrained = useSelector(state => state.auth.userInfo.role) === ROLE.TRAINED.name;

  const { data: dossiers, refetch: refetchDossiers } = useGetDossiersQuery(
    {}, 
    // { page: 1, limit: 10 }
    { 
      pollingInterval: DATA_REFETCH_INTERVAL,
      skip: !section || section !== "dossier"
    }
  );

  const { data: specificDossier, refetch: refetchSpecificDossier, isUninitialized: isDossierQueryUninitialized } = useGetDossiersQuery({id: dossierId}, 
    { 
      skip: !dossierId,
    }
  );

  const { data: mytasks, refetch: refetchTasks } = useGetTasksQuery({user: id}, 
    {
      pollingInterval: DATA_REFETCH_INTERVAL,
      skip: !section || section !== "mytasks",
    }
  );

  const { data: initialMyTasks } = useGetTasksQuery({user: id});

  const { data: specificTasks, refetch: refetchSpecificTasks, isLoading, isUninitialized: isTaskQueryUninitialized } = useGetTasksQuery(taskParams, 
    { 
      skip: !taskParams,
    }
  );

  // SNACKBAR START
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const { data: unstartedTasksData } = useCheckUnstartedTasksQuery(id,
    {
      pollingInterval: CHECK_UNSTARTED_TASKS_INTERVAL,
      refetchOnMountOrArgChange: true,
    }
  );

  // Notification Audio
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  useEffect(() => {
    if (unstartedTasksData?.hasUnstartedTasks) {
      setSnackBarOpen(true);
      
      const audioContext = audioContextRef.current;
      const audioBuffer = audioBufferRef.current;
      if (audioContext && audioBuffer) {
        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.connect(audioContext.destination);
  
        audioSource.start();
      }
    }
  }, [unstartedTasksData]);

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  }

  useEffect(() => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const audioBufferPromise = fetch(notifSound)
      .then(response => response.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer));

    audioBufferPromise.then(audioBuffer => {
      audioBufferRef.current = audioBuffer;
    });
  }, []);

  // SNACKBAR END


  useEffect(() => {
    if (section === "dossier") {
      refetchDossiers();
      dispatch(dossierApi.setCurrentView("dossier"));
    } else if (section === "mytasks") {
      refetchTasks();
      dispatch(dossierApi.setCurrentView("mytasks"));
    }
  }, [section]);

  useEffect(() => {
    if (initialMyTasks && amTrained) {
      dispatch(dossierApi.setTrainedTaskCount(initialMyTasks.filter(task => task.status !== STATUS.COMPLETED && 
        task.criterionSpecs.equipment?.minRole === ROLE.TRAINED.name).length
      ));
      dispatch(dossierApi.setUntrainedTaskCount(initialMyTasks.filter(task => task.status !== STATUS.COMPLETED &&
        (task.criterionSpecs.equipment === null ||
        task.criterionSpecs.equipment.minRole === ROLE.UNTRAINED.name)).length
      ));
    }
  }, [initialMyTasks]);

  const transformDossier = (dossier) => {
    const { 
      intakeEmployeeDetails, 
      completedAt, 
      deadline, 
      collectionDeadline, 
      createdAt, 
      ...rest } = dossier;
    return {
      ...rest,
      employee: intakeEmployeeDetails,
      completedAt: completedAt ? dayjs(completedAt) : null,
      deadline: dayjs(deadline),
      collectionDeadline: dayjs(collectionDeadline),
      createdAt: dayjs(createdAt),
    };
  };

  useEffect(() => {
    if (dossiers) {
      const rows = dossiers.map(transformDossier);

      setDossierRows(rows);
    }
  }, [dossiers]);
  

  useEffect(() => {
    if (specificDossier) {
      setDossierRows(prevDossiers => prevDossiers.map(row => {
        if (row.id === specificDossier.id) {
          return transformDossier(specificDossier);
        }

        return row;
      }));
    }
  }, [specificDossier]);

  const transformTask = useCallback((specificTask) => {
    const { deadline, 
            createdAt,
            startedAt,
            completedAt,
            criterionDetails,
            productDetails,
            users,
            ...rest } = specificTask;
    return {
      ...rest,
      assignees: users,
      criterion: criterionDetails,
      product: productDetails,
      deadline: deadline ? dayjs(deadline) : null,
      createdAt: dayjs(createdAt),
      startedAt: startedAt ? dayjs(startedAt) : null,
      completedAt: completedAt ? dayjs(completedAt) : null,
      action: 'decline',
      productId: productDetails.name,
      criterionId: criterionDetails.name,
      assignedAt: dayjs(users.find(user => user.id === id).assignment.createdAt),
    };
  }, [id]);

  const filteredTasks = useMemo(() => {
    if (mytasks) {
      return mytasks.filter(task => task.users.some(user => user.id === id)).map(transformTask);
    }
    return [];
  }, [mytasks, id, transformTask]);
  
  useEffect(() => {
    setTaskRows(filteredTasks);
  }, [filteredTasks]);

  // debug
  // const queries = useSelector(state => state.dataApi.queries);
  // useEffect(() => {
  //   if (queries) {
  //     console.log('queries', queries);
  //   }
  // }, [queries]);

  useEffect(() => {
    if (specificTasks) {
      specificTasks.forEach(specificTask => {
        dispatch(updateTaskInCache({taskId: specificTask.id, updatedTaskData: specificTask, param: {dossierId: currentDossier}}));

        setTaskRows(prevTasks => prevTasks.map(task => {
          if (task?.id === specificTask.id) {
            // debug
            // console.log('updating task in cache', specificTask);

            return transformTask(specificTask);
          }

          return task;
        }));
      })
    }
  }, [specificTasks]);

  const expandTask = async (id) => {
    dispatch(dossierApi.setCurrentTask(id));
    openTaskPopup();
  }

  useEffect(() => {
    if (section === "mytasks" && newTaskData && currentTask !== -1) {
      setTaskParams({taskId: currentTask});

      dispatch(dossierApi.setNewTaskData(false));
    } else if (section === "mytasks" && newTaskData && currentTask === -1) {
      refetchTasks();
      dispatch(dossierApi.setNewTaskData(false));
    }
  }, [newTaskData]);

  useEffect(() => {
    if (section === "mytasks" && refetchMyTasks) {
      refetchTasks();
      dispatch(dossierApi.setRefetchMyTasks(false));
    }
  }, [refetchMyTasks]);

  useEffect(() => {
    if (section === "mytasks" && taskParams && !isTaskQueryUninitialized) {
      refetchSpecificTasks();
    }
  }, [taskParams]);

  useEffect(() => {
    if (newDossierData && currentDossier !== -1) {
      if (dossierId !== currentDossier) {
        setDossierId(currentDossier);
      } else {
        refetchSpecificDossier();
      }

      dispatch(dossierApi.setNewDossierData(false));
    } else if (newDossierData && currentDossier === -1) {
      refetchDossiers();
      dispatch(dossierApi.setNewDossierData(false));
    }
  }, [newDossierData, currentDossier]);

  // if dossierId changes, then wait until it changes to refetch
  useEffect(() => {
    if (dossierId && !isDossierQueryUninitialized) {
      setTimeout(() => refetchSpecificDossier(), 0);
    }
  }, [dossierId]);

  const [currentMytaskTab, setCurrentMytaskTab] = useState(TABS.find(tab => tab.label === NOUN.OVERVIEW).index);

  return (
    <div className="flex flex-col w-screen">
      <Header />
      <div className="admin-home flex flex-row">
        <Sidebar className="img w-fit"
        onFormSubmit={refetchDossiers} />
        <div className="flex flex-col w-full mx-[50px]">
          { (section === "dossier" || section === "mytasks") && <Subheader className="img-2" /> }
          {
            section === "dossier" && 
            <DataFrame className="img-3"
                dossierRows={dossierRows}
                specificTasks={specificTasks}
                refetchSpecificTasks={refetchSpecificTasks}
                taskParams={taskParams}
                setTaskParams={setTaskParams}
                isTaskQueryUninitialized={isTaskQueryUninitialized}
                isLoading={isLoading}
              /> 
          }
          {
            section === "mytasks" && 
              <EnhancedTable 
                rows={taskRows} 
                handleRowClick={expandTask} 
                columns={currentMytaskTab === TABS.find(tab => tab.label === NOUN.OVERVIEW).index ? MYTASK_COLUMNS : RESULTS_COLUMNS}
                tableTitle={"Nhiệm vụ của tôi"}
                mytasks={true}
                tabs={TABS}
                currentTab={currentMytaskTab}
                setCurrentTab={setCurrentMytaskTab}
              />
          }

          {
            section === "settings" && <Settings />
          }

          <CustomPopup
            content={
              <TaskData task={taskRows.find(task => task.id === currentTask)} />
              // <div>Task Data</div>
            }
            isOpen={isTaskPopupOpen}
            onClose={closeTaskPopup}
          />

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={5000}
            open={snackBarOpen}
            onClose={handleCloseSnackBar}
            color="error"
          >
            <Alert
              severity="warning" sx={{ fontWeight: 'bold', lineHeight: '20px' }}
              onClose={handleCloseSnackBar}
            >
                Bạn chưa bắt đầu một số nhiệm vụ.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
