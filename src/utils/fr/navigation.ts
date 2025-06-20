
const navBarLinks = [
  { name: "Accueil", url: "/fr" },
  { name: "Produits", url: "/fr/products" },
  { name: "Services", url: "/fr/services" },
  { name: "Blog", url: "/fr/blog" },
  { name: "Contact", url: "/fr/contact" },
];

const footerLinks = [
  {
    section: "Écosystème",
    links: [
      { name: "Documentation", url: "/fr/welcome-to-docs/" },
      { name: "Outils et Équipements", url: "/fr/products" },
      { name: "Services de Construction", url: "/fr/services" },
    ],
  },
  {
    section: "Société",
    links: [
      { name: "À propos de nous", url: "#" },
      { name: "Blog", url: "/fr/blog" },
      { name: "Carrières", url: "#" },
      { name: "Clients", url: "#" },
    ],
  },
];

const socialLinks = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/jm.remodelacao/",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "https://maps.app.goo.gl/XUFG5MyTho9ifygH6",
  whatsapp: "https://wa.me/+351966467368",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};