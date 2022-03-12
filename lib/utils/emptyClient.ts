import { format, addDays } from "date-fns";
import { Client } from "types";

function emptyClient(): Client {
  return {
    address: {
      city: "",
      country: "",
      postCode: "",
      street: "",
    },
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    isSelf: false
  };
}
export { emptyClient };