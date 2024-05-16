// import  from "@mui/material/TextField";
import { Stack, Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputAutocomplete({
  className,
  label,
  options,
  valuee,
  onChange,
}) {
  const defaultValue = valuee !== undefined ? valuee : "";

  return (
    <Stack spacing={2} className="w-full">
      <Autocomplete
        className={className}
        value={defaultValue}
        onChange={onChange}
        isOptionEqualToValue={(option, value) => {
          return (
            option.title ===
            `${value}${option.abbreviation ? ` - ${option.abbreviation}` : ``}`
          ); // Teste si l'option correspond à la valeur
        }}
        id="grouped-demo"
        options={options.map(
          (option) =>
            `${option.title}${
              option.abbreviation ? ` - ${option.abbreviation}` : ``
            }`
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}

InputAutocomplete.propTypes = {
  className: PropTypes.node,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  valuee: PropTypes.string,
  onChange: PropTypes.func,
};
