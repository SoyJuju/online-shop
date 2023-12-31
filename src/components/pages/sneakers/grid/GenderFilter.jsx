import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import GeneratePrice from './GeneratePrice';

export default function GenderFilter({
  genderFilters,
  setGenderFilters,
  sneakers,
  priceRange,
  brandFilters,
  sizeFilters,
}) {
  const [genderCounts, setGenderCounts] = useState({
    men: 0,
    women: 0,
    unisex: 0,
  });

  useMemo(() => {
    const calculateGenderCounts = () => {
      const counts = {
        men: 0,
        women: 0,
        unisex: 0,
      };

      const filteredSneakers = sneakers.filter((sneaker) => {
        // Apply brand filter

        const modifiedBrandFilters = brandFilters.map((brand) => {
          return brand === 'Reebok' ? 'Reebook' : brand;
        });
        const brandFilterPassed =
          !modifiedBrandFilters.length ||
          modifiedBrandFilters.includes(sneaker.brandName);

        // Apply price range filter
        const sneakerPrice = parseInt(
          sneaker.initialPrice || GeneratePrice(sneaker.id)
        );
        const priceFilterPassed =
          sneakerPrice >= priceRange[0] && sneakerPrice <= priceRange[1];

        // Apply size filter
        const sizeFilterPassed =
          !sizeFilters.length ||
          sizeFilters.some((size) => sneaker.sizes.includes(size));

        return brandFilterPassed && priceFilterPassed && sizeFilterPassed;
      });

      filteredSneakers.forEach((sneaker) => {
        if (sneaker.sizing === 'man') {
          counts.men++;
        } else if (sneaker.sizing === 'woman') {
          counts.women++;
        } else {
          counts.unisex++;
        }
      });

      setGenderCounts(counts);
    };

    calculateGenderCounts();
  }, [sneakers, priceRange, brandFilters, sizeFilters]);

  const handleGenderFilterChange = (gender) => {
    setGenderFilters((prevFilters) => ({
      ...prevFilters,
      [gender]: !prevFilters[gender],
    }));
  };

  return (
    <div className="mb-4 font-[Inter] pt-5">
      <label className="text-2xl font-medium">Gender</label>
      <div className="flex flex-wrap justify-between gap-y-3 pt-4">
        <button
          disabled={genderCounts.men === 0}
          onClick={() => handleGenderFilterChange('men')}
          className={`${
            genderFilters.men
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Men ({genderCounts.men})
        </button>
        <button
          disabled={genderCounts.women === 0}
          onClick={() => handleGenderFilterChange('women')}
          className={`${
            genderFilters.women
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Women ({genderCounts.women})
        </button>
        <button
          disabled={genderCounts.unisex === 0}
          onClick={() => handleGenderFilterChange('unisex')}
          className={`${
            genderFilters.unisex
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Unisex ({genderCounts.unisex})
        </button>
      </div>
    </div>
  );
}

GenderFilter.propTypes = {
  genderFilters: PropTypes.object.isRequired,
  setGenderFilters: PropTypes.func.isRequired,
  sneakers: PropTypes.arrayOf(
    PropTypes.shape({
      sizing: PropTypes.string.isRequired,
      brandName: PropTypes.string.isRequired,
      initialPrice: PropTypes.number,
    })
  ).isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  brandFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizeFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
};
