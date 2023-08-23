import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../pages/auth/hooks/useAuth"
import Drawer from "../pages/home/components/Drawer"
import Loader from "../components/Loader"
const LayoutHome = () => {
    const { auth, cargando } = useAuth()
    if (cargando) return <Loader />
    return (
        <>
            {auth?.id ?
                (
                    <div className="h-screen w-screen bg-gray-100 grid"
                        style={{
                            gridTemplateColumns: '170px auto'
                        }}
                    >
                        <Drawer />
                        <div className='grid h-full py-10 w-[90%] max-w-[1200px] mx-auto' style={{
                            gridTemplateRows: '80px 85%'
                        }}>
                            <Outlet />
                        </div>
                    </div>
                )
                : <Navigate to='/login' />}
        </>
    )
}

export default LayoutHome
