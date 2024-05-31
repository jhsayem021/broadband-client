import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCustomers = () => {

    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customers`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [customers]

}
export default useCustomers;