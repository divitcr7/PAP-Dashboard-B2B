import { toast } from "@/utils";

export const handleCopyToClipboard = (text: string, type: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(`${type} copied to clipboard!`);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.error(`Failed to copy ${type}.`);
    });
};

export const handlePhoneClick = (phoneNumber: string) => {
  // Use CSS classes to determine device type
  const isMobileDevice = window.matchMedia('(hover: none) and (pointer: coarse), (max-width: 768px)').matches;
  if (isMobileDevice) {
    window.location.href = `tel:${phoneNumber}`;
  } else {
    handleCopyToClipboard(phoneNumber, 'Phone number');
  }
};

export const openGoogleMaps = (address: string, city: string, state: string, zip: string) => {
  const formattedAddress = encodeURIComponent(
    `${address}, ${city}, ${state} ${zip}`
  );
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`,
    "_blank"
  );
};