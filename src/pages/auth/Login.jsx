import HeadingAuth from "./components/HeadingAuth"
import FormAuth from "./components/FormAuth"
const Login = () => {
  return (
    <div className="flex flex-col justify-center gap-10">
      <HeadingAuth heading={'Login to your account'} />
      <FormAuth />
    </div>
  )
}

export default Login
