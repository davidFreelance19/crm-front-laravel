import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import useCustomer from "./hooks/useCustomer"
import Loader from "../../components/Loader"
import HeadingHome from "./components/HeadingHome"
import EmptyContent from "./components/EmptyContent"
import FormCustomer from "./components/FormCustomer"
import TableCustomer from "./components/TableCustomer"
import registerImage from '/registerImage.svg'

const ClientsHome = () => {
  const toastDelete = useRef(null);
  const { visible, setVisible, toast, dataCustomers, cargando, deleteCustomer } = useCustomer()

  if (cargando) return <Loader />

  const accept = async (customer) => {
    deleteCustomer(customer)
    toastDelete.current.show({ severity: 'warn', summary: 'Confirmed', detail: 'Customer successfully removed', life: 2500 });
  }

  const handleDeleteClick = (e, customer) => {
    e.preventDefault()
    confirmDialog({
      message: 'Do you want to delete this customer?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => accept(customer)
    });
  }

  return (
    <>
      <HeadingHome heading={dataCustomers.length > 0 ? 'Start managing your customers' : 'Register a new customer'} />
      <Toast ref={toast} />
      <Toast ref={toastDelete} />
      <div className="flex flex-col gap-6 mt-8">
        <div className="w-full flex justify-end">
          <button type='button' className="font-bold px-4 py-3 rounded-md bg-[#FEAF00]" onClick={() => setVisible(true)}>New customer</button>
        </div>
        <FormCustomer setVisible={setVisible} visible={visible} />
        {
          dataCustomers.length > 0 ? <TableCustomer customers={dataCustomers} handleDeleteClick={handleDeleteClick} setVisible={setVisible} />
            : <EmptyContent image={registerImage} altImage={'img-empty'} info={'Start registering your customers and start managing them!'} />
        }
      </div>
      <ConfirmDialog />
    </>
  )
}

export default ClientsHome
