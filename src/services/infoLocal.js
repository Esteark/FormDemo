export const setSesionUser = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
