import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'flowbite-react';

function CardForm({ onSubmitForm, formChildren }) {
  return (
    <Card className="mb-6">
      <form onSubmit={onSubmitForm} encType="multipart/form-data">
        {formChildren}
      </form>
    </Card>
  );
}

CardForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  formChildren: PropTypes.node.isRequired
};

export default CardForm;
