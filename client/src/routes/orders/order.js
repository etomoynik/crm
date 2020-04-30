import React from 'react';
import { Card, Heading } from '@8base/boost';
import { Dialog, Grid, Button, SelectField, ModalContext, Loader } from '@8base/boost';
import { useParams } from 'react-router-dom';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql, useQuery } from 'react-apollo';
import { DateTime } from 'luxon';

import * as sharedGraphQL from 'shared/graphql';

const Order = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(sharedGraphQL.ORDER_QUERY, {
    variables: { id },
  });

  if (error || data?.order === null) {
    return <div>error occurred</div>;
  }

  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text="Order" />
      </Card.Header>
      {loading ? (
        <Loader stretch />
      ) : (
        <Grid.Layout gap="sm" stretch padding="md">
          <Grid.Box>
            Client: {data.order.client.firstName} {data.order.client.lastName}
            <Grid.Box>{data.order.client.email}</Grid.Box>
          </Grid.Box>
          <Grid.Box>Adress: {data.order.address}</Grid.Box>
          <Grid.Box>Comment: {data.order.comment}</Grid.Box>
          <Grid.Box>Delivery date: {new Date(data.order.deliveryDt).toLocaleDateString()}</Grid.Box>
          <Grid.Box>
            Products:
            {data.order.orderItems.items.map((item) => (
              <Grid.Box key={item.id}>
                {item.product?.name} {item.product?.price}
              </Grid.Box>
            ))}
          </Grid.Box>
        </Grid.Layout>
      )}
      <Card.Body padding="none" stretch scrollable />
    </Card>
  );
};

export { Order };
