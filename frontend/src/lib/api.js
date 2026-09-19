import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

export const CONTACT = {
  phone: "+1 (555) 013-4200",
  phoneHref: "tel:+15550134200",
  email: "hello@coregridx.com",
  emailHref: "mailto:hello@coregridx.com",
};
