import Rectangle38 from "./Rectangle 38.svg";

import Button from "../Button";
import Error from '../Error'

import { useFormik } from "formik";
import { loginUser } from "../../app/features/auth/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


export const LoginBox = () => {
  const { loading, userToken, error } = useSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: data => {
      dispatch(loginUser(data))
    },
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userToken) {
      navigate('/dashboard')
    }
  }, [userToken])

  return (
    <div className="w-[900px] h-[564px] bg-transparent">
      <div className="relative h-[564px] bg-neutral-300 rounded-[20px] overflow-hidden">
        <img src={Rectangle38} className="absolute w-[450px] h-[564px] top-0 left-0" alt="Rectangle" />
        {/* <div className="inline-flex flex-col items-start gap-10 absolute top-[101px] left-[484px]"> */}
        <form onSubmit={formik.handleSubmit} className="inline-flex flex-col items-start gap-10 absolute top-[101px] left-[484px]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-neutral-800 text-[22px] tracking-[0] leading-[normal]">
              Login
            </div>
            <p className="relative w-fit [font-family:'Poppins-Light',Helvetica] font-light text-neutral-800 text-base tracking-[0] leading-[normal]">
              Đăng nhập vào tài khoản Công Ty Phương Nam
            </p>
          </div>
          <div className="inline-flex flex-col items-end gap-5 relative flex-[0_0_auto]">
            <div className="flex flex-col w-[370px] items-start gap-[5px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-neutral-800 text-sm tracking-[0] leading-[normal]">
                Username
              </div>
                <input id="username" autoComplete="username" type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      required
                      className="flex items-center self-stretch flex-[0_0_auto] bg-white rounded-[10px] border border-solid border-[#d4d4d4]
                      relative w-full h-12 px-3 py-1 mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-neutral-800 text-base tracking-[0] leading-[normal]" />
            </div>
            <div className="flex flex-col w-[370px] items-start gap-[5px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-neutral-800 text-sm tracking-[0] leading-[normal]">
                Password
              </div>
                <input id="password" autoComplete="current-password" type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      required
                      className="flex items-center self-stretch flex-[0_0_auto] bg-white rounded-[10px] border border-solid border-[#d4d4d4]
                      relative w-full h-12 px-3 py-1 mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-neutral-800 text-base tracking-[0] leading-[normal]" />
            
            {error && <Error>{error}</Error>}
            </div>

            <div className="relative w-fit [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-neutral-600 text-sm tracking-[0] leading-[normal]">
              Quên mật khẩu?
            </div>
            
            <Button type="submit" 
              className="!self-stretch !flex-[0_0_auto] !w-full bg-neutral-700 rounded-[15px]" 
              loading={loading}
              label="Đăng nhập"
              text="text-white" />
          </div>

        {/* </div> */}
        </form>
      </div>
    </div>
  );
};
