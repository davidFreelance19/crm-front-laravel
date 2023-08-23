import { Toast } from 'primereact/toast';
import useAuth from '../auth/hooks/useAuth'
import useCustomer from './hooks/useCustomer'
import HeadingHome from './components/HeadingHome'
import EmptyContent from './components/EmptyContent'
import ChartCustomers from './components/ChartCustomers'
import emptyHome from '/emptyHome.svg'
const HomePage = () => {
  const { auth, toast } = useAuth()
  const { dataCustomers } = useCustomer()
  const statusCounts = dataCustomers.reduce((accumulator, currentValue) => {
    const status = currentValue.status;
    if (status === "Pending" || status === "Canceled" || status === "Completed") {
      accumulator[status] = (accumulator[status] || 0) + 1;
    }
    return accumulator;
  }, {});
  return (
    <>
      <Toast ref={toast} />
      <HeadingHome heading={`Welcome, ${auth.name}!`} profile={true} />
      {
        dataCustomers.length > 0 ? <ChartCustomers chartData={statusCounts} /> :
          <EmptyContent image={emptyHome} altImage={'img-empty'} info={'No registered customers!'} />
      }
    </>
  )
}

export default HomePage
