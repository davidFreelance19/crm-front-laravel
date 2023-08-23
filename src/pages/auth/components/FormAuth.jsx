import { useNavigate, useLocation, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
const FormAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, setName, email, setEmail, password, setPassword, handleSubmit } = useAuth();
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e, location.pathname)}>

                        {location.pathname.includes('sign-up') ?
                            (
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Full name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            ) : <></>
                        }
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className={`${location.pathname.includes('sign-up') ? 'hidden' : ''} text-sm flex justify-end`}>
                            <Link
                                to="#"
                                className="font-medium text-[#fe8700] transition-colors hover:text-[#FEAF00] text-end"
                            >
                                Forget your password?
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#fe8700] transition-colors hover:bg-[#FEAF00]"
                            >
                                {location.pathname.includes('login') ? 'Login now' : 'Register account'}
                            </button>
                            <div className="text-sm flex justify-center">
                                <p>{location.pathname.includes('login') ? "Don't have an account?" : "Already have an account?"} {' '}
                                    <span>
                                        <Link
                                            to={location.pathname.includes('login') ? '/sign-up' : '/login'}
                                            className="font-medium text-[#fe8700] transition-colors hover:text-[#FEAF00] text-end"
                                        >
                                            {location.pathname.includes('login') ? "Sign up" : "Log in"}
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default FormAuth
