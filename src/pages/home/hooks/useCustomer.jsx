import { useContext } from "react"
import CustomerContext from "../context/CustomerContext"
const useCustomer = () => {
    return (
        useContext(CustomerContext)
    )
}

export default useCustomer
