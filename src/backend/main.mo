import Text "mo:core/Text";

actor {
  type ContactInfo = {
    companyName : Text;
    email : Text;
    phone : Text;
    whatsapp : Text;
    address : Text;
  };

  let contactInfo : ContactInfo = {
    companyName = "PT Ratu Aruna Samudera";
    email = "info@ratuarunasamudera.com";
    phone = "+62-21-1234567";
    whatsapp = "+62-812-3456-7890";
    address = "Jalan Sukarno Hatta no 123, Jakarta, Indonesia";
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    contactInfo;
  };
};
