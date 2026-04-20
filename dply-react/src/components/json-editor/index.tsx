import Editor from "@monaco-editor/react";
import Typography from "components/typography";
import { FieldError } from "react-hook-form";
import { isValidJSON } from "_helper/valid-json";

type InputProps = {
  error?: FieldError;
  helperText?: string;
  value: string;
  onChange: (val: string) => void;
  reserveHelperSpace?: boolean;
  label?: string;
  id?: string;
  required?: boolean;
}

const JsonEditor = ({
  value,
  onChange,
  label,
  error,
  helperText,
  id,
  required = false,
  reserveHelperSpace = true,
}: InputProps) => {
  const inputId = id ?? label;
  const helperMessage = error?.message ?? helperText;
  const helperTone = error ? "error" : "muted";

  return (
    <div className={`w-full flex flex-col gap-[7px]`}>
      {label &&
        <label className="flex items-center gap-1 text-sm text-text-primary" htmlFor={inputId}>
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      }
      <Editor
        height="400px"
        defaultLanguage="json"
        value={value}
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      {(reserveHelperSpace || helperMessage) ? (
        <Typography className="text-xs" tone={helperTone}>
          {helperMessage ?? "\u00A0"}
        </Typography>
      ) : null}
    </div>
  );
}

export default JsonEditor;