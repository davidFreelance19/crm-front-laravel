import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState, useRef } from "react";
import clienteAxios from "../../../config/clienteAxios";
import { sleep } from "../../../helpers/sleep";
const CustomerContext = createContext()
const CustomerProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [dataCustomers, setDataCustomers] = useState([]);
    const [company, setCompany] = useState('');
    const [customer, setCustomer] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isUpdate, setIsUpdate] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const toast = useRef(null);
    const clear = (submit) => {
        submit && show();
    };

    const show = () => {
        toast.current.show({
            severity: 'success', summary: `${isUpdate ? 'Updated' : 'Registered'} customer`,
            detail: `Thank you, we have successfully ${isUpdate ? 'updated' : 'registered'} your customer`, life: 2500
        });
    };
    const handleSubmitCreate = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        if (isUpdate > 0) {
            try {
                const { data } = await clienteAxios.put(`/customer/${isUpdate}`, { company, name_customer: customer, description, status: status.status }, config);
                const dataUpDated = dataCustomers.map(customerState => {
                    if (customerState.id === data.customer.id) {
                        return {
                            id: data.customer.id,
                            company: data.customer.company, name_customer: data.customer.name_customer,
                            description: data.customer.description, status: data.customer.status
                        }
                    }
                    return customerState
                })
                setDataCustomers(dataUpDated)
                setCompany('')
                setCustomer('')
                setDescription('')
                setStatus('')
                clear(true)
            } catch (error) {
                console.log(error);
            } finally {
                setVisible(false)
                await sleep(1)
                setIsFetching(false)
            }
        } else {
            try {
                const { data } = await clienteAxios.post("customer/create", { company, name_customer: customer, description, status: status.status }, config);
                setDataCustomers([...dataCustomers, { company, name_customer: customer, description, status: status.status, id: data.customer.id }])
                setCompany('')
                setCustomer('')
                setDescription('')
                setStatus('')
                clear(true)
            } catch (error) {
                console.log(error);
            } finally {
                setVisible(false)
                await sleep(1)
                setIsFetching(false)
            }
        }

    }

    const deleteCustomer = async (customer) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            await clienteAxios.delete(`customer/${customer.id}`, config);
            const nuevosCustomer = dataCustomers.filter(customerState => customer.id !== customerState.id);
            setDataCustomers(nuevosCustomer);
        } catch (error) {
            console.log(error);
        }
    }

    const pasarDatos = customer => {
        setCompany(customer.company)
        setCustomer(customer.name_customer)
        setDescription(customer.description)
        setStatus({ status: customer.status })
        setIsUpdate(customer.id)
    }

    useEffect(() => {
        const consultarCustomers = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await clienteAxios.get('/customer/list', config)
                setDataCustomers(data)
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        consultarCustomers()
    }, [toast])

    useEffect(() => {
        if (!visible) {
            setCompany('')
            setCustomer('')
            setDescription('')
            setStatus('')
            setIsUpdate(0)
        }
    }, [visible])
    return (
        <CustomerContext.Provider
            value={{
                company, setCompany, customer, setCustomer, description,
                setDescription, status, setStatus, handleSubmitCreate, visible,
                setVisible, toast, dataCustomers, cargando, deleteCustomer, isFetching,
                setIsFetching, pasarDatos, isUpdate
            }}>
            {children}
        </CustomerContext.Provider>
    )
}
export { CustomerProvider }
export default CustomerContext
