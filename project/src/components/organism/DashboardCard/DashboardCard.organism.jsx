import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

function DashboardCard({
  cardTitle,
  cardDescription,
  cardButtonOnclick,
  cardButtonContent,
  buttonDisabled
}) {
  return (
    <div className="max-w py-8 lg:px-16 md:py-10 md:px-10 bg-gray-100 rounded-xl mb-6 flex-col md:flex-row flex justify-center md:justify-between items-center">
      <div className="text-center md:text-start">
        <h5 className="mb-4 md:mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {cardTitle}
        </h5>
        <p className="mb-6 md:mb-0 font-normal text-md xl:text-md md:text-lg text-gray-700 dark:text-gray-400 w-[24rem] px-10 md:px-0">
          {cardDescription}
        </p>
      </div>
      <Button
        onClick={cardButtonOnclick}
        className="pl-1 pr-2 py-1"
        disabled={buttonDisabled}
      >
        {cardButtonContent}
      </Button>
    </div>
  );
}

DashboardCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardButtonOnclick: PropTypes.func.isRequired,
  cardButtonContent: PropTypes.node.isRequired,
  buttonDisabled: PropTypes.bool
};

export default DashboardCard;
