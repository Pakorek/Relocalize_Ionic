import {ApolloProvider} from "@apollo/react-hooks";
import { useAppApolloClient } from "../utils/apolloClient";

const React = require('react');

/**
 * useAppApolloClient is a hook
 * ts requires using hooks only in JSX Element
 * so ApolloProvider client={useAppApolloClient()} doesn't work directly in index.tsx
 *
 * I find this solution for now
 */
export const Provider = (props: any): JSX.Element => {
    return (
        <ApolloProvider client={useAppApolloClient()}>
            {props.children}
        </ApolloProvider>
    )
}