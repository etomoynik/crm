import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, CheckboxField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CLIENT_EDIT_DIALOG_ID = 'CLIENT_EDIT_DIALOG_ID';

class ClientEditDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = (id) => async (data) => {
    await this.props.clientUpdate({ variables: { data: { ...data, id } } });

    this.context.closeModal(CLIENT_EDIT_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(CLIENT_EDIT_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Edit Client" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Field name="firstName" label="First name" type="text" component={InputField} />
          <Field name="lastName" label="Last name" type="text" component={InputField} />
          <Field name="email" label="Email" type="email" component={InputField} />
          <Field name="phone" label="Phone" type="phone" component={InputField} />
          <Field name="birthday" label="Birthdate" type="date" component={InputField} />
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={pristine || invalid} loading={submitting}>
          Update Client
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form
        type="UPDATE"
        tableSchemaName="Clients"
        onSubmit={this.createOnSubmit(args.initialValues.id)}
        initialValues={args.initialValues}
      >
        {this.renderFormContent}
      </Form>
    );
  };

  render() {
    return (
      <Dialog id={CLIENT_EDIT_DIALOG_ID} size="sm">
        {this.renderForm}
      </Dialog>
    );
  }
}

ClientEditDialog = graphql(sharedGraphQL.CLIENT_UPDATE_MUTATION, {
  name: 'clientUpdate',
  options: {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly updated',
    },
  },
})(ClientEditDialog);

ClientEditDialog.id = CLIENT_EDIT_DIALOG_ID;

export { ClientEditDialog };
