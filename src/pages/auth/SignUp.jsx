import FormAuth from "./components/FormAuth"
import HeadingAuth from "./components/HeadingAuth"
const SignUp = () => {
    return (
        <div className="flex flex-col justify-center gap-10">
            <HeadingAuth heading={'Create an account'} />
            <FormAuth />
        </div>
    )
}

export default SignUp
