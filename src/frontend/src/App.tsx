import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Anchor,
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Shield,
  Ship,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Fleet", href: "#fleet" },
  { label: "Cargo", href: "#cargo" },
  { label: "Services", href: "#services" },
  { label: "Network", href: "#network" },
  { label: "Contact", href: "#contact" },
];

const FLEET_VESSELS = [
  {
    name: "Panamax",
    image: "/assets/generated/fleet-panamax.dim_600x400.jpg",
    dwt: "60,000–80,000 DWT",
    desc: "Bulk carrier optimised for major ocean trade routes, maximising Panama Canal transits with a superior cargo-to-cost ratio.",
  },
  {
    name: "Handymax",
    image: "/assets/generated/fleet-handymax.dim_600x400.jpg",
    dwt: "40,000–60,000 DWT",
    desc: "Versatile workhorses for both regional and intercontinental voyages, accessing a wide range of port sizes efficiently.",
  },
  {
    name: "Supramax",
    image: "/assets/generated/fleet-supramax.dim_600x400.jpg",
    dwt: "50,000–60,000 DWT",
    desc: "Self-loading gear-equipped vessels offering maximum flexibility for loading and discharging at any terminal globally.",
  },
];

const FLEET_TUGS = [
  {
    size: "240 ft",
    desc: "Compact configuration for river and coastal operations with exceptional manoeuvrability.",
  },
  {
    size: "250 ft",
    desc: "Efficient mid-range barge for reliable inter-island cargo movement across the archipelago.",
  },
  {
    size: "270 ft",
    desc: "Enhanced capacity platform designed for high-volume bulk commodity transport.",
  },
  {
    size: "300 ft",
    desc: "Heavy-duty barge engineered for large-volume cargo movements and offshore supply.",
  },
  {
    size: "330 ft",
    desc: "Our flagship barge delivering maximum cargo capacity for major industrial projects.",
  },
];

const FLEET_LCTS = [
  {
    dwt: "1000 DWT",
    desc: "Agile landing craft for shallow coastal and remote island delivery where conventional vessels cannot dock.",
  },
  {
    dwt: "2000 DWT",
    desc: "Mid-capacity LCT enabling efficient cargo offloading at non-infrastructure ports and beaches.",
  },
  {
    dwt: "3000 DWT",
    desc: "High-capacity landing craft purpose-built for heavy equipment and bulk cargo to remote destinations.",
  },
];

const CARGO_TYPES = [
  {
    name: "Bulk Cargo",
    icon: Package,
    image: "/assets/generated/cargo-bulk.dim_400x300.jpg",
    desc: "Specialised handling of dry bulk commodities including grains, fertilisers, and raw materials.",
  },
  {
    name: "Coal",
    icon: Package,
    image: "/assets/generated/cargo-coal.dim_400x300.jpg",
    desc: "Dedicated coal transportation services for power plants and industrial consumers across Asia.",
  },
  {
    name: "Minerals & Mining",
    icon: Package,
    image: "/assets/generated/cargo-minerals.dim_400x300.jpg",
    desc: "Bauxite, nickel ore, copper concentrate, and other mineral cargo handled with precision.",
  },
  {
    name: "Palm Oil",
    icon: Package,
    image: "/assets/generated/cargo-palm-oil.dim_400x300.jpg",
    desc: "CPO and refined palm oil products transported in dedicated temperature-maintained vessels.",
  },
  {
    name: "General Cargo",
    icon: Truck,
    image: "/assets/generated/cargo-general.dim_400x300.jpg",
    desc: "Breakbulk and loose cargo movement for manufactured goods, machinery, and consumer products.",
  },
  {
    name: "Timber & Wood",
    icon: Package,
    image: "/assets/generated/cargo-timber.dim_400x300.jpg",
    desc: "Logs, sawn timber, and wood panels shipped with specialist securing and handling.",
  },
  {
    name: "Containers",
    icon: Package,
    image: "/assets/generated/cargo-containers.dim_400x300.jpg",
    desc: "Full and partial container loads integrated with feeder services throughout the Asia-Pacific.",
  },
  {
    name: "Heavy Equipment",
    icon: Truck,
    image: "/assets/generated/cargo-heavy-equipment.dim_400x300.jpg",
    desc: "Project cargo and heavy-lift equipment movement for mining, construction, and energy sectors.",
  },
];

const MARKETS = [
  {
    flag: "🇮🇩",
    name: "Indonesia",
    desc: "Home base with the most extensive inter-island shipping network in the archipelago.",
  },
  {
    flag: "🇲🇾",
    name: "Malaysia",
    desc: "Regular services connecting major Malaysian ports including Port Klang and Johor.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    desc: "Strategic transhipment hub connections through the Port of Singapore.",
  },
  {
    flag: "🇨🇳",
    name: "China",
    desc: "Direct cargo routes to Shanghai, Tianjin, Guangzhou, and other major Chinese ports.",
  },
  {
    flag: "🇹🇼",
    name: "Taiwan",
    desc: "Reliable scheduled services to Taiwanese industrial and commercial ports.",
  },
  {
    flag: "🇻🇳",
    name: "Vietnam",
    desc: "Growing presence serving Ho Chi Minh City and Haiphong trade corridors.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    desc: "Strategic routes connecting Mumbai, Chennai, and Kolkata on the Indian subcontinent.",
  },
  {
    flag: "🇧🇩",
    name: "Bangladesh",
    desc: "Dedicated services to Chittagong and Mongla port regions for industrial cargo.",
  },
  {
    flag: "🇯🇵",
    name: "Japan",
    desc: "Precision cargo delivery to Osaka, Tokyo, and Nagoya with strict schedule adherence.",
  },
  {
    flag: "🇰🇷",
    name: "South Korea",
    desc: "Connecting Busan, Incheon, and major Korean industrial port complexes.",
  },
  {
    flag: "🇵🇭",
    name: "Philippines",
    desc: "Inter-regional connectivity via Manila and Cebu serving the Philippine archipelago.",
  },
  {
    flag: "🇹🇱",
    name: "Timor Leste",
    desc: "Supporting national development through reliable and affordable shipping solutions.",
  },
];

const SERVICES = [
  {
    icon: Ship,
    title: "Bulk Cargo Transport",
    desc: "End-to-end dry and liquid bulk cargo transportation across Asia-Pacific routes with full tracking.",
  },
  {
    icon: Globe,
    title: "Fleet Charter",
    desc: "Flexible vessel chartering options — time charter, voyage charter, and bareboat for all fleet types.",
  },
  {
    icon: Truck,
    title: "Port-to-Port Logistics",
    desc: "Seamless port-to-port coordination including documentation, customs, and last-mile delivery.",
  },
  {
    icon: Anchor,
    title: "Interisland Shipping",
    desc: "Specialised Indonesian interisland services with unrivalled knowledge of the archipelago's ports.",
  },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Proven Safety Record",
    desc: "Zero-incident operations with ISO-certified safety management systems across the entire fleet.",
  },
  {
    icon: Clock,
    title: "On-Time Reliability",
    desc: "Industry-leading schedule adherence supported by real-time vessel tracking and reporting.",
  },
  {
    icon: Award,
    title: "Experienced Team",
    desc: "Over a decade of maritime expertise with certified officers and shore-based professionals.",
  },
  {
    icon: Globe,
    title: "Wide Network",
    desc: "12 countries served across Asia-Pacific with local agents and port partnerships.",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen font-sans bg-white text-foreground">
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-card" : "bg-white/95 backdrop-blur-sm"
        }`}
        data-ocid="header.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              data-ocid="nav.home.link"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-navy">
                <Anchor className="w-6 h-6 text-gold" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-sm tracking-widest text-navy uppercase">
                  PT Ratu Aruna Samudera
                </div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">
                  Reliable Maritime Solutions
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className="px-4 py-2 text-sm font-semibold text-navy/80 hover:text-navy transition-colors rounded-md hover:bg-navy/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                data-ocid="nav.contact_us.button"
                className="ml-4 px-5 py-2 text-sm font-bold border-2 border-gold text-navy rounded-full hover:bg-gold hover:text-white transition-all duration-200"
              >
                CONTACT US
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-navy"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.menu.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
              data-ocid="nav.mobile.panel"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    data-ocid={`nav.${link.label.toLowerCase()}.link`}
                    className="px-4 py-3 text-sm font-semibold text-navy rounded-md hover:bg-navy/5"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-ocid="nav.contact_us.button"
                  className="mt-2 px-4 py-3 text-sm font-bold text-center border-2 border-gold text-navy rounded-full"
                >
                  CONTACT US
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          className="relative min-h-screen flex items-stretch pt-20"
        >
          <div className="flex w-full flex-col lg:flex-row">
            {/* Left dark panel */}
            <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 bg-navy lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="inline-block mb-4 px-3 py-1 rounded-full border border-gold/40 text-gold text-xs font-semibold tracking-widest uppercase">
                  Established in Indonesia
                </div>
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gold uppercase leading-tight tracking-wide mb-6">
                  Your Trusted Partner in Maritime Logistics
                </h1>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                  Connecting Indonesia and Asia‑Pacific with reliable, efficient
                  shipping solutions. From Panamax bulk carriers to landing
                  craft, we move your cargo safely.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#fleet"
                    data-ocid="hero.fleet.button"
                    className="px-7 py-3 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-colors text-sm"
                  >
                    Explore Our Fleet
                  </a>
                  <a
                    href="#contact"
                    data-ocid="hero.contact.button"
                    className="px-7 py-3 border-2 border-white/60 text-white font-bold rounded-full hover:border-gold hover:text-gold transition-colors text-sm"
                  >
                    Get in Touch
                  </a>
                </div>
              </motion.div>
            </div>
            {/* Right image */}
            <div className="relative lg:w-1/2 min-h-[340px] lg:min-h-[unset]">
              <img
                src="/assets/generated/hero-ship.dim_1200x600.jpg"
                alt="Cargo ship at sea"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
          </div>
        </section>

        {/* ── WELCOME / STATS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-5">
                Welcome to PT Ratu Aruna Samudera
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-14">
                PT Ratu Aruna Samudera is a premier Indonesian maritime company
                delivering end-to-end shipping solutions across Asia-Pacific.
                With a diverse fleet of bulk carriers, tug-and-barge units, and
                landing craft tanks, we offer unparalleled reliability and reach
                — whether you need inter-island logistics within the archipelago
                or long-haul voyages to international ports.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { value: "10+", label: "Years of Experience" },
                  { value: "15+", label: "Vessel Types in Fleet" },
                  { value: "12", label: "Countries Served" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center p-8 rounded-2xl bg-[oklch(0.96_0.008_252)]"
                  >
                    <span className="text-5xl font-extrabold text-gold mb-2">
                      {stat.value}
                    </span>
                    <span className="text-sm font-semibold text-navy/70 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-20 bg-[oklch(0.96_0.008_252)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
                Our Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive maritime logistics solutions tailored to your
                cargo and scheduling requirements.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-card flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLEET ── */}
        <section id="fleet" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
                Our Diverse Fleet
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From ocean-going bulk carriers to shallow-water landing craft —
                the right vessel for every route and cargo type.
              </p>
            </motion.div>

            <Tabs defaultValue="vessels" className="w-full">
              <TabsList
                className="flex flex-wrap h-auto gap-2 bg-[oklch(0.96_0.008_252)] p-2 rounded-2xl mb-10"
                data-ocid="fleet.tab"
              >
                <TabsTrigger
                  value="vessels"
                  className="flex-1 min-w-[120px] data-[state=active]:bg-navy data-[state=active]:text-white font-semibold rounded-xl"
                  data-ocid="fleet.vessels.tab"
                >
                  Vessels
                </TabsTrigger>
                <TabsTrigger
                  value="tug"
                  className="flex-1 min-w-[120px] data-[state=active]:bg-navy data-[state=active]:text-white font-semibold rounded-xl"
                  data-ocid="fleet.tug.tab"
                >
                  Tug &amp; Barge
                </TabsTrigger>
                <TabsTrigger
                  value="lct"
                  className="flex-1 min-w-[120px] data-[state=active]:bg-navy data-[state=active]:text-white font-semibold rounded-xl"
                  data-ocid="fleet.lct.tab"
                >
                  Landing Craft (LCT)
                </TabsTrigger>
              </TabsList>

              {/* Vessels */}
              <TabsContent value="vessels">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {FLEET_VESSELS.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-card border border-border hover:-translate-y-1 transition-transform"
                      data-ocid={`fleet.vessels.item.${i + 1}`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <span className="text-xs font-bold text-gold bg-navy/80 px-3 py-1 rounded-full">
                            {v.dwt}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-navy mb-2">
                          {v.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {v.desc}
                        </p>
                        <span className="inline-flex items-center text-xs font-semibold text-gold gap-1 hover:gap-2 transition-all cursor-pointer">
                          Learn More <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Tug & Barge */}
              <TabsContent value="tug">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {FLEET_TUGS.map((t, i) => (
                    <motion.div
                      key={t.size}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="rounded-2xl overflow-hidden shadow-card border border-border hover:-translate-y-1 transition-transform"
                      data-ocid={`fleet.tug.item.${i + 1}`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src="/assets/generated/tug-barge-coal.dim_800x500.jpg"
                          alt={`Tug and Barge ${t.size}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-base font-bold text-navy mb-1">
                          {t.size} Tug &amp; Barge
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* LCT */}
              <TabsContent value="lct">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {FLEET_LCTS.map((l, i) => (
                    <motion.div
                      key={l.dwt}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-card border border-border hover:-translate-y-1 transition-transform"
                      data-ocid={`fleet.lct.item.${i + 1}`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src="/assets/generated/fleet-lct.dim_600x400.jpg"
                          alt={`LCT ${l.dwt}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <span className="text-xs font-bold text-gold bg-navy/80 px-3 py-1 rounded-full">
                            {l.dwt}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-base font-bold text-navy mb-2">
                          LCT {l.dwt}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {l.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ── CARGO ── */}
        <section id="cargo" className="py-20 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Cargo Logistics Solutions
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We handle a comprehensive range of cargo types with specialist
                equipment and industry-certified crews.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARGO_TYPES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  data-ocid={`cargo.item.${i + 1}`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy/50" />
                    <div className="absolute top-3 left-3">
                      <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
                        <c.icon className="w-4.5 h-4.5 text-gold" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white mb-2">
                      {c.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NETWORK ── */}
        <section id="network" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
                Global Reach: Asia-Pacific Network
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Serving 12 countries and territories across Asia-Pacific with
                scheduled and spot voyage services.
              </p>
            </motion.div>

            {/* Map placeholder with route lines */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full rounded-3xl overflow-hidden mb-14 shadow-card"
              style={{ aspectRatio: "16/7" }}
            >
              <img
                src="/assets/generated/market-coverage.dim_1400x600.jpg"
                alt="Asia-Pacific shipping network map"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy/65" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <Globe className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  12 Countries &amp; Territories
                </h3>
                <p className="text-white/70 max-w-lg text-sm sm:text-base">
                  From Indonesia's 17,000+ islands to the major industrial ports
                  of Japan, China, and South Korea — our network connects the
                  pulse of Asia-Pacific trade.
                </p>
              </div>
            </motion.div>

            {/* Market Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MARKETS.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl p-5 bg-[oklch(0.96_0.008_252)] border border-border hover:border-gold/60 hover:shadow-card transition-all"
                  data-ocid={`network.item.${i + 1}`}
                >
                  <div className="text-3xl mb-3">{m.flag}</div>
                  <div className="text-sm font-bold text-navy mb-1">
                    {m.name}
                  </div>
                  <div className="text-xs text-muted-foreground leading-snug">
                    {m.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="mt-20">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy text-center mb-10">
                Why Choose Ratu Aruna Samudera?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {WHY_US.map((w, i) => (
                  <motion.div
                    key={w.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center p-7 rounded-2xl bg-navy text-white"
                    data-ocid={`whyus.item.${i + 1}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4">
                      <w.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-sm font-bold mb-2">{w.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {w.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-20 bg-[oklch(0.96_0.008_252)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ready to ship? Our team is available to discuss your cargo
                requirements and provide a tailored quote.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl p-8 shadow-card space-y-5">
                  <h3 className="text-xl font-bold text-navy mb-4">
                    PT Ratu Aruna Samudera
                  </h3>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        Address
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Aryaduta Semanggi Condominium Tower A Lt 33,
                        <br />
                        Jakarta Selatan, Indonesia
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        Email
                      </div>
                      <a
                        href="mailto:ptratuarunasamudera@gmail.com"
                        data-ocid="contact.email.link"
                        className="text-sm text-gold hover:underline"
                      >
                        ptratuarunasamudera@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        Phone
                      </div>
                      <a
                        href="tel:085198852558"
                        data-ocid="contact.phone.link"
                        className="text-sm text-gold hover:underline"
                      >
                        085198852558
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MessageCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        WhatsApp
                      </div>
                      <a
                        href="https://wa.me/6282128554797"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="contact.whatsapp.button"
                        className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-full transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-card">
                  <h3 className="text-xl font-bold text-navy mb-6">
                    Send a Message
                  </h3>
                  {formSubmitted ? (
                    <div
                      className="text-center py-10"
                      data-ocid="contact.success_state"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-7 h-7 text-green-600" />
                      </div>
                      <h4 className="text-lg font-bold text-navy mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Thank you for contacting us. Our team will respond
                        within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-5 border-navy text-navy"
                        onClick={() => setFormSubmitted(false)}
                        data-ocid="contact.reset.button"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-navy"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          required
                          data-ocid="contact.name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-navy"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          required
                          data-ocid="contact.email.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="message"
                          className="text-sm font-semibold text-navy"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your cargo requirements..."
                          rows={4}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          required
                          data-ocid="contact.message.textarea"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 rounded-full"
                        data-ocid="contact.submit.button"
                      >
                        Send Message
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-dark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 border border-gold/40">
                  <Anchor className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-xs font-extrabold tracking-widest uppercase text-white">
                    PT Ratu Aruna
                  </div>
                  <div className="text-xs font-extrabold tracking-widest uppercase text-gold">
                    Samudera
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                Reliable maritime solutions connecting Indonesia and
                Asia-Pacific with trusted shipping services since our founding.
              </p>
              <div className="flex gap-3 mt-5">
                {(
                  [
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Instagram, label: "Instagram" },
                  ] as const
                ).map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/30 flex items-center justify-center transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-white/70" />
                  </a>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Address
              </h4>
              <div className="space-y-3 text-xs text-white/60 leading-relaxed">
                <p>
                  Aryaduta Semanggi Condominium
                  <br />
                  Tower A Lt 33
                  <br />
                  Jakarta Selatan, Indonesia
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold" /> 085198852558
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold" />{" "}
                  ptratuarunasamudera@gmail.com
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-white/60 hover:text-gold transition-colors flex items-center gap-1.5"
                      data-ocid={`footer.${link.label.toLowerCase()}.link`}
                    >
                      <ChevronRight className="w-3 h-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Get in Touch
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-5">
                Ready to discuss your shipping needs? Contact our team for a
                custom quote.
              </p>
              <a
                href="https://wa.me/6282128554797"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.whatsapp.button"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-full transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} PT Ratu Aruna Samudera. All Rights
              Reserved.
            </p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6282128554797"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.floating.button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
