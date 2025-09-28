/**
 * @file Utility function for formatting dates.
 */

/**
 * Converts an ISO date string into a human-readable relative time format.
 * (e.g., "Updated 5 days ago").
 * @param {string} dateString - The ISO 8601 date string to format.
 * @returns {string} The formatted relative time string.
 */
export const formatDateAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return `Updated ${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `Updated ${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `Updated ${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `Updated ${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `Updated ${Math.floor(interval)} minutes ago`;
  }
  return `Updated just now`;
};