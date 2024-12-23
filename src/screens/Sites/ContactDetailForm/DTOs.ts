import { Contact } from "../../Contacts/DTOs/ContactProps";


interface ContactDetailFormProps {
  handleContactEdit: () => void;
  primaryContactDetails: Contact;
  hasMoreDetails: boolean;
  handleMoreDetails: () => void;
}

export type { ContactDetailFormProps };
