import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CustomPopup from "../CustomPopup";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateDossierMutation, useUpdateTaskMutation } from "../../app/services/data/dataService";
import { setCurrentDossier, setCurrentTask, setNewDossierData, setNewTaskData } from '../../app/features/dossier/dossierSlice';
import { useDispatch } from 'react-redux';
import { ROLE } from 'common/constants/database.js';

const CustomDatePicker = (props) => {
    const { id, deadline, isDossier } = props;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formattedDeadline, setFormattedDeadline] = useState('');
    const [newDeadline, setNewDeadline] = useState(null);
    const textFieldRef = useRef(null);
    const isAdmin = useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
    const dispatch = useDispatch();

    const [updateDossier] = useUpdateDossierMutation();
    const [updateTask] = useUpdateTaskMutation();

    const openPopup = () => {
        setIsPopupOpen(true);
        setNewDeadline(deadline);
    }
    const closePopup = () => setIsPopupOpen(false);

    const handleConfirm = async () => {
        try {
            if (isDossier) {
                await updateDossier({ id: id, deadline: newDeadline }).then(() => {
                    dispatch(setCurrentDossier(id));
                    dispatch(setNewDossierData(true));
                })
            } else {
                await updateTask({ id: id, deadline: newDeadline }).then(() => {
                    dispatch(setCurrentTask(id));
                    dispatch(setNewTaskData(true));
                })
            }
        } catch (error) {
            console.error(error);
        }

        closePopup();
    }

    useEffect(() => {
        if (!isPopupOpen) {
            textFieldRef.current?.blur();
        }
    }, [isPopupOpen]);

    useEffect(() => {
        if (deadline) {
            // if task data, format deadline to include time
            setFormattedDeadline(dayjs(deadline).format('DD/MM/YYYY' + (isDossier ? '' : ' HH:mm')));
        }
    }, [deadline]);

    const DatePickerPopup = () => {
        return (
            <div className="flex flex-row items-center gap-4">
                {isDossier ? (
                    <DatePicker value={dayjs(newDeadline)} 
                        onChange={(newDeadline) => setNewDeadline(newDeadline)}
                    />
                ) : (
                    <div onClick={(e) => e.stopPropagation()}>
                        <DateTimePicker value={dayjs(newDeadline)} 
                            onChange={(newDeadline) => setNewDeadline(newDeadline)}
                        /> 
                    </div>
                )}
                <IconButton color="success" aria-label="change deadline"
                    onClick={handleConfirm} >
                    <CheckIcon />
                </IconButton>
            </div>
        )
    }

    return (
        !isAdmin ? <>{formattedDeadline}</> :
        <>
            <TextField value={formattedDeadline} onClick={openPopup}
                sx={{ width: isDossier ? 110 : 150, 
                    '& .MuiInputBase-input': {
                        padding: '10px',
                        textAlign: 'center',
                        }
                    }}
                InputProps={{
                    readOnly: true,
                  }}
                inputRef={textFieldRef}
            />

            <CustomPopup isOpen={isPopupOpen} onClose={closePopup}
                content={<DatePickerPopup />} />
        </>
    );
}

export default CustomDatePicker;