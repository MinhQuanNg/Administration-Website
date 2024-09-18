import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useUpdateTaskMutation, useDeleteTaskAssigneeMutation } from '../../app/services/data/dataService';
import { useSelector, useDispatch } from 'react-redux';
import * as dossierApi from '../../app/features/dossier/dossierSlice';

const CustomIconButton = styled(IconButton)(({ theme, accepted }) => ({
    backgroundColor: accepted ? '#b2f2bb' : '#2196F3', // Vibrant blue for action
    color: accepted ? '#2e7d32' : '#fff', // White text for action
    borderRadius: '20px', // More rounded corners
    padding: theme.spacing(0.5, 1.5), // Smaller padding
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition for hover effects
    '&:hover': {
      backgroundColor: accepted ? '#a5d6a7' : '#1976D2', // Slightly darker blue on hover for action
      transform: 'translateY(-2px)', // Slight lift effect on hover
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '110px', // Fixed width for consistency
}));

const ButtonLabel = styled(Typography)({
  marginLeft: '8px',
  fontWeight: 500,
  fontSize: '12px', // Smaller font size
  whiteSpace: 'nowrap', // Prevents text from wrapping
  padding: '2px 0',
});

function AcceptTaskButton(props) {
    const { taskId, isAssigned, dossierId, 
        canAccept = true, reason, trainedTask } = props;
    const [accepted, setAccepted] = useState(isAssigned);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTaskAssignee] = useDeleteTaskAssigneeMutation();
    const id = useSelector(state => state.auth.userInfo.id);
    const dispatch = useDispatch();
    const currentTrainedTaskCount = useSelector(state => state.dossier.trainedTaskCount);
    const currentUntrainedTaskCount = useSelector(state => state.dossier.untrainedTaskCount);

    useEffect(() => {
        setAccepted(isAssigned); // Update the state when the prop changes
    }, [isAssigned]);

    const handleClick = async () => {
        try {
            if (!accepted) {
                await updateTask({id: taskId, assignees: id});
                if (trainedTask) {
                    dispatch(dossierApi.setTrainedTaskCount(currentTrainedTaskCount + 1));
                } else {
                    dispatch(dossierApi.setUntrainedTaskCount(currentUntrainedTaskCount + 1));
                }
            } else {
                await deleteTaskAssignee({taskId: taskId, assignee: id});
                if (trainedTask) {
                    dispatch(dossierApi.setTrainedTaskCount(currentTrainedTaskCount - 1));
                } else {
                    dispatch(dossierApi.setUntrainedTaskCount(currentUntrainedTaskCount - 1));
                }

                dispatch(dossierApi.setRefetchMyTasks(true));
            }

            if (!!props.mytasks) {
                dispatch(dossierApi.setCurrentDossier(dossierId));
            }

            dispatch(dossierApi.setCurrentTask(taskId));
            dispatch(dossierApi.setNewTaskData(true));

            dispatch(dossierApi.setNewDossierData(true));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Tooltip disableFocusListener disableTouchListener {...(!canAccept ? {title: reason} : {})}
                slotProps={{
                    popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -10],
                            },
                        },
                    ],
                    },
                }}
        >
            <CustomIconButton accepted={accepted ? 'true' : undefined}
            {...(canAccept ? { onClick : handleClick } : {
                sx: {
                    '&:hover': {
                        backgroundColor: '#9e9e9e',
                        transform: 'none',
                    },
                    backgroundColor: '#9e9e9e',
                },
                disableRipple: true,
            })}
            >
                {accepted ? (
                <>
                    <CheckCircleIcon fontSize="small" />
                    <ButtonLabel variant="button">Đã nhận</ButtonLabel>
                </>
                ) : (
                <>
                    <CheckCircleOutlineIcon fontSize="small" />
                    <ButtonLabel variant="button">Nhận</ButtonLabel>
                </>
                )
                }
            </CustomIconButton>
        </Tooltip>
    );
}

export default AcceptTaskButton;
