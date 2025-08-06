import style from './FilterSidebar.module.css';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {

  const handleInputChange = (filterName, value) => {
    onFiltersChange({
      ...filters,
      [filterName]: value
    });
  };

  const handleRangeChange = (filterName, value, isMax = false) => {
    const rangeKey = isMax ? `${filterName}Max` : `${filterName}Min`;
    onFiltersChange({
      ...filters,
      [rangeKey]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className={style.filterSidebar}>
      <div className={style.filterHeader}>
        <h3 className={style.filterTitle}>Filters</h3>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className={style.clearButton}>
            Clear All
          </button>
        )}
      </div>

      <div className={style.filterContent}>
        {/* Price Range */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Monthly Rent</h4>
          <div className={style.rangeInputs}>
            <div className={style.inputGroup}>
              <label>Min</label>
              <input
                type="number"
                placeholder="$0"
                value={filters.priceMin || ''}
                onChange={(e) => handleRangeChange('price', e.target.value)}
                className={style.numberInput}
                min="0"
                step="100"
              />
            </div>
            <div className={style.rangeSeparator}>to</div>
            <div className={style.inputGroup}>
              <label>Max</label>
              <input
                type="number"
                placeholder="Any"
                value={filters.priceMax || ''}
                onChange={(e) => handleRangeChange('price', e.target.value, true)}
                className={style.numberInput}
                min="0"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Bedrooms</h4>
          <div className={style.optionButtons}>
            {['Any', '0', '1', '2', '3', '4', '5+'].map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange('bedrooms', option === 'Any' ? '' : option)}
                className={`${style.optionButton} ${
                  (option === 'Any' && !filters.bedrooms) || filters.bedrooms === option
                    ? style.active
                    : ''
                }`}
              >
                {option === '0' ? 'Studio' : option}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Bathrooms</h4>
          <div className={style.optionButtons}>
            {['Any', '1', '1.5', '2', '2.5', '3', '3.5+'].map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange('bathrooms', option === 'Any' ? '' : option)}
                className={`${style.optionButton} ${
                  (option === 'Any' && !filters.bathrooms) || filters.bathrooms === option
                    ? style.active
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Location</h4>
          <div className={style.inputGroup}>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter city"
              value={filters.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={style.textInput}
            />
          </div>
          <div className={style.inputGroup}>
            <label>State</label>
            <input
              type="text"
              placeholder="e.g., MA"
              value={filters.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={style.textInput}
              maxLength="2"
            />
          </div>
          <div className={style.inputGroup}>
            <label>ZIP Code</label>
            <input
              type="text"
              placeholder="e.g., 02115"
              value={filters.zipcode || ''}
              onChange={(e) => handleInputChange('zipcode', e.target.value)}
              className={style.textInput}
              maxLength="10"
            />
          </div>
        </div>

        {/* Popularity */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Popularity</h4>
          <div className={style.inputGroup}>
            <label>Minimum Interest (Hearts)</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minUpvotes || ''}
              onChange={(e) => handleInputChange('minUpvotes', e.target.value)}
              className={style.numberInput}
              min="0"
            />
          </div>
        </div>

        {/* Listing Age */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Listing Age</h4>
          <div className={style.optionButtons}>
            {[
              { label: 'Any', value: '' },
              { label: 'Today', value: '1' },
              { label: 'This Week', value: '7' },
              { label: 'This Month', value: '30' }
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => handleInputChange('daysOld', option.value)}
                className={`${style.optionButton} ${
                  filters.daysOld === option.value ? style.active : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>



        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className={style.filterSummary}>
            <h4 className={style.groupTitle}>Active Filters</h4>
            <div className={style.activeFilters}>
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                
                let displayValue = value;
                if (key === 'priceMin') displayValue = `Min: $${value}`;
                if (key === 'priceMax') displayValue = `Max: $${value}`;
                if (key === 'bedrooms') displayValue = `${value} bed${value !== '1' ? 's' : ''}`;
                if (key === 'bathrooms') displayValue = `${value} bath${value !== '1' ? 's' : ''}`;
                if (key === 'minUpvotes') displayValue = `${value}+ hearts`;
                if (key === 'daysOld') {
                  if (value === '1') displayValue = 'Today';
                  else if (value === '7') displayValue = 'This week';
                  else if (value === '30') displayValue = 'This month';
                  else displayValue = `${value} days old`;
                }
                
                return (
                  <span key={key} className={style.activeFilter}>
                    {displayValue}
                    <button
                      onClick={() => handleInputChange(key, '')}
                      className={style.removeFilter}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;