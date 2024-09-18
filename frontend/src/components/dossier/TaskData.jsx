import { useState } from 'react';
import { Chip, Grid, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import StatusChip from './StatusChip';
import dayjs from 'dayjs';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useUpdateTaskMutation } from '../../app/services/data/dataService';

import { DATE_FIELDS } from './constants';
import { STATUS } from 'common/constants/database.js';
import { NOUN, ADJECTIVE } from 'common/constants/translation.js';

const InactiveChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  borderColor: theme.palette.error.dark, // Darker border for contrast
  borderRadius: 4, // Reduced border-radius for a more rectangular shape
  padding: '2px 8px', // Compact padding to resemble a tag
  height: '28px', // Adjusted height for a more tag-like appearance
  fontWeight: 500, // Bolder text for emphasis
  borderStyle: 'solid', // Adding solid border for a defined look
  borderWidth: '1px', // Thin border for a subtle tag-like effect
  textTransform: 'uppercase', // Uppercase text to mimic traditional tags
}));

const InactiveTag = () => {
  return <InactiveChip label="Đang chờ" variant="outlined" />;
};


const TaskData = ({ task, assignees }) => {
    const order = ['dossierId', 'createdAt', 'product', 'criterion', 
        'criterionSpecs', 'status', 'deadline', 'completedAt', 'images', 'notes'];
    const fieldHeight = 20;
    const [loading, setLoading] = useState(false);
    const [updateTask] = useUpdateTaskMutation();

    const editAttribute = async (key, value) => {
        setLoading(true);

        if (DATE_FIELDS.includes(key)) {
            value = dayjs(value, 'DD/MM/YYYY');
        }
        await updateTask({ id: task.id, [key]: value }).then(() => {
            task[key] = value;
        }).catch((err) => {
            console.log(err);
        });

        setLoading(false);
    }

    const renderItem = (key, nested=null) => {
        let attribute;
        let content = nested ? task[nested][key] : task[key];
        let contentElements = [];

        switch(key) {
            case 'dossierId':
                attribute = `${NOUN.DOSSIER} ID`;
                break;
            case 'createdAt':
                attribute = NOUN.TASK_CREATION_DATE;
                break;
            case 'product':
                attribute = NOUN.PRODUCT;
                content = <Chip key="product" label={content.name} />;
                break;
            case 'criterion':
                attribute = NOUN.CRITERION;
                content = <Chip key="criterion" label={content.name} />;
                break;
            case 'images':
                attribute = NOUN.IMAGES;

                content = content?.map((image, index) => (
                    <img src={image} alt={`task-img-${index}`} style={{ maxWidth: '100%' }} />
                ));

                // console.log("rerender task"); // TODO: why rerendering so much?
                break;
            case 'notes':
                attribute = NOUN.NOTES;
                content = <Textarea key="notes" minRows={4} name="Solid" placeholder="Nhập kết quả hoặc tài liệu khác..." variant="solid"
                                            defaultValue={content}
                                            sx={{
                                                minWidth: 400,
                                                backgroundColor: 'neutral.300',
                                                color: 'text.primary',
                                                '@media (max-width: 1300px)': { minWidth: '100%' }
                                            }} />
                break;
            case 'status':
                attribute = NOUN.STATUS;
                content = <StatusChip key="status" status={content} id={task.id} isDossier={false} isActive={task.isActive}/>;
                break;
            case 'deadline':
                attribute = NOUN.DEADLINE;
                break;
            case 'completedAt':
                attribute = NOUN.COMPLETION_DATE;
                break;
            case 'assignees':
                attribute = NOUN.ASSIGNEES;
                content = content.map((assignee) => (
                    <Chip key={assignee} label={`${assignee.firstName} ${assignee.lastName}`} avatar={<Avatar src={assignee.photo} />} />
                ));
                break;
            case 'sampleBatchId':
                attribute = NOUN.SAMPLE_BATCH_ID;
                break;
            case 'inspectionOrder':
                attribute = NOUN.ORDER;
                break;
            case 'duration':
                attribute = NOUN.DURATION;
                content = `${content} phút`;
                break;
            case 'equipment':
                attribute = NOUN.EQUIPMENT;
                content = content ? <Chip key="equipment" label={content.code} /> : ADJECTIVE.NOT_AVAILABLE;
                break;
            case 'maxAssignees':
                attribute = NOUN.MAX_ASSIGNEES;
                break;
            default:
                break;
        }

        if (content === null) {
            content = ADJECTIVE.NOT_AVAILABLE;
        } else if (DATE_FIELDS.includes(key)) {
            content = content.format('DD/MM/YYYY');
        }

        contentElements.push(content);

        if (key === 'images') {
            contentElements.push(<IconButton key="add-photo"><AddPhotoAlternateIcon /></IconButton>);
        } else if (key === 'notes') {
            contentElements.push
            (<IconButton key="save" 
                sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: fieldHeight, // custom icon size
                    }}}
                onClick={(e) => {
                    const value = e.target.closest('.task-prop-container').querySelector('textarea')?.value;
                    editAttribute(key, value);
                }}>
                {
                    loading[key] ? 
                    <CircularProgress size={fieldHeight} /> :
                    <SaveIcon 
                        sx={{color: 'primary'}}
                    />
                }
            </IconButton>);
            contentElements = <div className="flex flex-row items-start gap-x-2">{contentElements}</div>;
        }

        return (
            <Grid item xs={12} sm={6} key={key} >
                <div className="flex flex-col gap-y-1">
                    <Typography variant="body1">
                        <strong>{attribute}</strong>
                    </Typography>
                    <div className="task-prop-container flex flex-row gap-2 items-center">
                        {contentElements}
                    </div>
                </div>
            </Grid>
        )
    }

    return (
        <> 
            <div className="flex gap-x-3 items-center">
                <Typography variant="h5">
                    <strong>{`${NOUN.TASK} ID ${task.id}`}</strong>
                </Typography>
            {!task.isActive && task.status === STATUS.NOT_STARTED && <InactiveTag />}
            </div>
            <Grid container spacing={2} >
                {
                    order.map((key) => {
                        if (key === 'criterionSpecs') {
                            const specs = Object.keys(task[key]);
                            return specs.map((spec) => renderItem(spec, key));
                        } else {
                            return renderItem(key);
                        }
                    })
                }
                {renderItem(assignees)}
            </Grid>
        </>
    )
}

export default TaskData;