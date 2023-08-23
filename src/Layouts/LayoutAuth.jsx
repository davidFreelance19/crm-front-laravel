import useAuth from "../pages/auth/hooks/useAuth";
import { Outlet } from "react-router-dom"
import { Galleria } from 'primereact/galleria';
import Loader from "../components/Loader";
import bgAuth from "/SignIn.png"
import imgAuth1 from '/imgAuth1.svg'
import imgAuth2 from '/imgAuth2.svg'
import imgAuth3 from '/imgAuth3.svg'
import imgAuth4 from '/imgAuth4.svg'
const LayoutAuth = () => {
    const {cargando} = useAuth()
    const gallery = [
        { image: imgAuth1, text: 'Start managing your clients!' },
        { image: imgAuth2, text: 'Start visualizing your task performance!' },
        { image: imgAuth3, text: 'Create, update and delete your data!' },
        { image: imgAuth4, text: 'Manage your projects!' },
    ]
    const itemTemplate = (item) => {
        return (
            <div>
                <img src={item.image} className="mx-auto w-[80%] h-[400px]" alt="img-hero" />
                <p className="text-center font-semibold mb-2 text-lg">{item.text}</p>
            </div>
        )
    }
    if (cargando) return <Loader />
    return (
        <>
            <div className="h-screen w-screen grid place-content-center bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${bgAuth})`
                }}
            >
                <div className="bg-white rounded-lg shadow-2xl lg:w-[1080px] lg:h-[550px] grid grid-cols-2 place-content-center ">
                    <div className="flex justify-center border-r h-full items-center">
                        <Galleria
                            value={gallery} numVisible={5}
                            showThumbnails={false} item={itemTemplate}
                            autoPlay transitionInterval={6000} circular
                        />
                    </div>
                    <Outlet />
                </div>
            </div>
        </>

    )
}

export default LayoutAuth
