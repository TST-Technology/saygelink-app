import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useHttp from '../../hooks/use-http'
import {
  ButtonWithShedo,
  Card,
  CheckBoxField,
  ForGotText,
  InputField,
  Lable
} from '../../style-component/auth/login'
import { DarkGrayLable, PinkLink } from '../../style-component/general'
import CONSTANT, {
  ROUTES,
  userInviteEmail,
  UserProfile
} from '../../utils/constants'
import { UserContext } from '../../context/user'

const LoginIDPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const loginApi = useHttp()
  const navigate = useNavigate()
  const { setUser, user } = useContext(UserContext)

  const CheckUserResponseHandeler = (res) => {
    if (res?.data?.verified == 'pending') {
      navigate('/auth/pendingreq')
    } else if (!res?.data?.registered && res?.data?.verified === 'verified') {
      userInviteEmail.userData = res?.data
      navigate('/register')
    } else if (res?.data?.registered && res?.data?.verified === 'verified') {
      setIsPasswordVisible(true)
    }
  }

  const CheckUserErrorHandeler = (message) => {
    console.log(message)
    if (message.includes('is not in whitelist')) {
      navigate('/auth/invitelink')
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    if (isPasswordVisible) {
      const payload = {
        email: e.target.email.value,
        password: e.target.password.value
      }
      loginApi.sendRequest(CONSTANT.API.login, LoginHandeler, payload)
    } else {
      const url = {
        ...CONSTANT.API.checkUser,
        endpoint: `/auth/whitelist/${process.env.REACT_APP_UNIVERSITY_ID}/${e.target.email.value}`
      }
      loginApi.sendRequest(
        url,
        CheckUserResponseHandeler,
        null,
        null,
        CheckUserErrorHandeler
      )
    }
  }

  const LoginHandeler = (res) => {
    if (res?.token) {
      localStorage.setItem('authToken', res?.token)
      localStorage.setItem('email', res?.user?.email)
      UserProfile.userDetails['token'] = res?.token
      setUser(res)
      console.log(res)
      setTimeout(() => {
        console.log('called')
        navigate(ROUTES.HOME)
      }, 2000)
    }
  }

  return (
    <Card isPasswordVisible={isPasswordVisible}>
      <form onSubmit={formSubmitHandler}>
        <DarkGrayLable>Login</DarkGrayLable>
        <InputField
          name='email'
          type='email'
          required={true}
          placeholder='Email'
          disabled={isPasswordVisible}
        />

        {isPasswordVisible && (
          <InputField
            name='password'
            type='password'
            required={true}
            placeholder='password'
          />
        )}
        {isPasswordVisible && (
          <Link to='/auth/forgotPassword' style={{ textDecoration: 'none' }}>
            <ForGotText>Forgot Password ?</ForGotText>
          </Link>
        )}
        <Lable htmlFor='term'>
          <CheckBoxField type='checkbox' id='term' required={true} />
          &nbsp; Agree to &nbsp;
          <PinkLink
            href='https://www.saygelink.com/term-of-use'
            target='_blank'
          >
            Term & Conditions
          </PinkLink>
        </Lable>
        <ButtonWithShedo disabled={loginApi.isLoading}>
          {loginApi.isLoading
            ? 'Loading...'
            : isPasswordVisible
            ? 'Login'
            : 'Verify Email'}
        </ButtonWithShedo>
      </form>
    </Card>
  )
}

export default LoginIDPassword
