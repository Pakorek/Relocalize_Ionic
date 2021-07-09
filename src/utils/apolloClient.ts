import { ApolloLink, RequestHandler } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import {useAuthToken} from "../hooks/auth";

const authMiddleware = (authToken: string): ApolloLink  =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const httpLink = createUploadLink({ uri: "http://127.0.0.1:4300/graphql" }) as any;
const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink) as any,
        cache: cache
    });
};
