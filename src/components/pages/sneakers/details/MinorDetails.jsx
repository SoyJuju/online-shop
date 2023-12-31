import GenerateDescriptions from './GenerateDescriptions';
import PriceControl from './PriceControl';
import PropTypes from 'prop-types';

export default function MinorDetails({ value, setValue, ID }) {
  const fixName = (str) => {
    return str.replace(/\([^()]*\)/g, '').trimEnd();
  };

  const formatSizing = (sizing) => {
    if (sizing === 'man') {
      return 'Men';
    } else if (sizing === 'woman') {
      return 'Women';
    } else {
      return 'Unisex';
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">
        {fixName(value.name.toUpperCase())}
      </h2>
      {value.price ? (
        <p className="text-lg font-bold">${value.price}.00</p>
      ) : (
        <PriceControl value={value} setValue={setValue} ID={ID} />
      )}
      <p className="text-gray-600">Gender: {formatSizing(value.sizing)}</p>
      <p className="text-gray-600">
        {GenerateDescriptions(fixName(value.name), value.id)}
      </p>
    </>
  );
}

MinorDetails.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    sizing: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number,
  }),
  setValue: PropTypes.func.isRequired,
  ID: PropTypes.string.isRequired,
};
