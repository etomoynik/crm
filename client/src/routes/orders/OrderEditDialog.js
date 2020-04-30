import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, CheckboxField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const ORDER_EDIT_DIALOG_ID = 'ORDER_EDIT_DIALOG_ID';

class OrderEditDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = (id) => async (data) => {
    await this.props.orderUpdate({ variables: { data: { ...data, id } } });

    this.context.closeModal(ORDER_EDIT_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(ORDER_EDIT_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Edit Order" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="address" label="Adress" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="deliveryDt" label="DeliveryDT" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="comment" label="Comment" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="status" label="Status" type="text" component={InputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={pristine || invalid} loading={submitting}>
          Update Order
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form
        type="UPDATE"
        tableSchemaName="Orders"
        onSubmit={this.createOnSubmit(args.initialValues.id)}
        initialValues={args.initialValues}
      >
        {this.renderFormContent}
      </Form>
    );
  };

  render() {
    return (
      <Dialog id={ORDER_EDIT_DIALOG_ID} size="sm">
        {this.renderForm}
      </Dialog>
    );
  }
}

OrderEditDialog = graphql(sharedGraphQL.ORDER_UPDATE_MUTATION, {
  name: 'orderUpdate',
  options: {
    refetchQueries: ['OrdersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order successfuly updated',
    },
  },
})(OrderEditDialog);

OrderEditDialog.id = ORDER_EDIT_DIALOG_ID;

export { OrderEditDialog };
