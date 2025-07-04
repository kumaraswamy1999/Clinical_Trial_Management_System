export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  // window.location.href = "/login";
};

export const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "");
  return user;
};

export function formatDateToDDMMYYYY(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
