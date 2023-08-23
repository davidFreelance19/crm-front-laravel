import { useNavigate, useLocation, } from "react-router-dom";
import { createContext, useEffect, useState, useRef } from "react";
import clienteAxios from "../../../config/clienteAxios";
import { sleep } from "../../../helpers/sleep";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [nameProfile, setNameProfile] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});
    const toast = useRef(null);
    const clear = (submit) => {
        submit && show();
    };

    const show = () => {
        toast.current.show({
            severity: 'success', summary: `Updated your data`,
            detail: `Thank you, we have successfully your data`, life: 2500
        });
    };
    const handleSubmit = async (e, location) => {
        e.preventDefault();
        if (location.includes('sign-up')) {
            try {
                await clienteAxios.post('create', { name, email, password });
                setName('')
                setEmail('')
                setPassword('')
            } catch (error) {
                console.log(error);
            }
        } else if (location.includes('login')) {
            try {
                const { data } = await clienteAxios.post('login', { email, password });
                localStorage.setItem("token", data.token);
                setName('')
                setEmail('')
                setPassword('')
                setCargando(true)
                navigate(`admin/home/${data.token}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const cerrarSesion = async () => {
        setCargando(true)
        setAuth({})
        localStorage.removeItem('token')
        await sleep(2);
        navigate('/login')
        setCargando(false)
    }
    const handleSubmitUpdate = async (e, userUpdate) => {
        e.preventDefault()
        console.log(userUpdate)
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await clienteAxios.put(`user/${auth.id}`,
                {
                    name: nameProfile, email: auth.email, new_password: userUpdate.newPassword,
                    password: userUpdate.password
                }, config)
            setCargando(true);
            navigate(`/admin/home/${token}`)
        } catch (error) {
            console.log(error)
        } finally {
            await sleep(1)
            setCargando(false)
            clear(true)
        }
    }
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await clienteAxios.get("user", config);
                setAuth(data);
                setNameProfile(data.name)
            } catch (error) {
                setAuth({});
                console.log(error);
            } finally {
                setCargando(false)
            }
        };
        autenticarUsuario();
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{
            cargando, auth, name, setName, email, setEmail,
            password, setPassword, handleSubmit, cerrarSesion,
            nameProfile, setNameProfile, handleSubmitUpdate, toast
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider };
export default AuthContext;
