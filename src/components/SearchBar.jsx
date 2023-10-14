import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "./SearchBar.scss";
import "react-datepicker/dist/react-datepicker.css";

const RESULTS_SIZE_OPTIONS = [
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 75,
    label: "75",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 200,
    label: "200",
  },
];

const COUNTRY_OPTIONS = [
  {
    value: "US",
    label: "United States",
  },
  {
    value: "JP",
    label: "Japan",
  },
  {
    value: "FR",
    label: "France",
  },
  {
    value: "DE",
    label: "Germany",
  },
];
const SearchBar = ({
  setDate,
  setPageSize,
  setCountry,
  pageSize,
  date,
  country,
}) => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showNumResultsFilter, setShowNumResultsFilter] = useState(false);
  const [showCountryFilter, setShowCountryFilter] = useState(false);
  const { innerWidth } = window;
  return (
    <div className="searchbar">
      <div className="searchbar__content">
        <div
          className="searchbar__content__filter"
          onClick={(e) => setShowDateFilter(!showDateFilter)}
          onBlur={() => {
            setShowDateFilter(false);
          }}
          onFocus={() => {
            setShowNumResultsFilter(false);
            setShowCountryFilter(false);
          }}
        >
          <img src={require("../assets/calendar.png")} />
          <div className="search__content__filter date">
            <label>DATE {showDateFilter ? <>&#x25B2;</> : <>&#x25BC;</>}</label>
            <DatePicker
              selected={date}
              formatWeekDay={(nameOfDay) =>
                nameOfDay.substr(0, 3).toUpperCase()
              }
              onChange={(date) => setDate(date)}
              open={showDateFilter}
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>
        <div className="searchbar__content__vl" />
        <div
          className="searchbar__content__filter searchbar__content__filter__country"
          onClick={(e) => setShowNumResultsFilter(!showNumResultsFilter)}
          onBlur={() => {
            setShowNumResultsFilter(false);
          }}
          onFocus={() => {
            setShowDateFilter(false);
            setShowCountryFilter(false);
          }}
        >
          <img src={require("../assets/results_filter.png")} />
          <div className="search__content__filter select">
            <label>
              {innerWidth >= 768 ? "NUM RESULTS" : "# RESULTS"}{" "}
              {showNumResultsFilter ? <>&#x25B2;</> : <>&#x25BC;</>}{" "}
            </label>
            <Select
              placeholder=""
              value={RESULTS_SIZE_OPTIONS.filter(
                (option) => option.value === pageSize
              )}
              onChange={(e) => setPageSize(e.value)}
              options={RESULTS_SIZE_OPTIONS}
              menuIsOpen={showNumResultsFilter}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#E68A00"
                    : state.isFocused
                    ? "#f1f3f3"
                    : "inherit",
                }),
              }}
            />
          </div>
        </div>
        <div className="searchbar__content__vl" />
        <div
          className="searchbar__content__filter searchbar__content__filter__country"
          onClick={() => setShowCountryFilter(!showCountryFilter)}
          onBlur={() => {
            setShowCountryFilter(false);
          }}
          onFocus={() => {
            setShowDateFilter(false);
            setShowNumResultsFilter(false);
          }}
        >
          <img src={require("../assets/country.png")} />
          <div className="search__content__filter select">
            <label>
              Country {showCountryFilter ? <>&#x25B2;</> : <>&#x25BC;</>}{" "}
            </label>
            <Select
              placeholder=""
              value={COUNTRY_OPTIONS.filter(
                (option) => option.value === country
              )}
              onChange={(e) => setCountry(e.value)}
              options={COUNTRY_OPTIONS}
              menuIsOpen={showCountryFilter}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#2464C6"
                    : state.isFocused
                    ? "#f1f3f3"
                    : "inherit",
                }),
              }}
            />
          </div>
        </div>

        <button className="searchbar__search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
