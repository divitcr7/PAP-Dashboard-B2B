import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { OptionType } from "@/types";

interface CustomDropdownProps {
  type?: "state" | "country" | string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  options?: OptionType[];
  showSearch?: boolean;
  required?: boolean;
}

export const CustomDropdown = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  options,
  showSearch = true,
  required = false,
}: CustomDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const safeValue = typeof value === "string" && value !== "" ? value : undefined;
  
  // Error styling - enhanced red border for validation errors on required fields only
  const hasError = required && !value;
  const errorClass = hasError 
    ? "border-red-500 border-2 focus:border-red-500 focus:ring-red-200 focus:ring-2" 
    : "";

  return (
    <Select value={safeValue} onValueChange={onChange}>
      <SelectTrigger className={`${className || "w-[120px]"} ${errorClass}`}>
        <SelectValue placeholder={placeholder || `Select ${type}`} />
      </SelectTrigger>
      <SelectContent>
        {showSearch && (
          <div className="pb-2">
            <Input
              placeholder={`Search ${type ? type : ""}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
        )}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};
