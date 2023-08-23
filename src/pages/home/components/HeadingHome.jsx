import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
const HeadingHome = ({ heading, profile }) => {
    const token = localStorage.getItem('token')
    return (
        <div className="py-4 flex justify-between border-b border-gray-300">
            <h1 className="font-bold text-xl">{heading}</h1>
            {profile ? <Link to={`/admin/profile/${token}`}><CgProfile size={35} /></Link> : <></>}
        </div>
    )
}

export default HeadingHome
