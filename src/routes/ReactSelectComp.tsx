import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three"),
];

const ReactSelectComp = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState<readonly Option[]>([]);

  const handleAddOption = (input: string) => {
    const newOption = createOption(input);
    setValue((prev) => [...prev, newOption]);
    setOptions((prev) => [...prev, newOption]);
    setInputValue("");
  };

  const handleKeyDown: React.KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        handleAddOption(inputValue);
        event.preventDefault();
    }
  };

  return (
    <div style={{ width: "600px", color: "black" }}>
      <CreatableSelect
        // components={components}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        isClearable
        isMulti
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleAddOption}
        options={options}
        value={value}
      />
    </div>
  );
};

export default ReactSelectComp;
