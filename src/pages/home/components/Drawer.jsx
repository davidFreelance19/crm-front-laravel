import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg'
import { useLocation } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
const Drawer = () => {
    const location = useLocation()
    const token = localStorage.getItem('token')
    const { cerrarSesion } = useAuth()
    return (
        <aside className="card flex justify-content-center bg-[#F2EAE1] flex-col justify-between py-10 items-center font-semibold">
            <div className='flex flex-col gap-6'>
                <Link to={`/admin/home/${token}`}
                    className={`${location.pathname.includes('home') ? 'bg-[#FEAF00]' : ""} flex items-center gap-3 py-2 px-4 rounded`}><AiOutlineHome size={25} />Home</Link>
                <Link to={`/admin/clients/${token}`}
                    className={`${location.pathname.includes('clients') ? 'bg-[#FEAF00]' : ""} flex items-center gap-3 py-2 px-4 rounded`}><BsPeople size={25} />Clients</Link>
                <Link to={`/admin/profile/${token}`}
                    className={`${location.pathname.includes('profile') ? 'bg-[#FEAF00]' : ""} flex items-center gap-3 py-2 px-4 rounded`}><CgProfile size={25} />Profile</Link>
            </div>
            <div className='py-4 border-gray-300  w-full border-y grid place-content-center'>
                <button type='button' onClick={() => cerrarSesion()} className='flex items-center gap-3'><BiLogOut size={25} />Logout</button>
            </div>
        </aside>
    )
}

export default Drawer
