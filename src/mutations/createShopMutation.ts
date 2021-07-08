import gql from 'graphql-tag';
import { FetchResult, useMutation } from '@apollo/react-hooks';

export type ShopInput = {
  name: string,
  professionalArea: string,
  professionalClass: string,
  siret: string,
  latitude: number,
  longitude: number,
  address_1: string,
  zipCode: string,
  city: string,
  department: string,
  country: string
}

export const createShopMutationGQL = gql`
    mutation createShop(
        $name: String!,
        $professionalArea: String!,
        $professionalClass: String!,
        $siret: String!,
        $latitude: Float!,
        $longitude: Float!,
        $address_1: String!,
        $city: String!,
        $department: String!,
        $country: String!,
        $zipCode: String!
    ) {createShop(
        values: {
            name: $name,
            professionalArea: $professionalArea,
            professionalClass: $professionalClass,
            siret: $siret,
            latitude: $latitude,
            longitude: $longitude,
            address_1: $address_1,
            city: $city,
            department: $department,
            country: $country,
            zipCode: $zipCode
        }) {
        name
    }
    }
`;

export const useCreateShopMutation = () => {
  // const [, setCookie] = useCookies(["user"]);

  const [mutation, mutationResults] = useMutation(createShopMutationGQL, {
    onCompleted: (data) => {
      console.log('mutation create shop on completed', data);
      // email verification ? (send email with link to login)
    },
  });

  const create = async (values: ShopInput): Promise<FetchResult<any>> => {
    const { name, professionalArea, professionalClass, siret, latitude, longitude, address_1, city, department, country, zipCode } = values;
    // if we catch Error here
    // we don't catch errors in Component
    // try {
      return await mutation({
        variables: {
          name,
          professionalArea,
          professionalClass,
          siret,
          latitude,
          longitude,
          address_1,
          city,
          department,
          country,
          zipCode
        },
      });
    // } catch (err) {
    //   console.log('createShopMutation error', err);
    // }
  };

  return [create, mutationResults];
};
