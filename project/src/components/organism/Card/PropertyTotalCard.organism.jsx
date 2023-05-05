import React from 'react';
import PropTypes from 'prop-types';

function PropertyTotalCard({ cardTitle, cardLabelContent }) {
  return (
    <div className="lg:mx-auto">
      <div className="w-full md:w-[20rem] lg:w-fit p-4 bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-8xl lg:text-7xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
          {cardTitle}
        </h5>
        <div className="flex justify-center">
          <div className="inline-flex items-center px-6 py-2 mt-4 font-medium justify-center text-black bg-yellow-200 rounded-xl w-full xl:w-fit text-md">
            {cardLabelContent}
          </div>
        </div>
      </div>
    </div>
  );
}

PropertyTotalCard.propTypes = {
  cardTitle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  cardLabelContent: PropTypes.node.isRequired
};

export default PropertyTotalCard;
