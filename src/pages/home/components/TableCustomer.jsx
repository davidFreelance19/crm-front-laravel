import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import useCustomer from '../hooks/useCustomer';
const TableCustomer = ({ customers, handleDeleteClick, setVisible }) => {
    const [visibleReview, setVisibleReview] = useState(false)
    const [customer, setCustomer] = useState([])
    const { pasarDatos } = useCustomer()
    const editClick = customer => {
        setVisible(true)
        pasarDatos(customer)
    }
    const optionsCustomer = (customer) => {
        return (
            <div className="flex items-center">
                <div className="flex gap-4 ">
                    <Button icon="pi pi-eye" className="p-button-rounded" style={{
                        backgroundColor: '#fff',
                        color: '#000',
                        borderColor: '#0005',
                    }} onClick={() => setVisibleReview(true) & setCustomer(customer)} />
                    <Button icon="pi pi-file-edit" className="p-button-rounded" onClick={() => editClick(customer)} />
                    <Button icon="pi pi-times" className="p-button-rounded " style={{
                        border: 'none',
                        backgroundColor: ' rgb(239 68 68 / var(--tw-bg-opacity))'
                    }} onClick={(e) => handleDeleteClick(e, customer)}></Button>
                </div>
            </div>
        )
    }
    const statusTag = customer => {
        return (
            <Tag
                severity={`${customer.status === 'Pending' ? 'warning' : customer.status === 'Canceled' ? 'danger' : 'success'}`}
                value={customer.status} rounded className='w-[80px]'>
            </Tag>
        )
    }

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name_customer" header="Customer Name" style={{ width: '28%' }}></Column>
                <Column field="company" header="Company" style={{ width: '28%' }}></Column>
                <Column body={statusTag} header="Status" style={{ width: '15%' }}></Column>
                <Column body={optionsCustomer} header="Options" style={{ width: '20%' }}></Column>
            </DataTable>
            <Dialog header="Customer review" visible={visibleReview} style={{ width: '30vw' }} onHide={() => setVisibleReview(false)}>
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-end w-full'>{statusTag(customer)}</div>
                    <p className='font-bold '>Company: <span className='font-normal'>{' '}{customer.company}</span></p>
                    <p className='font-bold '>Customer Name: <span className='font-normal'>{' '}{customer.name_customer}</span></p>
                    <p className='font-bold '>To Do: <span className='font-normal'>{' '}{customer.description}</span></p>
                </div>
            </Dialog>
        </div>
    )
}

export default TableCustomer
