export function checkoutSchema(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name";
  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone))
    errors.phone = "Use 09… or +2519… (TeleBirr number)";
  if (!AREAS.includes(form.area)) errors.area = "Choose a delivery area";
  return errors; // {} means valid
}
