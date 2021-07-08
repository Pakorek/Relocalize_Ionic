import gql from 'graphql-tag';
import { FetchResult, useMutation } from '@apollo/react-hooks';

export type ShopInput = {
  name: string,
  professionalArea: string,
  shortDescription: string,
  latitude: number,
  longitude: number,
  address_1: string,
  zipCode: string,
  city: string,
  department: string,
}

export const createContributionShopMutationGQL = gql`
    mutation createContributionShop(
        $name: String!,
        $professionalArea: String!,
        $shortDescription: String!,
        $latitude: Float!,
        $longitude: Float!,
        $address_1: String!,
        $city: String!,
        $department: String!,
        $zipCode: String!
    ) {createContributionShop(
        values: {
            name: $name,
            professionalArea: $professionalArea,
            shortDescription: $shortDescription,
            latitude: $latitude,
            longitude: $longitude,
            address_1: $address_1,
            city: $city,
            department: $department,
            zipCode: $zipCode
        }) {
        name
    }
    }
`;

export const useCreateContributionShopMutation = () => {
  // const [, setCookie] = useCookies(["user"]);

  const [mutation, mutationResults] = useMutation(createContributionShopMutationGQL, {
    onCompleted: (data) => {
      console.log('mutation create shop on completed', data);
      // email verification ? (send email with link to login)
    },
  });

  const create = async (values: ShopInput): Promise<FetchResult<any>> => {
    const { name, professionalArea, shortDescription, latitude, longitude, address_1, city, department, zipCode } = values;

    return await mutation({
      variables: {
        name,
        professionalArea,
        shortDescription,
        latitude,
        longitude,
        address_1,
        city,
        department,
        zipCode,
      },
    });
  };

  return [create, mutationResults];
};
