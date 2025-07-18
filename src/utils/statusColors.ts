export const getStatusColor = (status: string | null | undefined): string => {
  if (typeof status !== "string" || !status) {
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  }
  switch (status.toLowerCase()) {
    case "vacant":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "occupied":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "notice to vacate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "preleased":
    case "vacant preleased":
    case "notice to vacate preleased":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  }
};
