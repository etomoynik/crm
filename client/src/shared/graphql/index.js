import gql from 'graphql-tag';

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
    }
  }
`;

export const USERS_LIST_QUERY = gql`
  query UsersList {
    usersList {
      items {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;

export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;

export const PRODUCTS_LIST_QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        name
        picture {
          id
          downloadUrl
        }
        description
        price
      }
    }
  }
`;

export const CLIENTS_LIST_QUERY = gql`
  query ClientsList {
    clientsList {
      items {
        id
        firstName
        lastName
        email
        phone
        birthday
      }
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
    }
  }
`;

export const ORDER_UPDATE_MUTATION = gql`
  mutation OrderUpdate($data: OrderUpdateInput!) {
    orderUpdate(data: $data) {
      id
    }
  }
`;

export const ORDERS_LIST_QUERY = gql`
  query OrdersList {
    ordersList {
      items {
        id
        client {
          firstName
          lastName
          email
          phone
          birthday
        }
        address
        deliveryDt
        status
        comment
        orderItems {
          count
          items {
            product {
              price
            }
          }
        }
      }
    }
  }
`;

export const CLIENT_QUERY = gql`
  query Client($id: ID!) {
    client(id: $id) {
      _description
      birthday
      email
      firstName
      id
      lastName
      orders {
        items {
          id
          _description
          address
          comment
          deliveryDt
          status
          orderItems {
            items {
              id
              quantity
              product {
                id
                name
              }
            }
          }
        }
      }
      phone
    }
  }
`;

export const CLIENT_UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
    }
  }
`;

export const PRODUCT_UPDATE_MUTATION = gql`
  mutation ProductUpdate($data: ProductUpdateInput!) {
    productUpdate(data: $data) {
      id
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($id: ID!) {
    order(id: $id) {
    orderItems {
      count
      items {
        _description
        id
        product {
          name
          id
          price
        }
      }
    }
    id
    _description
    address
    comment
    deliveryDt
    client {
      firstName
      email
      lastName
    }
  }
  }
`;
