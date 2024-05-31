import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useExpense = () => {
    const { user, loading } = useAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: expense = [] } = useQuery({
        queryKey: ['expense'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/expense`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [expense, refetch]

}
export default useExpense;