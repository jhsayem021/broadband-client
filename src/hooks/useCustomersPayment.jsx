import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCustomersPayment = () => {

    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: CustomersPayment = [] } = useQuery({
        queryKey: ['customerspayment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customerspayment`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [CustomersPayment, refetch]

}
export default useCustomersPayment;