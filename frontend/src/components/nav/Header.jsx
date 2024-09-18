import { useGetUserDetailsQuery } from '../../app/services/auth/authService'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react';
import { logout, setCredentials } from '../../app/features/auth/authSlice'
import CustomButton from '../Button';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { NOUN } from 'common/constants/translation';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // automatically authenticate user if token is found
  const { data, refetch, isError, error } = useGetUserDetailsQuery({
    // perform a refetch every 8 hours
    pollingInterval: 8 * 60 * 60 * 1000,
    // development only
    // pollingInterval: 1000,
  })

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isError && error.data.expired) {
      handleLogout();
    }
  }, [isError])

  useEffect(() => {
    refetch(); // Trigger an initial fetch on component mount
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data))
    }
  }, [data])

  return (
    <Box className="w-full flex items-center bg-neutral-900 h-14 justify-between">
      <div className="flex flex-row gap-4 px-5">
        <div className="frame-2 w-fit flex items-center">
          <Button className="outlined"
          disableRipple sx={{ color: 'white'}} startIcon={<HomeIcon />} onClick={() => navigate('/dashboard')}>
            {NOUN.HOME}
          </Button>
        </div>
        <div className="w-fit flex items-center">
          <Button disableRipple sx={{ color: 'white' }} 
          startIcon={<SettingsIcon />}
          onClick={() => navigate('/settings')}>
            {NOUN.SETTINGS}
          </Button>
        </div>
      </div>

      <div className="user-buttons flex gap-2 mr-3">
        <CustomButton className="bg-neutral-50 rounded-[36px]" label="Nhiệm vụ của tôi" text="text-[#111827]"
          onClick={() => navigate('/mytasks')} />
        <CustomButton className="bg-neutral-50 rounded-[36px]"
          label={userInfo?.firstName || "user"}
          text="text-[#111827]" />
        <IconButton onClick={handleLogout}>
          <LogoutIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </Box>
  );
}

export default Header;