import React from "react";
import { PasswordHideAnd } from "./PasswordHideAnd/PasswordHideAnd";
import "./style.css";
import rectangle from "./Rectangle.png";
import logo from "./Logo.png";
import icons from "./Icons.svg";
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from "@mui/material";
import Button from "../../components/Button";
import Error from '../../components/Error'

import { useFormik } from "formik";
import { registerUser } from "../../app/features/auth/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const Register = () => {  
  const [admin, setAdmin] = React.useState(false);

  const handleCheck = (event) => {
    setAdmin(event.target.checked);
  };

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: data => {
      data.username = 'test5'
      data.admin = admin
      console.log(data)
      dispatch(registerUser(data))
    },
  });

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      // reset form?
    }
  }, [success])

  return (
    <div className="register-screen">
      <div className="group-wrapper">
        <div className="group">
          <div className="create-an-account">
            <div className="overlap">
              <div className="image-wrapper">
                <div className="image">
                  <div className="overlap-group">
                    <img className="rectangle" alt="Rectangle" src={rectangle} />
                    <div className="backdrop" />
                  </div>
                </div>
              </div>
              <div className="create-an-account-wrapper">
                <div className="frame-wrapper">
                  <form onSubmit={formik.handleSubmit} className="frame">
                    <div className="div-wrapper">
                      <div className="text-wrapper">Đăng kí tài khoản</div>
                    </div>
                    <div className="div">
                      <div className="frame-2">
                        <div className="label">ID Nhân Viên</div>
                      </div>
                      <div className="text-field flex items-center">
                          <input id="id" autoComplete="false" type="text"
                              onChange={formik.handleChange}
                              value={formik.values.id}
                              required
                              className="inputs w-4/5 h-5/6 mx-4" />
                        <img className="icons" alt="Icons" src={icons} />
                      </div>
                    </div>
                    <div className="div">
                      <div className="div">
                        <div className="frame-2">
                          <div className="label">Mật khẩu</div>
                          <div className="password-hide-see">
                            <PasswordHideAnd className="icon" property1="hide" />
                            <div className="text-wrapper-2">Hide</div>
                          </div>
                        </div>
                        <div className="text-field-2 flex items-center">
                          <input id="password" autoComplete="current-password" type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                            className="w-5/6 h-5/6 mx-4" />
                        </div>
                        <p className="error-message">
                          Use 8 or more characters with a mix of letters, numbers &amp; symbols
                        </p>
                      </div>
                    </div>
                    <div className="admin">
                      <FormControlLabel control={
                        <Checkbox checked={admin} 
                        onChange={handleCheck} />} 
                        label="Tài khoản admin" />
                    </div>
                    {error && <Error>{error}</Error>}
                    {success && <div>Tạo tài khoản thành công, ID {userInfo.id}, username '{userInfo.username}'</div>}
                    <Button type="submit"
                      loading={loading}
                      label="Tạo tài khoản"
                      className="!self-stretch !flex-[0_0_auto] !w-full"  />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="header-nav">
            <img className="logo" alt="Logo" src={logo} />
            {/* <div className="divider" /> */}
            {/* <img className="img" alt="Icons" src="image.svg" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
