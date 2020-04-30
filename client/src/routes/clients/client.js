import React from 'react';
import { Card, Heading } from '@8base/boost';
import { Dialog, Grid, Button, SelectField, ModalContext, Label, Loader } from '@8base/boost';
import { useParams } from 'react-router-dom';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql, useQuery } from 'react-apollo';
import { DateTime } from 'luxon';

import * as sharedGraphQL from 'shared/graphql';

const Client = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(sharedGraphQL.CLIENT_QUERY, {
    variables: { id },
  });

  if (error || data?.client === null) {
    return <div>error occurred</div>;
  }

  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text="Client" />
      </Card.Header>
      {loading ? (
        <Loader stretch />
      ) : (
        <Grid.Layout gap="sm" stretch padding="md">
          <Grid.Box>
            <Label>Name:</Label>
            <Label>
              {data.client.firstName} {data.client.lastName}
            </Label>
          </Grid.Box>
          <Grid.Layout gap="sm" stretch>
            <Label>Orders:</Label>
            <Grid.Box>
              {data.client.orders.items.map((order) => (
                <Grid.Box key={order.id} padding="md">
                  <Label>Adress:</Label>
                  <Label>{order.address}</Label>
                  <Label>Delivery Date:</Label>
                  <Label>{new Date(order.deliveryDt).toLocaleString()}</Label>
                  <Label>Comment:</Label>
                  <Label>{order.comment}</Label>
                  <Label>Status:</Label>
                  <Label>{order.status}</Label>
                  <Label>Items:</Label>
                  <Label>
                    {order.orderItems.items
                      .reduce((acc, item) => acc + parseFloat(item?.product?.price ?? '0'), 0)
                      .toFixed(2)}
                  </Label>
                </Grid.Box>
              ))}
            </Grid.Box>
          </Grid.Layout>
        </Grid.Layout>
      )}
      <Card.Body padding="none" stretch scrollable />
    </Card>
  );
};

export { Client };
