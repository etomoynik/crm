import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { ClientCreateDialog } from './ClientCreateDialog';
import { ClientEditDialog } from './ClientEditDialog';
import { ClientDeleteDialog } from './ClientDeleteDialog';

let ClientsTable = ({ clients, openModal, closeModal }) => {
  console.log(clients, 'clients');
  return (
    <Table>
      <Table.Header columns="repeat(5, 1fr) 80px">
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Birthday</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Header>

      <Table.Body
        loading={clients.loading}
        data={R.pathOr([], ['clientsList', 'items'], clients)}
        action="Create Client"
        onActionClick={() => openModal(ClientCreateDialog.id)}
      >
        {(client) => {
          return (
            <Table.BodyRow columns="repeat(5, 1fr) 60px" key={client.id}>
              <Table.BodyCell>{R.pathOr('Unititled', ['firstName'], client)}</Table.BodyCell>
              <Table.BodyCell>{R.pathOr('Unititled', ['lastName'], client)}</Table.BodyCell>
              <Table.BodyCell>{R.pathOr('Unititled', ['email'], client)}</Table.BodyCell>
              <Table.BodyCell>{R.pathOr('Unititled', ['phone'], client)}</Table.BodyCell>
              <Table.BodyCell>{R.pathOr('Unititled', ['birthday'], client)}</Table.BodyCell>
              <Table.BodyCell>
                <Dropdown defaultOpen={false}>
                  <Dropdown.Head>
                    <Icon name="More" color="LIGHT_GRAY2" />
                  </Dropdown.Head>
                  <Dropdown.Body pin="right">
                    {({ closeDropdown }) => (
                      <Menu>
                        <Link to={'/clients/' + client.id}>
                          <Menu.Item>View client orders</Menu.Item>
                        </Link>
                        <Menu.Item
                          onClick={() => {
                            openModal(ClientEditDialog.id, { initialValues: client });
                            closeDropdown();
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            openModal(ClientDeleteDialog.id, { id: client.id });
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
          );
        }}
      </Table.Body>
    </Table>
  );
};

ClientsTable = compose(withModal, graphql(sharedGraphQL.CLIENTS_LIST_QUERY, { name: 'clients' }))(ClientsTable);

export { ClientsTable };
