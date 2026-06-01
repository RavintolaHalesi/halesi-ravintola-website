"use client";

import { useEffect, useState } from "react";
import ScrollReset from "./scroll-reset";

const translations = {
  en: {
    navHome: "Home",
    navMenu: "Menu",
    navReservation: "Reservation",
    navGallery: "Gallery",
    navContact: "Contact",
    navAbout: "About Us",
    badge: "Nepalese Restaurant",
    heroTitle: "Himalayan Flavours in the Heart of Hyvinkaa",
    heroText:
      "Welcome to Halesi! We bring you authentic and flavorful dishes inspired by Nepalese cuisine in a warm, cozy setting. Our restaurant is conveniently located at Hämeenkatu 27-29 in Hyvinkää just a 5-minute walk (about 400 meters) straight ahead on the same side from Willa Shopping Centre.",
    heroButton: "Reserve a Table",
    heroImage: "Add your main restaurant image here",
    lunchText: "Enjoy our tasty and ever-changing lunch buffet menu on weekdays from 10:30 to 15:00.",
    menuTitle: "A la Carte Delights, Crafted for Every Craving",
    menuText:
      "We serve beautiful, hearty dishes from our a la carte menu during both lunch and dinner.",
    menuImage: "Add a featured dish photo here",
    hoursTitle: "Opening Hours",
    hoursMonThu: "Mon - Thu",
    hoursFriday: "Fri",
    hoursSaturday: "Sat",
    hoursSunday: "Sun",
    comboTitle: "Momo-Chowmein Combo",
    comboText:
      "Momo Chowmein is a tasty Nepali street food combo of juicy dumplings and stir-fried noodles, served with spicy achar. Simple, flavorful, and super satisfying.",
    comboImage: "Add combo image here",
    reserveTitle: "Book a Reservation",
    reserveIntro: "",
    reserveButton: "Reserve",
    formName: "Name",
    formPhone: "Phone Number",
    formGuests: "Guests",
    formDate: "Date",
    formTime: "Time",
    formNotes: "Notes",
    contactTitle: "Contact Us",
    contactEmailLabel: "Email",
    contactPhoneLabel: "Phone",
    contactAddressLabel: "Address",
    mapLabel: "Open in Google Maps",
    aboutTitle: "About Halesi",
    aboutText:
      "Halesi also known as halesi mahadev and maratika cave is an ancient and revered spiritual site in eastern Nepal, with origins rooted in early religious tradition and mythology. In Hindu belief, it is associated with Lord Shiva, while in Buddhism it is known as Maratika Cave, linked to Padmasambhava. Recognized for its significance across Hindu, Buddhist, and Kirat traditions, Halesi stands as a lasting symbol of religious harmony and cultural heritage.",
    aboutImage: "Add interior or cultural image here",
    footerBrandBlurb: "Authentic Nepalese flavours served in the heart of Hyvinkaa.",
    footerQuickLinks: "Quick Links",
    footerContact: "Contact Us",
    footerSocial: "Follow Us",
    footerRights: "© 2026 Ravintola Halesi. All rights reserved.",
    footerInstagram: "Instagram",
    footerFacebook: "Facebook",
    footerTikTok: "TikTok",
    footerLinkedIn: "LinkedIn",
    reservationSuccess: "Reservation received successfully. The email notification was sent.",
    reservationError: "Reservation sending is not configured or something went wrong. Please try again."
  },
  fi: {
    navHome: "Etusivu",
    navMenu: "Menu",
    navReservation: "Varaus",
    navGallery: "Galleria",
    navContact: "Yhteystiedot",
    navAbout: "Meista",
    badge: "Nepalilainen ravintola",
    heroTitle: "Himalajan maut Hyvinkaan sydamessa",
    heroText:
      "Tervetuloa Halesiin. Tarjoamme aitoja nepalilaisia makuja lampimassa ja viihtyisassa ravintolassa Hyvinkaan keskustassa, vain lyhyen kavelymatkan paassa Willa-kauppakeskuksesta.",
    heroButton: "Varaa poyta",
    heroImage: "Lisaa paakuva tahan",
    lunchText: "Nauti maistuvasta ja vaihtuvasta lounaastamme arkisin klo 10.15-15.00.",
    menuTitle: "A la carte -annoksia jokaiseen mielitekoon",
    menuText:
      "Tarjoilemme kauniita ja ruokaisia annoksia a la carte -listaltamme niin lounaalla kuin illallisella.",
    menuImage: "Lisaa annoskuva tahan",
    hoursTitle: "Aukioloajat",
    hoursMonThu: "Ma - To",
    hoursFriday: "Perjantai",
    hoursSaturday: "La",
    hoursSunday: "Su",
    comboTitle: "Momo-Chowmein-yhdistelma",
    comboText:
      "Momo Chowmein on maukas nepalilainen katuruokayhdistelma, jossa on mehukkaita momo-nyytteja ja wokattuja nuudeleita tulisen acharin kanssa. Yksinkertainen, maukas ja tayttava.",
    comboImage: "Lisaa yhdistelmakuvan tahan",
    reserveTitle: "Tee varaus",
    reserveIntro: "",
    reserveButton: "Varaa",
    formName: "Nimi",
    formPhone: "Puhelinnumero",
    formGuests: "Henkiloita",
    formDate: "Paivamaara",
    formTime: "Aika",
    formNotes: "Lisatiedot",
    contactTitle: "Ota yhteytta",
    contactEmailLabel: "Sahkoposti",
    contactPhoneLabel: "Puhelin",
    contactAddressLabel: "Osoite",
    mapLabel: "Avaa Google Maps",
    aboutTitle: "Tietoa Halesista",
    aboutText:
      "Halesi, joka tunnetaan myos nimilla Halesi Mahadev ja Maratika Cave, on muinainen ja arvostettu hengellinen paikka Ita-Nepalissa. Silla on merkitysta hindulaisessa, buddhalaisessa ja kirat-perinteessa ja se symboloi uskontojen valista harmoniaa ja kulttuuriperintoa.",
    aboutImage: "Lisaa sisakuva tai kulttuurikuva tahan",
    footerBrandBlurb: "Aitoja nepalilaisia makuja Hyvinkaan sydamessa.",
    footerQuickLinks: "Pikalinkit",
    footerContact: "Ota yhteytta",
    footerSocial: "Seuraa meita",
    footerRights: "© 2026 Ravintola Halesi. Kaikki oikeudet pidatetty.",
    footerInstagram: "Instagram",
    footerFacebook: "Facebook",
    footerTikTok: "TikTok",
    footerLinkedIn: "LinkedIn",
    reservationSuccess: "Varaus vastaanotettiin onnistuneesti. Ilmoitussahkoposti lahetettiin.",
    reservationError: "Varausten lahetys ei ole kaytossa tai jokin meni pieleen. Yrita uudelleen."
  }
};

const openingHours = [
  { key: "hoursMonThu", value: "10:30-20:00" },
  { key: "hoursFriday", value: "10:30-21:00" },
  { key: "hoursSaturday", value: "12:00-21:00" },
  { key: "hoursSunday", value: "12:00-19:00" }
];

function ImagePlaceholder({ label, tone = "warm" }) {
  return (
    <div className={`imagePlaceholder imagePlaceholder-${tone}`}>
      <span>{label}</span>
    </div>
  );
}

function SocialIcon({ platform }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
        <path d="M13.5 21v-7.2h2.4l.4-3h-2.8V8.9c0-.9.3-1.5 1.6-1.5h1.4V4.8c-.2 0-.9-.1-1.9-.1-3 0-4.8 1.8-4.8 5.1v1H7.6v3h2.2V21h3.7Z" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
        <path d="M14.6 4.2c.5 1.5 1.4 2.7 3 3.6v2.6a7 7 0 0 1-3-.9v5.7a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.1.1v2.8a2.7 2.7 0 1 0 1.6 2.4V4.2h2.6Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="7.3" y="10.1" width="2.3" height="6.2" fill="currentColor" />
      <circle cx="8.45" cy="7.8" r="1.3" fill="currentColor" />
      <path d="M12 10.1h2.2v.9c.5-.7 1.3-1.2 2.5-1.2 2.1 0 3.3 1.4 3.3 4v2.5h-2.4v-2.2c0-1.2-.4-2-1.5-2-1 0-1.7.7-1.7 2v2.2H12v-6.2Z" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  const [language, setLanguage] = useState("en");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("halesi-language");
    if (savedLanguage === "en" || savedLanguage === "fi") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [language]);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const t = translations[language];

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    const form = event.currentTarget;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.language = language;

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.details || result.error || t.reservationError);
      }

      setStatus({ type: "success", message: t.reservationSuccess });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || t.reservationError });
    } finally {
      setLoading(false);
    }
  }

  return (
    <><ScrollReset /><main className="page">
      <div className="shell">
        <header className={`topbar ${mobileNavOpen ? "mobileNavOpen" : ""}`}>
          <a className="logoPanel" href="#home" aria-label="Halesi Ravintola home">
            <img src="/assets/logo.png" alt="Halesi Ravintola logo" />
          </a>

          <button
            type="button"
            className="mobileMenuBtn"
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="navPanel">
            <nav className="nav">
              <a href="#home" onClick={() => setMobileNavOpen(false)}>{t.navHome}</a>
              <a href="/menu.html" onClick={() => setMobileNavOpen(false)}>{t.navMenu}</a>
              <a href="#reservation" onClick={() => setMobileNavOpen(false)}>{t.navReservation}</a>
              <a href="#contact" onClick={() => setMobileNavOpen(false)}>{t.navContact}</a>
              <a href="#about" onClick={() => setMobileNavOpen(false)}>{t.navAbout}</a>
              <a href="/gallery.html" onClick={() => setMobileNavOpen(false)}>{t.navGallery}</a>
            </nav>

            <div className="langSwitch" aria-label="Language switcher">
              <button
                type="button"
                className={language === "en" ? "langBtn active" : "langBtn"}
                onClick={() => { localStorage.setItem("halesi-language", "en"); setLanguage("en"); }}
              >
                EN
              </button>
              <button
                type="button"
                className={language === "fi" ? "langBtn active" : "langBtn"}
                onClick={() => { localStorage.setItem("halesi-language", "fi"); setLanguage("fi"); }}
              >
                FI
              </button>
            </div>
          </div>
        </header>

        <section id="home" className="heroSection">
          <div className="heroCopy">
            <span className="eyebrow">{t.badge}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroText}</p>
            <a className="heroButton" href="#reservation">
              {t.heroButton}
            </a>
          </div>
          <div className="heroPhotoCard"><img src="/assets/hero-restaurant.jpeg" alt="Ravintola Halesi interior" className="heroPhoto" /></div>
        </section>

        <section className="lunchStrip">
          <p>{t.lunchText}</p>
          <span className="priceTag">12,90€</span>
        </section>

        <section id="menu" className="contentSection twoColumn">
          <div className="card textCard">
            <h2>{t.menuTitle}</h2>
            <p>{t.menuText}</p>
          </div>
          <div className="dishImageCard">
            <img src="/assets/a-la-carte.jpeg" alt="A la carte dish" />
          </div>
        </section>

        <section className="contentSection twoColumn">
          <div className="dishImageCard">
            <img src="/assets/momo-chowmein.jpeg" alt="Momo Chowmein combo" />
          </div>
          <div className="card comboCard">
            <h3>{t.comboTitle}</h3>
            <p>{t.comboText}</p>
          </div>
        </section>

        <section id="reservation" className="reservationSection">
          <div className="reservationLayout">
            <form className="reservationCard" onSubmit={handleSubmit}>
              <h2 className="reservationCardTitle">{t.reserveTitle}</h2>
              <input name="name" type="text" placeholder={t.formName} required />
              <input name="phone" type="tel" placeholder={t.formPhone} required />

              <div className="formRow secondaryRow reservationPickerStack">
                <input
                  name="date"
                  type="text"
                  placeholder={t.formDate}
                  aria-label={t.formDate}
                  required
                />
                <input
                  name="time"
                  type="text"
                  placeholder={t.formTime}
                  aria-label={t.formTime}
                  required
                />
              </div>

              <div className="formRow secondaryRow">
                <input
                  name="guests"
                  type="number"
                  min="1"
                  max="20"
                  placeholder={t.formGuests}
                  aria-label={t.formGuests}
                  required
                />
                <input name="notes" type="text" placeholder={t.formNotes} />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? `${t.reserveButton}...` : t.reserveButton}
              </button>
              <p className={`formMessage ${status.type}`}>{status.message}</p>
            </form>

            <div className="card hoursCard reservationHoursCard">
              <h3>{t.hoursTitle}</h3>
              <div className="hoursList">
                {openingHours.map((item) => (
                  <p key={item.key}>
                    <span>{t[item.key]}</span>
                    <strong>{item.value}</strong>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contentSection contactSection">
          <div className="card contactCard">
            <h2>{t.contactTitle}</h2>
            <p>
              <span>{t.contactEmailLabel}:</span>{" "}
              <a href="mailto:ravintolahalesi@gmail.com">ravintolahalesi@gmail.com</a>
            </p>
            <p>
              <span>{t.contactPhoneLabel}:</span>{" "}
              <a href="tel:0413287884">0413287884</a>
            </p>
            <p>
              <span>{t.contactAddressLabel}:</span> Hämeenkatu 27-29, 05800 Hyvinkää
            </p>
          </div>

          <div className="mapEmbedCard">
            <iframe
              title="Halesi Ravintola location"
              src="https://www.google.com/maps?q=H%C3%A4meenkatu%2027-29%2C%2005800%20Hyvink%C3%A4%C3%A4&amp;z=17&amp;output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="mapFallbackLink"
              href="https://maps.app.goo.gl/G32i6h8w52rpSoVG7"
              target="_blank"
              rel="noreferrer"
            >
              {t.mapLabel}
            </a>
          </div>
        </section>

        <section id="about" className="contentSection twoColumn">
          <div className="card textCard">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>
          </div>
          <div className="dishImageCard">
            <img src="/assets/about-halesi.jpg" alt="Halesi cave" />
          </div>
        </section>

        <footer className="footer">
          <div className="footerTop">
            <div className="footerBrand">
              <div className="footerBrandRow">
                <img src="/assets/logo.png" alt="Halesi Ravintola logo" className="footerLogo" />
                <div>
                  <h3>Ravintola Halesi</h3>
                  <p>{t.footerBrandBlurb}</p>
                </div>
              </div>
            </div>

            <div className="footerLinks">
              <h4>{t.footerQuickLinks}</h4>
              <a href="#home">{t.navHome}</a>
              <a href="/menu.html">{t.navMenu}</a>
              <a href="#reservation">{t.navReservation}</a>
              <a href="#contact">{t.navContact}</a>
              <a href="#about">{t.navAbout}</a>
              <a href="/gallery.html">{t.navGallery}</a>
            </div>

            <div className="footerContact">
              <h4>{t.footerContact}</h4>
              <a href="mailto:ravintolahalesi@gmail.com">ravintolahalesi@gmail.com</a>
              <a href="tel:0413287884">0413287884</a>
              <p><a href="https://maps.app.goo.gl/G32i6h8w52rpSoVG7" target="_blank" rel="noreferrer">Hameenkatu 27-29, 05800 Hyvinkaa</a></p>
            </div>

            <div className="footerSocial">
              <h4>{t.footerSocial}</h4>
              <div className="footerSocialList">
                <a href="https://www.instagram.com/ravintolahalesi/" target="_blank" rel="noreferrer" aria-label={t.footerInstagram}><SocialIcon platform="instagram" /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label={t.footerFacebook}><SocialIcon platform="facebook" /></a>
                <a href="https://www.tiktok.com/@ravintolahalesi?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label={t.footerTikTok}><SocialIcon platform="tiktok" /></a>
                <a href="https://www.linkedin.com/in/ravintola-halesi-05991b403/" target="_blank" rel="noreferrer" aria-label={t.footerLinkedIn}><SocialIcon platform="linkedin" /></a>
              </div>
            </div>
          </div>

          <div className="footerBottom">
            <p>{t.footerRights}</p>
          </div>
        </footer>
      </div>
    </main></>
  );
}
