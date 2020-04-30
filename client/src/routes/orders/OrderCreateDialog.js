import React from 'react';
import { Form, Field } from '@8base/forms';
import {
  Dialog,
  Grid,
  Button,
  InputField,
  CheckboxField,
  ModalContext,
  SelectField,
  DateInputField,
} from '@8base/boost';
import { Query, graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const ORDER_CREATE_DIALOG_ID = 'ORDER_CREATE_DIALOG_ID';

const getUserOptions = (users = []) =>
  users.map((item) => {
    return {
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    };
  });

const getProductsOptions = (users = []) =>
  users.map((item) => {
    return {
      value: item.id,
      label: `${item.name} ${item.price}`,
    };
  });

class OrderCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async (data) => {
    await this.props.orderCreate({ variables: { data } });

    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Order" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Query query={sharedGraphQL.CLIENTS_LIST_QUERY}>
            {({ data, loading }) => (
              <Field
                name="client"
                label="Client"
                placeholder="Select a client"
                component={SelectField}
                loading={loading}
                options={loading ? [] : getUserOptions(data.clientsList.items)}
                stretch
              />
            )}
          </Query>
          <Grid.Box>
            <Field name="address" label="Adress" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="deliveryDt" label="Delivery Date" component={DateInputField} withTime />
          </Grid.Box>
          <Grid.Box>
            <Field name="comment" label="Comment" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="status" label="Status" type="text" component={InputField} />
          </Grid.Box>
          <Query query={sharedGraphQL.PRODUCTS_LIST_QUERY}>
            {({ data, loading }) => (
              <Field
                name="products"
                label="Products"
                placeholder="Select a products"
                component={SelectField}
                loading={loading}
                options={loading ? [] : getProductsOptions(data.productsList.items)}
                stretch
                multiple
              />
            )}
          </Query>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Order
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={ORDER_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Orders" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

OrderCreateDialog = graphql(sharedGraphQL.ORDER_CREATE_MUTATION, {
  name: 'orderCreate',
  options: {
    refetchQueries: ['OrdersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order successfuly created',
    },
  },
})(OrderCreateDialog);

OrderCreateDialog.id = ORDER_CREATE_DIALOG_ID;

export { OrderCreateDialog };
