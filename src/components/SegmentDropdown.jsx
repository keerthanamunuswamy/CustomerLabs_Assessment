import "./SegmentDropdown.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSchemaContext } from "../context/SchemaContext";
const USER_TRAITS = [
  "first_name",
  "last_name",
  "age",
  "state",
  "city",
  "gender",
];
const GROUP_TRAITS = ["account_name"];
export default function SegmentDropdown({ selectedValue, index, placeholder }) {
  const [value, setValue] = useState(selectedValue);
  const { filteredOptions, onUpdateSelected, onRemoveSchema } =
    useSchemaContext();

  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const hasValue = value && Object.keys(value).length > 0;
  const isGroupTrait = GROUP_TRAITS.some((trait) => trait === value.value);
  const isUserTraits = USER_TRAITS.some((trait) => trait === value.value);
  const onSelectValue = (selectedOption, index) => {
    setValue(selectedOption);
    onUpdateSelected(selectedOption, index);
    toggleOptions();
  };
  return (
    <div className="segment_dropdown_wrapper">
      <span
        className={`trait ${isGroupTrait ? "red" : ""} ${
          isUserTraits ? "green" : ""
        }`}
      ></span>
      <div className="dropdown">
        <div className="dropdown_hook" onClick={toggleOptions}>
          <div className="dropdown_hook_value">
            {hasValue ? value.label : placeholder}
          </div>
          <span className="arrow">
            <FontAwesomeIcon icon={faChevronDown} size="2xs" />
          </span>
        </div>
        {showOptions && (
          <div className="dropdown_options">
            {filteredOptions.map((option) => {
              return (
                <div
                  key={option.value}
                  className="dropdown_options_item"
                  onClick={() => onSelectValue(option, index)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="clear_btn" onClick={() => onRemoveSchema(index)}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
    </div>
  );
}
