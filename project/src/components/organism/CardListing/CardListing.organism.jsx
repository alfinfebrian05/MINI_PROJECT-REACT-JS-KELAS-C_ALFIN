import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'flowbite-react';

function CardListing({
  listingImage,
  altImageListing,
  listingTitle,
  listingType,
  listingCategory,
  listingPrice,
  listingBedroom,
  listingBathroom,
  listingLandArea,
  listingBuildingArea
}) {
  return (
    <Card
      imgSrc={listingImage}
      imgAlt={altImageListing}
      className="w-full 2xl:w-max "
    >
      <div className="flex gap-2 uppercase">
        <Badge className="w-max text-lg font-bold" color="gray">
          {listingType}
        </Badge>
        <Badge className="w-max text-lg font-bold" color="warning">
          {listingCategory}
        </Badge>
      </div>
      <h3 className="text-2xl text-sky-500 font-bold tracking-tight">
        {listingPrice}
      </h3>
      <h5 className="text-sm truncate mb-2">{listingTitle}</h5>
      <hr className="mb-0" />
      <div className="flex gap-4">
        <div className="flex items-center gap-2 w-fit">
          <img
            src="./assets/icons/bed-icon.svg"
            className="w-4"
            alt="bed-icon.svg"
          />
          <p>{listingBedroom}</p>
        </div>
        <div className="flex items-center gap-2 w-fit">
          <img
            src="./assets/icons/bathtub-icon.svg"
            className="w-4"
            alt="bed-icon.svg"
          />
          <p>{listingBathroom}</p>
        </div>
        <div className="flex items-center gap-2 w-fit">
          <p>LT</p>
          <p>{listingLandArea}</p>
        </div>
        <div className="flex items-center gap-2 w-fit">
          <p>LB</p>
          <p>{listingBuildingArea}</p>
        </div>
      </div>
    </Card>
  );
}

CardListing.propTypes = {
  listingImage: PropTypes.string.isRequired,
  altImageListing: PropTypes.string.isRequired,
  listingTitle: PropTypes.string.isRequired,
  listingType: PropTypes.string.isRequired,
  listingCategory: PropTypes.string.isRequired,
  listingPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  listingBedroom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listingBathroom: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  listingLandArea: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listingBuildingArea: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

export default CardListing;
