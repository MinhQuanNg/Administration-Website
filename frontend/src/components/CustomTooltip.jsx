import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#E7FEFF',
      color: theme.palette.common.black,
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

export default LightTooltip;