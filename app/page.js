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
    lunchText: "Enjoy our tasty and ever-changing lunch menu on weekdays from 10:15 to 15:00.",
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
    footerText: "2026 | Ravintola Halesi",
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
    footerText: "2026 | Ravintola Halesi",
    reservationSuccess: "Varaus vastaanotettiin onnistuneesti. Ilmoitussahkoposti lahetettiin.",
    reservationError: "Varausten lahetys ei ole kaytossa tai jokin meni pieleen. Yrita uudelleen."
  }
};

const openingHours = [
  { key: "hoursMonThu", value: "10:15-20:00" },
  { key: "hoursFriday", value: "10:15-21:00" },
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

  useEffect(() => {
    const switchableInputs = document.querySelectorAll('[data-mobile-switch]');

    function activateInput(event) {
      const input = event.currentTarget;
      const nextType = input.dataset.mobileSwitch;
      if (!nextType || input.type === nextType) {
        return;
      }
      input.type = nextType;
      requestAnimationFrame(() => input.showPicker?.());
    }

    function restoreInput(event) {
      const input = event.currentTarget;
      const originalType = input.dataset.mobileSwitch;
      if (!originalType) {
        return;
      }
      if (!input.value) {
        input.type = 'text';
      }
    }

    switchableInputs.forEach((input) => {
      input.addEventListener('focus', activateInput);
      input.addEventListener('click', activateInput);
      input.addEventListener('blur', restoreInput);
    });

    return () => {
      switchableInputs.forEach((input) => {
        input.removeEventListener('focus', activateInput);
        input.removeEventListener('click', activateInput);
        input.removeEventListener('blur', restoreInput);
      });
    };
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
          <ImagePlaceholder label={t.heroImage} tone="warm" />
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
          <div className="reservationIntro">
            <h2>{t.reserveTitle}</h2>
          </div>

          <div className="reservationLayout">
            <form className="reservationCard" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder={t.formName} required />
              <input name="phone" type="tel" placeholder={t.formPhone} required />

              <div className="formRow compactRow">
                <input
                  name="date"
                  type="text"
                  inputMode="none"
                  placeholder={t.formDate}
                  aria-label={t.formDate}
                  data-mobile-switch="date"
                  required
                />
                <input
                  name="time"
                  type="text"
                  inputMode="none"
                  placeholder={t.formTime}
                  aria-label={t.formTime}
                  data-mobile-switch="time"
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
              <a href="tel:+3580458614440">+358 045 861 4440</a>
            </p>
            <p>
              <span>{t.contactAddressLabel}:</span> Hämeenkatu 27-29, 05800 Hyvinkää
            </p>
          </div>

          <div className="mapEmbedCard">
            <iframe
              title="Halesi Ravintola location"
              src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=H%C3%A4meenkatu%2027-29%2C%2005800%20Hyvink%C3%A4%C3%A4&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="mapFallbackLink"
              href="https://maps.app.goo.gl/aSHGDtAuxMzWGNab8"
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
          <p>{t.footerText}</p>
        </footer>
      </div>
    </main></>
  );
}
