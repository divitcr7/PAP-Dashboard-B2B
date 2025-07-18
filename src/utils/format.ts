import { parse, format } from "date-fns";

export function formatDate(
  dateString: string,
  formatStr: string = "MM/dd/yyyy"
): string {
  if (!dateString) return "";
  try {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

export function formatDateDDMMYYYY(date: Date | string | number): string {
  if (!date) return "";
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    return format(dateObj, "dd MMM, yy");
  } catch (error) {
    console.error("Error formatting date to DD MMM YY:", error);
    return "";
  }
}

export function formatPhoneNumber(value: string) {
  const number = value.replace(/\D/g, "");
  if (!number) return "";
  if (number.length <= 3) return `(${number}`;
  if (number.length <= 6) return `(${number.slice(0, 3)}) ${number.slice(3)}`;
  return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
}

export function formatZipCode(value: string) {
  // Remove all non-numeric characters
  const numbers = value.replace(/[^0-9]/g, "");
  
  if (!numbers) return "";
  
  // Limit to 5 digits for US/Texas standards
  if (numbers.length <= 5) {
    return numbers;
  } else {
    // Limit to exactly 5 digits
    return numbers.slice(0, 5);
  }
}

export function formatSSN(value: string) {
  // Remove all non-numeric characters
  const numbers = value.replace(/[^0-9]/g, "");
  
  if (!numbers) return "";
  
  // Format as XXX-XX-XXXX
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
  } else {
    // Limit to 9 digits total
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
  }
}

export function formatCurrency(
  value: string | number,
  maxValue = 1000000
): string {
  if (value === "" || value === null || value === undefined) return "";
  const numStr = value.toString().replace(/[^0-9.]/g, "");
  const num = parseFloat(numStr);
  if (isNaN(num)) return "";
  if (num > maxValue) return maxValue.toLocaleString("en-US");
  return num.toLocaleString("en-US");
}

export function processCurrencyInput(
  value: string,
  maxValue = 1000000
): number | string {
  const cleanValue = value.replace(/[^0-9.]/g, "");
  if (cleanValue === "" || cleanValue === ".") return "";
  const num = parseFloat(cleanValue);
  if (isNaN(num)) return "";
  return num > maxValue ? maxValue : num;
}
