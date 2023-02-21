import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { AddressDto, defaultAddress } from "../../services/CDLLead.services";

const styles = {
  suggestionOption: "styles_suggestionOption",
  autoCompleteContainer: "styles_autoCompleteContainer",
  searchInput: "styles_searchInput",
  suggestions: "styles_suggestions",
  active: "styles_active",
  separator: "styles_separator",
};

type IProps = {
  placeholder: string;
  onCoordinatesFound: (
    city: string,
    latLng: google.maps.LatLngLiteral,
    allInfo: AddressDto
  ) => void;
  allowQuery?: boolean;
  value?: string;
};

const AutoCompleteInput = ({
  placeholder = "",
  onCoordinatesFound,
  allowQuery = true,
  value = "",
}: IProps) => {
  const [address, setAddress] = useState(value);
  const autoCompleteRef: any = useRef(null);

  // ------------------------------------------------------------------------
  // Callback Functions
  // ------------------------------------------------------------------------

  const handleChange = (addr: string) => {
    setAddress(addr);
    handleSelectedAddress(addr);
  };

  const handleSelectedAddress = async (addr: string) => {
    try {
      if (addr !== address) {
        const result = await geocodeByAddress(addr);
        const latLng = await getLatLng(result[0]);

        const allData = defaultAddress;

        result[0].address_components.map((item) => {
          if (item.types.includes("postal_code")) {
            allData.postalCode = item.long_name;
          }
          if (item.types.includes("country")) {
            allData.country = item.long_name;
          }
          if (item.types.includes("administrative_area_level_1")) {
            allData.state = item.long_name;
          }
          if (item.types.includes("locality")) {
            allData.city = item.long_name;
          }
        });

        allData.latitude = latLng.lat;
        allData.longitude = latLng.lng;
        allData.fullAddress = addr;

        onCoordinatesFound(addr, latLng, allData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      searchOptions={{
        types: ["(regions)"], // only cities
        componentRestrictions: { country: ["us", "ca"] },
      }}
      ref={autoCompleteRef}
      onChange={handleChange}
      googleCallbackName="googleCallback"
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => {
        return (
          <div className={styles.autoCompleteContainer}>
            <input
              {...getInputProps()}
              className={styles.searchInput}
              autoComplete="off"
              placeholder={placeholder}
            />
            <div className={suggestions.length ? styles.suggestions : ""}>
              {suggestions.map((suggestion) => {
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className: clsx(
                        "drop-down-item pt-2 pb-2",
                        styles.suggestionOption,
                        suggestion.active && styles.active
                      ),
                      key: suggestion.id,
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
              <div
                className={clsx("drop-down-item pt-2 pb-2", styles.separator)}
              />
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default AutoCompleteInput;
