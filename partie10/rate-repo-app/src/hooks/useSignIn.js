import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

export const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};