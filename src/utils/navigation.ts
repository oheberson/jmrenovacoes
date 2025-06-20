// An array of links for navigation bar
const navBarLinks = [
  { name: "Início", url: "/" },
  { name: "Galeria", url: "/gallery" },
  /* { name: "Serviços", url: "/products" },
  { name: "Contato", url: "/contact" }, */
];
// An array of links for footer
const footerLinks = [
  /* {
    section: "Ecosystem",
    links: [
      { name: "Documentation", url: "/welcome-to-docs/" },
      { name: "Tools & Equipment", url: "/products" },
      { name: "Construction Services", url: "/services" },
    ],
  }, */
  {
    section: "Empresa",
    links: [
      { name: "Sobre nós", url: "/" },
      { name: "Portfolio", url: "/gallery" },
      /* { name: "Serviços", url: "#" }, */
      { name: "Contato", url: "https://wa.me/+351966467368" },
    ],
  },
];
// An object of links for social icons
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