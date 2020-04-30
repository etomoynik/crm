import React from 'react';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as sharedGraphQL from 'shared/graphql';

import { OrderCreateDialog } from './OrderCreateDialog';
import { OrderEditDialog } from './OrderEditDialog';
import { OrderDeleteDialog } from './OrderDeleteDialog';

let OrdersTable = ({ orders, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(6, 1fr) 80px">
      <Table.HeaderCell>Client</Table.HeaderCell>
      <Table.HeaderCell>Address</Table.HeaderCell>
      <Table.HeaderCell>DeliveryDT</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={orders.loading}
      data={orders}
      action="Create Order"
      onActionClick={() => openModal(OrderCreateDialog.id)}
    >
      {(order) => (
        <Table.BodyRow columns="repeat(6, 1fr) 60px" key={order.id}>
          <Table.BodyCell>{order.client && order.client.firstName}</Table.BodyCell>
          <Table.BodyCell>{order.address}</Table.BodyCell>
          <Table.BodyCell>{new Date(order.deliveryDt).toLocaleString()}</Table.BodyCell>
          <Table.BodyCell>{order.comment}</Table.BodyCell>
          <Table.BodyCell>{order.status}</Table.BodyCell>
          <Table.BodyCell>
            {order.orderItems.items.reduce((acc, item) => acc + parseFloat(item?.product?.price ?? '0'), 0).toFixed(2)}
          </Table.BodyCell>
          <Table.BodyCell>
            <Dropdown defaultOpen={false}>
              <Dropdown.Head>
                <Icon name="More" color="LIGHT_GRAY2" />
              </Dropdown.Head>
              <Dropdown.Body pin="right">
                {({ closeDropdown }) => (
                  <Menu>
                    <Link to={'/orders/' + order.id}>
                      <Menu.Item>View order</Menu.Item>
                    </Link>
                    <Menu.Item
                      onClick={() => {
                        openModal(OrderEditDialog.id, { initialValues: order });
                        closeDropdown();
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        openModal(OrderDeleteDialog.id, { id: order.id });
                        closeDropdown();
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                )}
              </Dropdown.Body>
            </Dropdown>
          </Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
  </Table>
);

OrdersTable = compose(
  withModal,
  graphql(sharedGraphQL.ORDERS_LIST_QUERY, {
    props: ({ data: { ordersList: { items } = {} } }) => {
      return {
        orders: items || [],
      };
    },
  })
)(OrdersTable);

export { OrdersTable };
