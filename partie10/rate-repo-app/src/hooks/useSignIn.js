import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';

export const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);
    
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        return data;
    };
    
    return [signIn, result];
};