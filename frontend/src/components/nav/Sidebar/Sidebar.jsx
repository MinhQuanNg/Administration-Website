import React, { useState } from 'react';
import './style.css';
import CustomPopup from '../../CustomPopup';
import Button from '@mui/material/Button';
import CustomButton from '../../Button';
import DossierForm from '../../dossier/DossierForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { ROLE } from 'common/constants/database';

const CreateDossierButton = ({ onClick }) => (
  <CustomButton
    className="div-2 rounded-[10px] bg-[#E5E5E5] h-10"
    label="HỒ SƠ MỚI"
    onClick={onClick}
  />
);

export const Sidebar = ({ className, onFormSubmit }) => {
  const isAdmin = useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleChange = (index) => (event, isExpanded) => {
    const newExpanded = expanded.map((exp, i) => (i === index ? isExpanded : exp));
    setExpanded(newExpanded);
  };

  const sidebarData = [
    {
      title: 'Hồ sơ',
      content: ['Hạng mục', 'Nhiệm vụ']
    },
    {
      title: 'Thiết bị', 
      content: ['Tất cả']
    },
    { title: 'Nhân viên' },
    { title: 'Chỉ tiêu' },  
  ];

  const [expanded, setExpanded] = useState(Array(sidebarData.length).fill(false));

  return (
    <div className={`sidebar ${className} min-h-screen`} style={{ backgroundColor: 'var(--neutral-800)' }}>
      <div className="sidebar-content">
        {isAdmin && 
          <div className="frame-wrapper">
            <CreateDossierButton onClick={openPopup} />
            <CustomPopup content={<DossierForm onFormSubmit={onFormSubmit} onClose={closePopup}/>}
                      isOpen={isPopupOpen} onClose={closePopup}/>
          </div>
        }
        {sidebarData.map((item, index) => (
          <Accordion key={index} expanded={expanded[index]} onChange={handleChange(index)}
            style={{ backgroundColor: 'var(--neutral-800)', color: 'white', padding: '0 15px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white'}} />}>
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            {item.content && (
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  {item.content.map((content, index) =>
                  (<div className="sidebar-item">
                    <Button className="sidebar-button w-full" sx={{ justifyContent: 'flex-start', color: 'white' }}>{content}</Button>
                  </div>)
              )}
                </Box>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

// export default Sidebar;