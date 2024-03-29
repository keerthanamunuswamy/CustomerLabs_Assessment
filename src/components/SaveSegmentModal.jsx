import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSchemaContext } from "../context/SchemaContext";
import "./SaveSegmentModal.scss";
import SchemaDropdown from "./SchemaDropdown";
import SegmentDropdown from "./SegmentDropdown";
import { useState } from "react";

export default function SaveSegementModal({ onClose }) {
  const {
    selectedOptions,
    selectedSchema,
    onAddSchema,
    onClearSchema,
    onReset,
  } = useSchemaContext();
  const [segmentName, setSegmentName] = useState("");
  const hasValue = selectedSchema && Object.keys(selectedSchema).length > 0;

  const handleNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaAdd = () => {
    if (hasValue) {
      onAddSchema(selectedSchema);
      onClearSchema();
    }
  };
  const isSaveDisabled = segmentName === "" || selectedOptions.length < 0;

  const onSaveSegemnt = async () => {
    if (isSaveDisabled) {
      return;
    }
    const requestBody = {
      segment_name: segmentName,
      schema: [...selectedOptions].map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    const response = await fetch(
      "https://webhook.site/546708e7-511a-403c-b53e-9f78e360f598",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const resData = await response.json();
    if (resData.ok) {
      onReset();
    }
  };

  return (
    <>
      <div className="save_segment">
        <div className="save_segment_header">
          <div className="back_icon" onClick={onClose}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="title">Saving Segment</div>
        </div>

        <div className="save_segment_content">
          <div className="save_segment_content_name">
            <label htmlFor="segment_name">Enter the Name of the Segment</label>
            <input
              type="text"
              id="segment_name"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={handleNameChange}
            />
          </div>
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <div className="save_segment_content_legend">
            <span className="green"></span> - User Traits
            <span className="red"></span> - Group Traits
          </div>
          {selectedOptions.length > 0 && (
            <div className="save_segment_content_bluebox">
              {selectedOptions.map((segment, index) => {
                return (
                  <SegmentDropdown
                    key={segment.value}
                    selectedValue={segment}
                    index={index}
                    placeholder=""
                  />
                );
              })}
            </div>
          )}
          <div className="save_segment_content_add_segment">
            <SchemaDropdown placeholder="Add schema to segment" />
          </div>
          <div
            className={`save_segment_content_add_schema ${
              !hasValue ? "disabled" : ""
            }`}
            onClick={handleSchemaAdd}
          >
            + Add new schema
          </div>
        </div>
        <div className="save_segment_actions">
          <button
            className={`save ${isSaveDisabled ? "disabled" : ""}`}
            onClick={onSaveSegemnt}
            disabled={isSaveDisabled}
          >
            Save the Segment
          </button>
          <button className="cancel">Cancel</button>
        </div>
      </div>
      ;
    </>
  );
}
