import { Chip, Grid, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import StatusChip from './StatusChip';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs'
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import { useUpdateDossierMutation } from '../../app/services/data/dataService';

import { NOUN, ADJECTIVE } from 'common/constants/translation.js';
import { DATE_FIELDS } from './constants';

const DossierData = ({ dossier }) => {
    const order = ['referenceId', 'branch', 'status', 'deadline', 'collectionDeadline', 'createdAt', 'completedAt', 'employee', 'images'];

    const [editing, setEditing] = useState({});
    const [loading, setLoading] = useState({});
    const [updateDossier] = useUpdateDossierMutation();
    const fieldHeight = 20;

    const editAttribute = async (key, value) => {
        setLoading((prev) => ({ ...prev, [key]: true }));

        if (editing[key]) {
            if (DATE_FIELDS.includes(key)) {
                value = dayjs(value, 'DD/MM/YYYY');
            }
            await updateDossier({ id: dossier.id, [key]: value }).then(() => {
                dossier[key] = value;
            }).catch((err) => {
                console.log(err);
            });
        }

        setEditing((prev) => ({ ...prev, [key]: !prev[key] }));
        setLoading((prev) => ({ ...prev, [key]: false }));
    }

    const renderItem = (key) => {
        let attribute;
        let content = dossier[key];
        let notEditable = [];
        let contentElements = [];

        switch (key) {
            case 'referenceId':
                attribute = NOUN.REFERENCE_ID;
                break;
            case 'branch':
                attribute = NOUN.BRANCH;
                break;
            case 'status':
                attribute = NOUN.OVERALL_STATUS;
                content = <StatusChip key={key} status={content} id={dossier.id} isDossier={true} />;
                notEditable.push(key);
                break;
            case 'deadline':
                attribute = NOUN.OVERALL_DEADLINE;
                break;
            case 'collectionDeadline':
                attribute = NOUN.COLLECTION_DEADLINE;
                break;
            case 'createdAt':
                attribute = NOUN.DOSSIER_CREATION_DATE;
                notEditable.push(key);
                break;
            case 'completedAt':
                attribute = NOUN.COMPLETION_DATE;
                notEditable.push(key);
                break;
            case 'employee':
                attribute = NOUN.INTAKE_EMPLOYEE;
                content = <Chip key={key} label={content? `${content.lastName} ${content.firstName}` : `${NOUN.EMPLOYEE} đã bị xoá`} avatar={<Avatar src={content.photo} />} />;
                notEditable.push(key);
                break;
            case 'images':
                attribute = NOUN.IMAGES;

                content = content?.map((image, index) => (
                    <img src={image} alt={`dossier-img-${index}`} style={{ maxWidth: '100%' }} />
                ));

                notEditable.push(key);
                
                // console.log('rerender dossier'); // TODO: why rerendering so much?
                break;
            default:
                break;
        }

        if (editing[key]) {
            if (DATE_FIELDS.includes(key)) {
                contentElements.push
                (<div 
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setEditing((prev) => ({ ...prev, [key]: false }));
                        }
                    }}
                >
                    <DatePicker className='dossier-edit-field'
                        defaultValue={content}
                        
                        sx={{ '& .MuiInputBase-input': {
                            padding: '6px',
                        },}}

                        autoFocus
                    />
                </div>
                );
            } else {
                contentElements.push(
                    <TextField
                        defaultValue={content}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setEditing((prev) => ({ ...prev, [key]: false }));
                            }
                        }}
                        sx={{ '& .MuiInputBase-input': {
                            padding: '6px',
                        },}}

                        autoFocus
                    />
                );
            }
        } else {
            if (!content) {
                content = ADJECTIVE.NOT_AVAILABLE;
            } else if (DATE_FIELDS.includes(key)) {
                content = content.format('DD/MM/YYYY');
            }

            contentElements.push(content);
        }

        if (!notEditable.includes(key)) {
            contentElements.push
            (<IconButton key={key}
                sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: fieldHeight, // custom icon size
                    }}}
                onClick={(e) => {
                    const value = e.target.closest('.dossier-prop-container').querySelector('input')?.value;
                    editAttribute(key, value);
                }}
            >
                {
                    editing[key] ? ( loading[key] ? 
                    <CircularProgress size={fieldHeight} /> :
                    <CheckIcon 
                        sx={{color: 'green'}}
                    /> ) : 
                    <EditIcon 
                        sx={{color: 'primary'}}
                    />
                }
            </IconButton>);
        } else if (key === 'images') {
            contentElements.push(<IconButton key={key}><AddPhotoAlternateIcon /></IconButton>);
        }

        return (
            <Grid item xs={12} sm={6} key={key} >
                <div className="flex flex-col gap-y-1">
                    <Typography variant="body1">
                        <strong>{attribute}</strong>
                    </Typography>
                    <div className="dossier-prop-container flex flex-row gap-2 items-center">
                        {contentElements}
                    </div>
                </div>
            </Grid>
        );
    }

    return (
        dossier && 
        <>
            <Typography variant="h5"><strong>{`${NOUN.DOSSIER} ID ${dossier.id}`}</strong></Typography>
            <Grid container spacing={2} >
                {order.map((key) => renderItem(key))}
            </Grid>
        </>
    )
}

export default DossierData;