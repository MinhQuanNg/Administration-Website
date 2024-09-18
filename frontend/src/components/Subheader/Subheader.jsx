import CustomSearch from "./CustomSearch";
import "./style.css";
import SettingsIcon from '@mui/icons-material/Settings';
import { ROLE } from "common/constants/database.js";
import { NOUN, VERB } from "common/constants/translation.js";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export const Subheader = ({className}) => {
  const isAdmin = useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
  return (
    <div className={`subheader ${className}`} >
      <div className="div flex justify-between items-center mt-[22px]">
        <div className ="flex flex-row items-center gap-[30px]">
          <div className="text-[#262626] font-semibold text-[22px] [font-family:'Poppins-Medium',Helvetica] leading-normal mt-[-1px] relative w-fit">
            {isAdmin && `${VERB.MANAGE.toUpperCase()} `}HỆ THỐNG NỘI BỘ
          </div>
          <div className="frame-wrapper">
            <div className="div-2">
              <Button variant="text" startIcon={<SettingsIcon />} >
                {NOUN.SETTINGS}
              </Button>
            </div>
          </div>
        </div>
        <CustomSearch />
      </div>
    </div>
  );
};
