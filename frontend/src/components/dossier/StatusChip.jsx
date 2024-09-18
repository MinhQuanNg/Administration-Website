import React, { useEffect, useState } from 'react';
import { Chip, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { STATUS, ROLE } from 'common/constants/database.js'
import { useUpdateDossierMutation, useUpdateTaskMutation } from '../../app/services/data/dataService';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDossier, setCurrentTask, setNewDossierData, setNewTaskData } from '../../app/features/dossier/dossierSlice';

const StatusChip = ({ status, id, isDossier, isActive, isAssigned }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [tempStatus, setTempStatus] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateDossier] = useUpdateDossierMutation();
  const [updateTask] = useUpdateTaskMutation(); 
  const isAdmin = useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
  const dispatch = useDispatch();
  const dossierView = useSelector(state => state.dossier.currentView) === 'dossier';

  const statuses = [
    { label: STATUS.NOT_STARTED, color: 'default' },
    { label: STATUS.PENDING, color: 'warning' },
    { label: STATUS.COMPLETED, color: 'success' },
    { label: STATUS.LATE, color: 'error' },
  ];

  // Set selected status when status prop changes
  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (status) => {
    setTempStatus(status.label);
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirm = () => {
    setConfirmOpen(false);

    try {
      // Call API to update status
      if (isDossier) {
        updateDossier({ id: id, status: tempStatus }).then(() => {
          setSelectedStatus(tempStatus);
          dispatch(setCurrentDossier(id));
          dispatch(setNewDossierData(true));
        })
      } else {
        updateTask({ id: id, status: tempStatus }).then(({data}) => {
          setSelectedStatus(tempStatus);
          if (tempStatus === STATUS.COMPLETED) {
            dispatch(setCurrentTask(-1));
          } else {
            dispatch(setCurrentTask(id));
          }
          dispatch(setNewTaskData(true));

          if (data.refetch && dossierView) {
            dispatch(setNewDossierData(true));
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Chip
        label={selectedStatus}
        color={statuses.find(s => s.label === selectedStatus)?.color || 'info'}
        // if dossier and not admin or not active or not assigned, disable click
        {...(!isAdmin && (isDossier || (isActive !== undefined && !isActive) || 
          (isAssigned !== undefined && !isAssigned)) ? 
          {sx: {cursor: 'auto'}} : { onClick: handleChipClick })
        }
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {statuses.filter(s => s.label !== selectedStatus).map((status) => (
          <MenuItem
            key={status.label}
            onClick={() => handleStatusClick(status)}
            style={{ color: status.color }}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn chắc chắn muốn thay đổi trạng thái thành "{tempStatus?.label}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">Hủy</Button>
          <Button onClick={handleConfirm} color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusChip;