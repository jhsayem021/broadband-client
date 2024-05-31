import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAllUsers = () => {
    const { user, loading } = useAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [users, refetch]

}
export default useAllUsers;