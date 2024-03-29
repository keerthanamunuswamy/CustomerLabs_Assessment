import { createContext, useContext, useReducer } from "react";
const UPDATE_SELECTED = "UPDATE_SELECTED";
const REMOVE_SCHEMA = "REMOVE_SCHEMA";
const ADD_SCHEMA = "ADD_SCHEMA";
const SELECT_SCHEMA = "SELECT_SCHEMA";
const CLEAR_SCHEMA = " CLEAR_SCHEMA";
const RESET = "RESET";
const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];
export const SchemaContext = createContext({
  filteredOptions: schemaOptions,
  selectedOptions: [],
  allOptions: schemaOptions,
  selectedSchema: {},
  onAddSchema: () => {},
  onRemoveSchema: () => {},
  onUpdateSelected: () => {},
  onSelectSchema: () => {},
  onClearSchema: () => {},
  onReset: () => {},
});

export const useSchemaContext = () => {
  const schemaContext = useContext(SchemaContext);
  if (!schemaContext) {
    throw new Error(
      "The context can only be used with those wrapped by <SchemaContextProvider />"
    );
  }
  return schemaContext;
};

const schemaReducer = (state, action) => {
  if (action.type === UPDATE_SELECTED) {
    const { selectedOption, index } = action.payload;
    const selectedSchema = [...state.selectedOptions];
    selectedSchema[index] = selectedOption;

    const updateFiltered = [...state.allOptions].filter(
      (option) =>
        !selectedSchema.some(
          (selectedOption) => selectedOption.value === option.value
        )
    );
    return {
      ...state,
      filteredOptions: updateFiltered,
      selectedOptions: selectedSchema,
    };
  }

  if (action.type === REMOVE_SCHEMA) {
    const { index } = action.payload;
    const updatedSelectedOptions = [...state.selectedOptions];
    updatedSelectedOptions.splice(index, 1);
    const updatedFilteredOptions = state.allOptions.filter((option) => {
      return !updatedSelectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
    });

    return {
      ...state,
      selectedOptions: updatedSelectedOptions,
      filteredOptions: updatedFilteredOptions,
    };
  }

  if (action.type === ADD_SCHEMA) {
    const { selectedSchema } = action.payload;
    const selectedOptions = [...state.selectedOptions];
    const isExisting = state.selectedOptions.some(
      (schema) => schema.value === selectedSchema.value
    );

    if (isExisting && selectedOptions.length > 0) {
      return { ...state };
    }

    const updatedSelectedOptions = [...state.selectedOptions, selectedSchema];

    const updatedFilteredOptions = state.allOptions.filter((option) => {
      return !updatedSelectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
    });

    return {
      ...state,
      selectedOptions: updatedSelectedOptions,
      filteredOptions: updatedFilteredOptions,
    };
  }

  if (action.type === SELECT_SCHEMA) {
    const { selected } = action.payload;
    return {
      ...state,
      selectedSchema: selected,
    };
  }
  if (action.type === CLEAR_SCHEMA) {
    if (Object.keys(state.selectedSchema)) {
      return {
        ...state,
        selectedSchema: {},
      };
    }
    return { ...state };
  }
  if (action.type === RESET) {
    return {
      ...state,
      selectedOptions: [],
      filteredOptions: schemaOptions,
    };
  }
  return state;
};
export default function SchemaContextProvider({ children }) {
  const [selectedState, dispatch] = useReducer(schemaReducer, {
    filteredOptions: schemaOptions,
    selectedOptions: [],
    allOptions: schemaOptions,
    selectedSchema: {},
  });

  const onUpdateSelected = (selectedOption, index) => {
    dispatch({
      type: UPDATE_SELECTED,
      payload: {
        selectedOption,
        index,
      },
    });
  };

  const onAddSchema = (selectedOption) => {
    dispatch({ type: ADD_SCHEMA, payload: { selectedSchema: selectedOption } });
  };

  const onRemoveSchema = (index) => {
    dispatch({ type: REMOVE_SCHEMA, payload: { index } });
  };
  const onSelectSchema = (value) => {
    dispatch({ type: SELECT_SCHEMA, payload: { selected: value } });
  };
  const onClearSchema = () => {
    dispatch({ type: CLEAR_SCHEMA });
  };

  const onReset = () => {
    dispatch({ type: RESET });
  };

  const ctxValue = {
    filteredOptions: selectedState.filteredOptions,
    selectedOptions: selectedState.selectedOptions,
    allOptions: selectedState.allOptions,
    selectedSchema: selectedState.selectedSchema,
    onAddSchema,
    onRemoveSchema,
    onUpdateSelected,
    onSelectSchema,
    onClearSchema,
    onReset,
  };
  return (
    <SchemaContext.Provider value={ctxValue}>{children}</SchemaContext.Provider>
  );
}
