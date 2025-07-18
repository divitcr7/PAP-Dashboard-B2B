import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { UseFormReturn, Path, FieldValues, PathValue } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

// Base props for all form fields
interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
}

// Props for input fields
interface FormInputFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  placeholder?: string;
  type?: string;
  maxLength?: number;
  max?: string | number;
  min?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  autoComplete?: string;
}

// Props for checkbox fields
interface FormCheckboxFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  options: {
    value: string | boolean;
    label: string;
  }[];
  inline?: boolean;
}



interface FormSimpleCheckboxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: React.ReactNode;
  className?: string;
  required?: boolean;
  defaultChecked?: boolean;
}

// Props for textarea fields
interface FormTextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
  label: React.ReactNode;
  labelClassName?: string;
  textareaClassName?: string;
  maxChars?: number;
}



const FormSimpleCheckbox = <T extends FieldValues>({
  form,
  name,
  label,
  className = "",
  required,
  defaultChecked = false,
}: FormSimpleCheckboxProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const value =
          field.value === undefined ? defaultChecked : !!field.value;

        // Only show visual error indicators for required fields
        const hasError = !!fieldState.error && required;
        const errorBorderClass = hasError 
          ? "border-red-500 border-2 rounded p-2 bg-red-50" 
          : "";

        return (
          <FormItem
            className={`flex items-start space-x-3 space-y-0 ${className} ${errorBorderClass}`}
          >
            <FormControl>
              <Checkbox
                checked={value}
                onCheckedChange={(checked) => {
                  field.onChange(checked || false);
                }}
              />
            </FormControl>
            <FormLabel className="font-normal">
              {label}
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

const FormTextareaField = <T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  placeholder = "",
  rows = 4,
  labelClassName = "",
  textareaClassName = "",
  maxChars,
}: FormTextareaFieldProps<T>) => {
  const [charCount, setCharCount] = useState(0);

  const isApproachingLimit =
    maxChars &&
    charCount >=
      Math.max(maxChars - Math.min(Math.floor(maxChars * 0.1), 10), 3);

  const isAtLimit = maxChars && charCount >= maxChars;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        // Only show visual error indicators for required fields
        const hasError = !!fieldState.error && required;
        const errorBorderClass = hasError 
          ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
          : "";

        return (
          <FormItem className={className}>
            <FormLabel className={labelClassName}>
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={placeholder}
                className={`resize-none ${textareaClassName} ${errorBorderClass}`}
                rows={rows}
                onChange={(e) => {
                  const value = e.target.value;
                  setCharCount(value.length);
                  field.onChange(e);
                }}
                maxLength={maxChars}
              />
            </FormControl>
            {maxChars && charCount > 0 && (
              <div
                className={`text-sm mt-1 text-right ${
                  isAtLimit
                    ? "text-red-600 font-medium"
                    : isApproachingLimit
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {charCount}/{maxChars} characters used
              </div>
            )}
          </FormItem>
        );
      }}
    />
  );
};

const FormInputField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  required = false,
  className = "",
  placeholder = "",
  type = "text",
  maxLength,
  max,
  min,
  onChange,
  inputClassName = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0 focus:border-gray-400 border-gray-300",
  autoComplete,
}: FormInputFieldProps<T>) => {
  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      // Default onChange behavior
      const target = e.target as HTMLInputElement;
      form.setValue(name, target.value as PathValue<T, Path<T>>);
    }
  }, [onChange, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        // Only show visual error indicators for required fields
        const hasError = !!fieldState.error && required;
        const errorBorderClass = hasError
          ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2"
          : "";

        return (
          <FormItem className={className}>
            <div className="flex items-center gap-2">
              <FormLabel className="min-w-fit">
                {description ? (
                  <div className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-1">
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {description}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {label}
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  maxLength={maxLength}
                  max={max}
                  min={min}
                  className={`${inputClassName} ${errorBorderClass}`}
                  onChange={handleChange}
                  value={field.value || ""}
                  autoComplete={autoComplete}
                />
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

const FormCheckboxField = <T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  options,
  inline = true,
}: FormCheckboxFieldProps<T>) => {
  useEffect(() => {
    const fieldValue = form.getValues(name);
    if (fieldValue === undefined || fieldValue === null) {
      const defaultOption =
        options.find((opt) => opt.value === true) || options[0];
      if (defaultOption) {
        form.setValue(name, defaultOption.value as PathValue<T, Path<T>>);
      }
    }
  }, [form, name, options]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        // Only show visual error indicators for required fields
        const hasError = !!fieldState.error && required;
        const errorBorderClass = hasError
          ? "border-red-500 border-2 rounded p-2 bg-red-50"
          : "";

        return (
          <FormItem className={className}>
            <div
              className={`flex items-center ${
                inline ? "gap-2 h-9" : "flex-col gap-2"
              } ${errorBorderClass}`}
            >
              <FormLabel className={`${inline ? "" : "mb-1"}`}>
                {label}
              </FormLabel>
              <FormControl>
                <div className={`flex ${inline ? "gap-2" : "flex-col gap-2"}`}>
                  {options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-1.5"
                    >
                      <Checkbox
                        checked={field.value === option.value}
                        onCheckedChange={() =>
                          form.setValue(
                            name,
                            option.value as PathValue<T, Path<T>>
                          )
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export {
  FormSimpleCheckbox,
  FormTextareaField,
  FormInputField,
  FormCheckboxField,
};
