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
export default function SchemaDropdown({ placeholder }) {
  const [showOptions, setShowOptions] = useState(false);

  const { filteredOptions, selectedSchema, onSelectSchema, onClearSchema } =
    useSchemaContext();
  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const hasValue = selectedSchema && Object.keys(selectedSchema).length > 0;
  const isGroupTrait = GROUP_TRAITS.some(
    (trait) => trait === selectedSchema.value
  );
  const isUserTraits = USER_TRAITS.some(
    (trait) => trait === selectedSchema.value
  );

  const onSelectValue = (selectedOption) => {
    onSelectSchema(selectedOption);
    toggleOptions();
  };
  return (
    <div className="schema_dropdown_wrapper">
      <span
        className={`trait ${isGroupTrait ? "red" : ""} ${
          isUserTraits ? "green" : ""
        }`}
      ></span>
      <div className="dropdown">
        <div className="dropdown_hook" onClick={toggleOptions}>
          <div className="dropdown_hook_value">
            {hasValue ? selectedSchema.label : placeholder}
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
                  onClick={() => onSelectValue(option)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="clear_btn" onClick={onClearSchema}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
    </div>
  );
}
