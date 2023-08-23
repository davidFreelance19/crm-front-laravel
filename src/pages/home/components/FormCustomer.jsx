import useCustomer from '../hooks/useCustomer';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import Loader from '../../../components/Loader';
const FormCustomer = ({ setVisible, visible }) => {
    const {
        company, setCompany, customer, setCustomer, description,
        setDescription, status, setStatus, handleSubmitCreate, isFetching,
        setIsFetching, isUpdate } = useCustomer();

    const statusSelect = [{ status: 'Pending' }, { status: 'Canceled' }, { status: 'Completed' }];
    return (
        <>
            <Dialog
                header={`${isUpdate > 0 ? 'Update a customer' : "Register a new customer"}`}
                visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                {isFetching ? <Loader />
                    : (
                        <form className='flex flex-col gap-4 mb-4' onSubmit={(e) => handleSubmitCreate(e,) & setIsFetching(true)}>
                            <div className="field flex flex-col gap-2">
                                <label htmlFor="company" className="font-bold">
                                    Company:
                                </label>
                                <InputText
                                    id="company" name='company' value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    required
                                    placeholder='Ej. Amazon, Apple, YouTube,...'
                                />
                            </div>
                            <div className="field flex flex-col gap-2">
                                <label htmlFor="customer" className="font-bold">
                                    Customer name:
                                </label>
                                <InputText
                                    id="customer" name='customer' value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    required placeholder='Ej. Joe Down'
                                />
                            </div>
                            <div className="field flex flex-col gap-2">
                                <label htmlFor="description" className="font-bold">
                                    To Do:
                                </label>
                                <InputTextarea
                                    id="description" name='description' value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required rows={3} cols={20}
                                    placeholder='Ej. To do a new logo, To do a new banner...'
                                />
                            </div>
                            <div className="field flex flex-col gap-2">
                                <label htmlFor="status" className="font-bold">
                                    Status:
                                </label>
                                <Dropdown
                                    value={status} onChange={(e) => setStatus(e.value)}
                                    options={statusSelect} optionLabel="status"
                                    placeholder="Select a status" className="w-full"
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='mt-2 p-3 rounded-md w-full bg-[#FEAF00] font-bold hover:transition-colors'
                                disabled={isFetching}>{isUpdate > 0 ? 'Update' : 'Register'}
                            </button>
                        </form>
                    )}
            </Dialog>
        </>
    )
}

export default FormCustomer
