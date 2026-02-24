import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: #080c14;
      color: #f0f6ff;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }
    :root {
      --ink: #080c14;
      --ink2: #0f1623;
      --panel: #141d2e;
      --border: rgba(255,255,255,0.07);
      --muted: #6b7fa3;
      --lite: #c8d5f0;
      --g1: #00e676;
      --g2: #00b248;
      --g3: #69f0ae;
      --blue: #3d9fff;
      --white: #f0f6ff;
    }
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; opacity: 0.4;
    }
    @keyframes float-phone {
      0%,100% { transform: translateY(0) rotate(-1.5deg); }
      50% { transform: translateY(-18px) rotate(1.5deg); }
    }
    @keyframes glow-pulse {
      0%,100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.18); opacity: 1; }
    }
    @keyframes ring-expand {
      from { transform: scale(0.5); opacity: 1; }
      to { transform: scale(2.8); opacity: 0; }
    }
    @keyframes ping-dot {
      0%,100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes fadeSlide {
      from { opacity: 0; transform: translateX(-14px); }
      to { opacity: 1; transform: none; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: none; }
    }
    @keyframes pulse-dot {
      0%,100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.7); opacity: 0.5; }
    }
    .fade-slide { animation: fadeSlide 0.38s ease both; }
    .fade-up { animation: fadeUp 0.6s ease both; }
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
    .reveal.in { opacity: 1; transform: none; }
    section { position: relative; z-index: 1; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: rgba(0,230,118,0.3); border-radius: 3px; }
  `}</style>
);

/* ─── TOKENS ─── */
const c = {
  ink: "#080c14", panel: "#141d2e",
  border: "rgba(255,255,255,0.07)",
  muted: "#6b7fa3", lite: "#c8d5f0",
  g1: "#00e676", g2: "#00b248", g3: "#69f0ae",
  blue: "#3d9fff", white: "#f0f6ff",
};

/* ─── HOOKS ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── SMALL COMPONENTS ─── */
const LogoMark = ({ size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: 12,
    background: `linear-gradient(135deg, ${c.g1}, ${c.g2})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Bebas Neue', sans-serif", fontSize: size * 0.32, color: "#000",
    boxShadow: "0 0 20px rgba(0,230,118,0.4)", flexShrink: 0,
  }}>FM</div>
);

const SectionTag = ({ children }) => (
  <div style={{
    display: "inline-block",
    background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.22)",
    color: c.g3, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, marginBottom: 18,
    fontFamily: "'Syne', sans-serif",
  }}>{children}</div>
);

const BigHeading = ({ children, style }) => (
  <h2 style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(3rem,5vw,5rem)", lineHeight: 1,
    marginBottom: 14, ...style,
  }}>{children}</h2>
);

const Btn = ({ children, variant = "primary", onClick, style }) => {
  const base = {
    border: "none", cursor: "pointer", borderRadius: 100,
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem",
    transition: "all .28s", display: "inline-flex", alignItems: "center", gap: 8,
    padding: "14px 32px", ...style,
  };
  if (variant === "primary") return (
    <button onClick={onClick} style={{
      ...base,
      background: `linear-gradient(135deg, ${c.g1}, ${c.g2})`, color: "#000",
      boxShadow: "0 8px 28px rgba(0,230,118,0.35)",
    }}
    onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 14px 40px rgba(0,230,118,0.5)"; }}
    onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 28px rgba(0,230,118,0.35)"; }}
    >{children}</button>
  );
  return (
    <button onClick={onClick} style={{
      ...base, background: "transparent", color: c.white,
      border: `1px solid ${c.border}`,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = c.g1; e.currentTarget.style.color = c.g1; e.currentTarget.style.background = "rgba(0,230,118,0.06)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.white; e.currentTarget.style.background = "transparent"; }}
    >{children}</button>
  );
};

const Divider = () => (
  <div style={{ maxWidth: 1300, margin: "0 auto", borderTop: `1px solid ${c.border}` }} />
);

/* ─── HEADER ─── */
function Header() {
  const links = ["Nosotros", "Problema", "Características", "Demo", "Equipo"];
  const hrefs = ["#about", "#problema", "#features", "#demo", "#team"];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 999,
      background: "rgba(8,12,20,0.88)", backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${c.border}`,
    }}>
      <nav style={{
        maxWidth: 1300, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 30px",
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <LogoMark />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: c.white }}>FitMatch</span>
        </a>
        <div style={{ display: "flex", gap: 30 }}>
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]} style={{
              color: c.muted, textDecoration: "none",
              fontFamily: "'Syne', sans-serif", fontSize: "0.82rem", fontWeight: 600,
              letterSpacing: "0.05em", textTransform: "uppercase", transition: "color .25s",
            }}
            onMouseEnter={e => e.target.style.color = c.g1}
            onMouseLeave={e => e.target.style.color = c.muted}
            >{l}</a>
          ))}
        </div>
        <button onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: c.g1, color: "#000", border: "none", cursor: "pointer",
            padding: "11px 26px", borderRadius: 100,
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem",
            boxShadow: "0 4px 20px rgba(0,230,118,0.35)", transition: "all .28s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,230,118,0.5)"; }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(0,230,118,0.35)"; }}
        >Probar Demo</button>
      </nav>
    </header>
  );
}

/* ─── MINI PHONE (Hero) ─── */
function MiniPhone() {
  const canchas = [
    { name: "Cancha El Paraíso", meta: "📍 0.8km · Fútbol 7", free: true },
    { name: "Estadio San Marcos", meta: "📍 1.4km · Fútbol 11", free: true },
    { name: "Cancha Los Héroes", meta: "📍 2.1km · Fútbol 5", free: false },
  ];
  const players = [
    { initials: "CR", name: "Carlos Rivas", pos: "Delantero · SS", stars: "4.8" },
    { initials: "MA", name: "Mario Alvarez", pos: "Portero · SM", stars: "4.6" },
    { initials: "JL", name: "José López", pos: "Mediocampo", stars: "4.9" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <div style={{
        position: "absolute", width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,230,118,0.18), transparent 70%)",
        animation: "glow-pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "relative", zIndex: 2, width: 260, background: "#0a0f1e",
        borderRadius: 44, border: "2px solid rgba(0,230,118,0.3)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,230,118,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)",
        overflow: "hidden", animation: "float-phone 6s ease-in-out infinite",
      }}>
        <div style={{ width: 90, height: 26, background: "#0a0f1e", borderRadius: "0 0 16px 16px", margin: "0 auto" }} />
        {/* App header */}
        <div style={{
          background: "linear-gradient(135deg,#0d1a30,#0a0f1e)",
          padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid rgba(0,230,118,0.1)",
        }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", color: c.g1 }}>FitMatch</span>
          <span>🔔</span>
        </div>
        <div style={{ margin: "10px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "7px 10px", fontSize: "0.65rem", color: c.muted, display: "flex", gap: 6 }}>
          🔍 Buscar canchas...
        </div>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.lite, padding: "4px 14px" }}>Cercanas a ti</div>
        {canchas.map(ca => (
          <div key={ca.name} style={{
            margin: "4px 12px", padding: "9px 10px",
            background: "linear-gradient(135deg,rgba(0,230,118,0.07),rgba(61,159,255,0.04))",
            borderRadius: 12, border: "1px solid rgba(0,230,118,0.12)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: "0.62rem", fontWeight: 600 }}>{ca.name}</div>
              <div style={{ fontSize: "0.55rem", color: c.muted, marginTop: 1 }}>{ca.meta}</div>
            </div>
            <span style={{
              background: ca.free ? c.g1 : "rgba(239,68,68,0.2)",
              color: ca.free ? "#000" : "#ef4444",
              fontSize: "0.5rem", fontWeight: 700, padding: "2px 7px", borderRadius: 20,
            }}>{ca.free ? "LIBRE" : "LLENA"}</span>
          </div>
        ))}
        <div style={{ display: "flex", margin: "8px 12px 4px", gap: 0 }}>
          {["Jugadores","Torneos","Feed"].map((t, i) => (
            <div key={t} style={{
              flex: 1, textAlign: "center", padding: "5px 4px",
              fontSize: "0.55rem", fontFamily: "'Syne',sans-serif", fontWeight: 600,
              color: i === 0 ? c.g1 : c.muted,
              borderBottom: `2px solid ${i === 0 ? c.g1 : "transparent"}`,
            }}>{t}</div>
          ))}
        </div>
        {players.map(p => (
          <div key={p.name} style={{ margin: "3px 12px", padding: "7px 10px", background: "rgba(255,255,255,0.025)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg,${c.g2},${c.blue})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.58rem", fontWeight: 700, color: "#000",
            }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: "0.52rem", color: c.muted }}>{p.pos}</div>
            </div>
            <div style={{ fontSize: "0.52rem", color: "#ffd700" }}>⭐ {p.stars}</div>
          </div>
        ))}
        <div style={{
          display: "flex", justifyContent: "space-around", padding: "9px 0 6px",
          borderTop: `1px solid rgba(255,255,255,0.06)`,
        }}>
          {[["🏠","Inicio",true],["📅","Reservas",false],["👥","Social",false],["👤","Perfil",false]].map(([ic,lb,act]) => (
            <div key={lb} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1rem" }}>{ic}</div>
              <div style={{ fontSize: "0.46rem", color: act ? c.g1 : c.muted, marginTop: 1 }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* bg glows */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,230,118,0.11),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(61,159,255,0.08),transparent 70%)" }} />
      </div>
      <div style={{
        position: "relative", zIndex: 1, maxWidth: 1300, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 60,
        padding: "90px 30px 80px",
      }}>
        <div style={{ animation: "fadeUp .7s ease both" }}>
          {/* tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,230,118,0.09)", border: "1px solid rgba(0,230,118,0.25)",
            padding: "6px 16px", borderRadius: 100, marginBottom: 28,
            fontSize: "0.75rem", fontWeight: 600, color: c.g3, letterSpacing: "0.08em", textTransform: "uppercase",
            fontFamily: "'Syne',sans-serif",
          }}>
            <span style={{ width: 6, height: 6, background: c.g1, borderRadius: "50%", animation: "ping-dot 2s infinite" }} />
            Lanzando en El Salvador
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 7vw, 7.5rem)",
            lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: 24,
          }}>
            CONECTA,<br />JUEGA Y<br /><span style={{ color: c.g1 }}>CRECE</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: c.muted, lineHeight: 1.78, maxWidth: 480, marginBottom: 40 }}>
            La plataforma que une deportistas, locales recreativos y bienestar físico en un solo ecosistema digital. Totalmente gratis para usuarios.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
            <Btn onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>🚀 Ver Demo App</Btn>
            <Btn variant="ghost" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Explorar</Btn>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["500+","Usuarios activos"],["50+","Locales aliados"],["0$","Para usuarios"]].map(([n,l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", lineHeight: 1,
                  background: `linear-gradient(135deg,${c.g1},${c.g3})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{n}</div>
                <div style={{ fontSize: "0.78rem", color: c.muted, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ animation: "fadeUp .7s .2s ease both" }}>
          <MiniPhone />
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="about" style={{ padding: "100px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div className="reveal" ref={r1}>
          <div style={{
            background: "var(--panel)", border: "1px solid var(--border)",
            borderRadius: 28, padding: 40, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${c.g1},${c.blue})` }} />
            <div style={{ fontSize: "0.75rem", color: c.muted, marginBottom: 6, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Modelo de negocio</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", marginBottom: 8 }}>
              Usuarios gratis.<br /><span style={{ color: c.g1 }}>Locales pagan comisión.</span>
            </div>
            <p style={{ fontSize: "0.88rem", color: c.muted, lineHeight: 1.72, marginBottom: 24 }}>
              Cada reserva generada a través de FitMatch representa una comisión para el local. Sin cobros al jugador, nunca.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["500+","Usuarios activos","g1"],["50+","Locales aliados","g1"],["100+","Partidos/mes","g1"],["El SV","Foco de expansión","blue"]].map(([n,l,col]) => (
                <div key={l} style={{
                  background: col === "blue" ? "rgba(61,159,255,0.05)" : "rgba(0,230,118,0.05)",
                  border: `1px solid ${col === "blue" ? "rgba(61,159,255,0.14)" : "rgba(0,230,118,0.12)"}`,
                  borderRadius: 14, padding: 18,
                }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.3rem", color: col === "blue" ? c.blue : c.g1, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.75rem", color: c.muted, marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal" ref={r2}>
          <SectionTag>Quiénes somos</SectionTag>
          <BigHeading>DEPORTE +<br />COMUNIDAD +<br /><span style={{ color: c.g1 }}>TECNOLOGÍA</span></BigHeading>
          <p style={{ fontSize: "1rem", color: c.muted, lineHeight: 1.78, marginBottom: 20 }}>
            FitMatch es una plataforma móvil <strong style={{ color: c.lite }}>gratuita para usuarios</strong> que conecta jugadores con locales recreativos en El Salvador. Promovemos la actividad física, facilitamos reservas en ambientes amigables y fortalecemos la comunidad deportiva local.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {["⚽ Fútbol amateur","📍 Geolocalización","❤️ Salud digital","🏆 Torneos","🇸🇻 El Salvador"].map(p => (
              <span key={p} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.2)",
                padding: "7px 16px", borderRadius: 100,
                fontSize: "0.83rem", fontWeight: 600, color: c.g3,
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEMA & SOLUCIÓN ─── */
function Problema() {
  const r = useReveal();
  return (
    <section id="problema" style={{ padding: "100px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>El desafío</SectionTag>
          <BigHeading>EL PROBLEMA<br />QUE <span style={{ color: c.g1 }}>RESOLVEMOS</span></BigHeading>
          <p style={{ fontSize: "1rem", color: c.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>
            La inactividad física y la falta de organización deportiva son problemas reales y urgentes en El Salvador.
          </p>
        </div>
        <div className="reveal" ref={r} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {/* Problem */}
          <div style={{
            background: "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.03))",
            border: "1px solid rgba(239,68,68,0.2)", borderRadius: 24, padding: 40,
          }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 18 }}>🚨 El Problema</h3>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "4.5rem", color: "#ef4444", lineHeight: 1, margin: "14px 0 6px" }}>65%</div>
            <p style={{ fontSize: "1rem", lineHeight: 1.78, color: c.lite }}>
              de la población salvadoreña <strong>no realiza actividad física frecuente</strong>, a pesar de la fuerte cultura futbolística del país.
            </p>
            <ul style={{ listStyle: "none", marginTop: 20 }}>
              {["Sin herramientas digitales para organizar partidos","Locales sin visibilidad online","Sin comunidad deportiva conectada"].map(item => (
                <li key={item} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: "0.93rem", color: c.lite, alignItems: "flex-start" }}>
                  <span style={{ color: "#ef4444", marginTop: 2 }}>✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Solution */}
          <div style={{
            background: "linear-gradient(135deg,rgba(0,230,118,0.08),rgba(61,159,255,0.05))",
            border: "1px solid rgba(0,230,118,0.2)", borderRadius: 24, padding: 40,
          }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 18 }}>✨ Nuestra Solución</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.78, color: c.lite, marginBottom: 20 }}>
              Una app todo-en-uno que combina reservas, comunidad, torneos y salud digital en un solo ecosistema.
            </p>
            <ul style={{ listStyle: "none" }}>
              {[
                "Reserva de canchas simple y en tiempo real",
                "Gestión de torneos amateur con brackets automáticos",
                "Perfil de jugador con videos highlight",
                "Integración con Google Fit / Apple HealthKit",
                "Red social deportiva con feed y chat",
                "Panel administrativo para locales",
              ].map(item => (
                <li key={item} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: "0.93rem", color: c.lite, alignItems: "flex-start" }}>
                  <span style={{ color: c.g1, marginTop: 2 }}>✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
function Features() {
  const feats = [
    { icon: "📍", title: "Reserva Inteligente", desc: "Busca canchas por zona, horario y precio. Disponibilidad en tiempo real y confirmación instantánea.", badge: "CORE" },
    { icon: "🏆", title: "Torneos Relámpago", desc: "Organiza torneos amateur con gestión automática de brackets, resultados y clasificaciones.", badge: "ÚNICO" },
    { icon: "👥", title: "Red Social Deportiva", desc: "Feed social, creación de equipos, eventos grupales y chat con tu comunidad local.", badge: null },
    { icon: "📊", title: "Perfil Profesional", desc: "Sube estadísticas y videos highlight para que equipos y ligas te descubran.", badge: "NUEVO" },
    { icon: "❤️", title: "Monitoreo de Salud", desc: "Integración nativa con Google Fit y Apple HealthKit para seguimiento de actividad física.", badge: null },
    { icon: "⚡", title: "100% Gratis", desc: "Usuarios no pagan nunca. El modelo de comisiones a locales sostiene toda la plataforma.", badge: "GRATIS" },
  ];
  return (
    <section id="features" style={{ padding: "100px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>Funcionalidades</SectionTag>
          <BigHeading>CARACTERÍSTICAS<br /><span style={{ color: c.g1 }}>PRINCIPALES</span></BigHeading>
          <p style={{ fontSize: "1rem", color: c.muted, lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
            Funciones diseñadas para revolucionar la experiencia deportiva amateur en El Salvador.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
          {feats.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, badge, delay }) {
  const r = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div className="reveal" ref={r}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--panel)", border: `1px solid ${hovered ? "rgba(0,230,118,0.3)" : "var(--border)"}`,
        borderRadius: 22, padding: 32,
        transform: hovered ? "translateY(-10px)" : "none",
        boxShadow: hovered ? "0 20px 50px rgba(0,230,118,0.12)" : "none",
        transition: "all .35s", position: "relative", overflow: "hidden",
        animationDelay: `${delay}ms`,
      }}>
      <div style={{
        position: "absolute", inset: 0, opacity: hovered ? 1 : 0, transition: "opacity .35s",
        background: "linear-gradient(135deg,rgba(0,230,118,0.04),transparent)",
      }} />
      <div style={{
        width: 54, height: 54, borderRadius: 14,
        background: "linear-gradient(135deg,rgba(0,230,118,0.14),rgba(61,159,255,0.09))",
        border: "1px solid rgba(0,230,118,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.5rem", marginBottom: 18, position: "relative", zIndex: 1,
      }}>{icon}</div>
      <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 10, position: "relative", zIndex: 1 }}>{title}</h4>
      <p style={{ fontSize: "0.88rem", color: c.muted, lineHeight: 1.7, position: "relative", zIndex: 1 }}>{desc}</p>
      {badge && (
        <span style={{
          display: "inline-block", background: c.g1, color: "#000",
          fontSize: "0.62rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100,
          marginTop: 14, letterSpacing: "0.04em", position: "relative", zIndex: 1,
        }}>{badge}</span>
      )}
    </div>
  );
}

/* ─── APP DEMO ─── */
const APP_TABS = [
  { id: "home", label: "🏠 Inicio" },
  { id: "reservas", label: "📅 Reservas" },
  { id: "comunidad", label: "👥 Comunidad" },
  { id: "perfil", label: "👤 Perfil" },
];

const DEMO_COPY = {
  home: {
    title: ["ENCUENTRA TU", "PRÓXIMO ", "PARTIDO"],
    hi: 2,
    desc: "Descubre canchas cercanas en tiempo real con disponibilidad instantánea y precios claros.",
    steps: ["Abre FitMatch y activa tu ubicación","Filtra por tipo de cancha y horario preferido","Ve jugadores disponibles en tu zona","Arma tu equipo y reserva en segundos"],
  },
  reservas: {
    title: ["RESERVA EN", "SEGUNDOS"],
    hi: 1,
    desc: "Selecciona fecha, hora y cancha. Confirmación instantánea sin llamadas ni mensajes.",
    steps: ["Elige la cancha de tu preferencia","Selecciona fecha en el calendario interactivo","Escoge el slot horario disponible","Confirma y recibe tu código de reserva"],
  },
  comunidad: {
    title: ["CONECTA CON", "TU COMUNIDAD"],
    hi: 1,
    desc: "Comparte momentos, organiza partidos grupales y mantente al día con eventos deportivos locales.",
    steps: ["Crea tu equipo o únete a uno existente","Publica tu disponibilidad y busca rivales","Participa en torneos relámpago","Comparte clips y celebra tus mejores momentos"],
  },
  perfil: {
    title: ["TU PERFIL", "DEPORTIVO"],
    hi: 1,
    desc: "Construye tu carta de presentación digital. Sube estadísticas, videos y monitorea tu bienestar.",
    steps: ["Completa tu perfil con posición y habilidades","Sube videos de tus mejores jugadas","Sincroniza tu wearable para salud","Sé descubierto por equipos y ligas"],
  },
};

/* ─── SCREENS ─── */
function ScreenHome() {
  const canchas = [
    { name: "Cancha El Paraíso", meta: "📍 0.8 km · Fútbol 7 · $8/hr", free: true },
    { name: "Estadio San Marcos", meta: "📍 1.4 km · Fútbol 11 · $12/hr", free: true },
    { name: "Cancha Los Héroes", meta: "📍 2.1 km · Fútbol 5 · $6/hr", free: false },
  ];
  return (
    <div className="fade-slide">
      <div style={{ background: "linear-gradient(160deg,rgba(0,230,118,0.13),transparent)", padding: "18px 18px 12px" }}>
        <div style={{ fontSize: "0.62rem", color: c.muted }}>Buenos días 👋</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Pablo Brito</div>
      </div>
      {/* map */}
      <div style={{
        margin: "12px 18px", height: 115, borderRadius: 18,
        background: "linear-gradient(135deg,#0d2a1a,#0a1f2e)",
        border: "1px solid rgba(0,230,118,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: 38, height: 38, border: "2px solid rgba(0,230,118,0.4)", borderRadius: "50%", animation: "ring-expand 2s ease-out infinite" }} />
        <div style={{ width: 10, height: 10, background: c.g1, borderRadius: "50%", boxShadow: `0 0 16px ${c.g1}`, zIndex: 2, position: "absolute" }} />
        <span style={{ fontSize: "0.58rem", color: c.g3, fontWeight: 600, marginTop: 50, position: "absolute" }}>Tu zona · 5 canchas disponibles</span>
      </div>
      <div style={{ fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.lite, padding: "6px 18px 4px" }}>Canchas disponibles ahora</div>
      {canchas.map(ca => (
        <div key={ca.name} style={{
          margin: "4px 18px", padding: "9px 12px",
          background: "rgba(255,255,255,0.03)", borderRadius: 13,
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer",
        }}>
          <div>
            <div style={{ fontSize: "0.66rem", fontWeight: 600 }}>{ca.name}</div>
            <div style={{ fontSize: "0.56rem", color: c.muted, marginTop: 1 }}>{ca.meta}</div>
          </div>
          <span style={{
            background: ca.free ? c.g1 : "rgba(239,68,68,0.18)",
            color: ca.free ? "#000" : "#ef4444",
            fontSize: "0.52rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20,
          }}>{ca.free ? "LIBRE" : "LLENA"}</span>
        </div>
      ))}
    </div>
  );
}

function ScreenReservas() {
  const [selectedDay, setSelectedDay] = useState(23);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const days = [19,20,21,22,23,24,25,26,27,28];
  const slots = [
    { time: "08:00 – 09:00", taken: true },
    { time: "09:00 – 10:00", taken: false },
    { time: "10:00 – 11:00", taken: false },
    { time: "11:00 – 12:00", taken: true },
    { time: "15:00 – 16:00", taken: false },
  ];
  return (
    <div className="fade-slide">
      <div style={{ background: "rgba(0,230,118,0.07)", padding: "14px 18px", borderBottom: "1px solid rgba(0,230,118,0.1)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.9rem", color: c.g3 }}>📅 Reservar Cancha</div>
      </div>
      <div style={{ margin: "12px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 14 }}>
        <div style={{ fontSize: "0.58rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.muted, textAlign: "center", marginBottom: 8 }}>FEBRERO 2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 10 }}>
          {["L","M","M","J","V","S","D"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: "0.5rem", color: c.muted, padding: 2 }}>{d}</div>
          ))}
          {[19,20,21,22,23,24,25,26,27,28].map(d => (
            <div key={d} onClick={() => setSelectedDay(d)} style={{
              textAlign: "center", fontSize: "0.56rem", padding: "4px 2px", borderRadius: 7, cursor: "pointer",
              background: selectedDay === d ? c.g1 : "transparent",
              color: selectedDay === d ? "#000" : c.lite,
              fontWeight: selectedDay === d ? 700 : 400,
              transition: "all .18s",
            }}>{d}</div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: "0.63rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.lite, padding: "6px 18px 5px" }}>
        Horarios · Cancha El Paraíso · Feb {selectedDay}
      </div>
      <div style={{ margin: "0 18px" }}>
        {slots.map((s, i) => (
          <div key={i} onClick={() => !s.taken && setSelectedSlot(i)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 12px", marginBottom: 5, borderRadius: 11, cursor: s.taken ? "not-allowed" : "pointer",
              border: `1px solid ${selectedSlot === i ? c.g1 : s.taken ? "rgba(255,255,255,0.04)" : "rgba(0,230,118,0.12)"}`,
              background: selectedSlot === i ? "rgba(0,230,118,0.1)" : "rgba(255,255,255,0.02)",
              opacity: s.taken ? 0.45 : 1, transition: "all .18s",
            }}>
            <div>
              <div style={{ fontSize: "0.63rem", fontWeight: 600 }}>{s.time}</div>
              <div style={{ fontSize: "0.56rem", color: c.g3 }}>$8.00</div>
            </div>
            <span style={{
              fontSize: "0.5rem", fontWeight: 700, padding: "2px 7px", borderRadius: 20,
              background: s.taken ? "rgba(239,68,68,0.18)" : "rgba(0,230,118,0.18)",
              color: s.taken ? "#ef4444" : c.g3,
            }}>{s.taken ? "OCUPADO" : "LIBRE"}</span>
          </div>
        ))}
      </div>
      {selectedSlot !== null && !slots[selectedSlot].taken && (
        <div style={{ margin: "10px 18px", padding: "10px 14px", background: "rgba(0,230,118,0.12)", borderRadius: 12, border: "1px solid rgba(0,230,118,0.3)", textAlign: "center" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: c.g3 }}>✅ Slot seleccionado</div>
          <div style={{ fontSize: "0.58rem", color: c.muted, marginTop: 3 }}>Toca confirmar para reservar</div>
        </div>
      )}
    </div>
  );
}

function ScreenComunidad() {
  const [liked, setLiked] = useState({});
  const posts = [
    { initials: "CR", grad: `${c.g1},${c.blue}`, name: "Carlos Rivas", time: "hace 12m", text: "¿Alguien para completar equipo esta tarde en Cancha El Paraíso? Necesitamos 2 jugadores más ⚽🔥", likes: 14, comments: 3 },
    { initials: "MA", grad: "#ffd700,#ff6b00", name: "Mario Alvarez", time: "hace 45m", text: "🏆 Torneo Relámpago este sábado. ¡Inscribe tu equipo antes del viernes! Premiación para el 1er lugar.", likes: 32, comments: 11 },
    { initials: "JL", grad: "#ff4081,#9c27b0", name: "José López", time: "hace 1h", text: "Qué partidazo de hoy 🔥 Hat-trick en el último torneo. FitMatch hizo posible este equipo.", likes: 58, comments: 7 },
  ];
  return (
    <div className="fade-slide">
      <div style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.9rem" }}>👥 Comunidad</div>
      <div style={{ display: "flex", gap: 7, margin: "10px 18px" }}>
        {["Feed","Torneos","Equipos"].map((t, i) => (
          <div key={t} style={{
            background: i === 0 ? c.g1 : "rgba(255,255,255,0.05)",
            color: i === 0 ? "#000" : c.muted,
            fontSize: "0.58rem", fontWeight: 700, padding: "4px 12px", borderRadius: 20, cursor: "pointer",
          }}>{t}</div>
        ))}
      </div>
      {posts.map((p, i) => (
        <div key={i} style={{ margin: "8px 18px", padding: 12, background: "rgba(255,255,255,0.025)", borderRadius: 13, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: `linear-gradient(135deg,${p.grad})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.58rem", fontWeight: 700, color: "#000", flexShrink: 0,
            }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.63rem", fontWeight: 600 }}>{p.name}</div>
            </div>
            <span style={{ fontSize: "0.52rem", color: c.muted }}>{p.time}</span>
          </div>
          <div style={{ fontSize: "0.63rem", color: c.lite, lineHeight: 1.5 }}>{p.text}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 9 }}>
            <span onClick={() => setLiked(l => ({ ...l, [i]: !l[i] }))}
              style={{ fontSize: "0.58rem", color: liked[i] ? c.g1 : c.muted, cursor: "pointer" }}>
              ❤️ {p.likes + (liked[i] ? 1 : 0)}
            </span>
            <span style={{ fontSize: "0.58rem", color: c.muted, cursor: "pointer" }}>💬 {p.comments}</span>
            <span style={{ fontSize: "0.58rem", color: c.muted, cursor: "pointer" }}>📤</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenPerfil() {
  const bars = [
    { label: "Pasos hoy", val: "7,842 / 10,000", pct: 78, color: `${c.g1},${c.g3}` },
    { label: "Minutos activos", val: "45 / 60", pct: 75, color: `${c.blue},${c.g3}` },
    { label: "Calorías", val: "420 kcal", pct: 60, color: "#ffd700,#ff6b00" },
  ];
  return (
    <div className="fade-slide">
      <div style={{ background: "linear-gradient(160deg,rgba(0,230,118,0.12),transparent)", padding: "20px 18px", textAlign: "center" }}>
        <div style={{
          width: 58, height: 58, borderRadius: "50%", margin: "0 auto 10px",
          background: `linear-gradient(135deg,${c.g1},${c.blue})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.4rem", border: `3px solid ${c.g1}`,
          boxShadow: "0 0 20px rgba(0,230,118,0.3)",
        }}>⚽</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.95rem" }}>Pablo Brito</div>
        <div style={{ fontSize: "0.63rem", color: c.g3, marginTop: 2 }}>🎯 Mediocampo · San Salvador</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 22, marginTop: 14 }}>
          {[["23","Partidos"],["12","Goles"],["4.9","Rating"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", color: c.g1 }}>{n}</div>
              <div style={{ fontSize: "0.52rem", color: c.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: "0.63rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.lite, padding: "10px 18px 6px" }}>Salud & Actividad (Google Fit)</div>
      {bars.map(b => (
        <div key={b.label} style={{ margin: "4px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: "0.58rem", color: c.muted }}>{b.label}</span>
            <span style={{ fontSize: "0.58rem", color: c.g3 }}>{b.val}</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${b.pct}%`, background: `linear-gradient(90deg,${b.color})`, borderRadius: 3 }} />
          </div>
        </div>
      ))}
      <div style={{ fontSize: "0.63rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", color: c.lite, padding: "8px 18px 6px" }}>Videos Highlight</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, margin: "0 18px 12px" }}>
        {[`${c.g2},${c.blue}`,"#ffd700,#ff6b00"].map((g, i) => (
          <div key={i} style={{
            height: 54, borderRadius: 10, cursor: "pointer",
            background: `linear-gradient(135deg,${g.split(",").map(x => x + "22").join(",")})`,
            border: `1px solid ${g.split(",")[0]}33`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
          }}>▶️</div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = { home: ScreenHome, reservas: ScreenReservas, comunidad: ScreenComunidad, perfil: ScreenPerfil };

/* ─── BIG PHONE ─── */
function BigPhone({ activeTab, onTabChange }) {
  const Screen = SCREENS[activeTab];
  const navIcons = [["🏠","home"],["📅","reservas"],["👥","comunidad"],["👤","perfil"]];
  return (
    <div style={{
      background: "#060a12", borderRadius: 52,
      border: "2px solid rgba(0,230,118,0.28)",
      boxShadow: "0 50px 100px rgba(0,0,0,0.7), 0 0 80px rgba(0,230,118,0.1), inset 0 0 0 1px rgba(255,255,255,0.04)",
      overflow: "hidden",
    }}>
      <div style={{ width: 100, height: 30, background: "#060a12", borderRadius: "0 0 18px 18px", margin: "0 auto" }} />
      <div style={{ minHeight: 560, overflowY: "auto" }}>
        <Screen key={activeTab} />
      </div>
      <div style={{
        display: "flex", justifyContent: "space-around", padding: "10px 0 8px",
        borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(6,10,18,0.95)",
      }}>
        {navIcons.map(([ic, id]) => (
          <div key={id} onClick={() => onTabChange(id)}
            style={{ textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: "1.1rem" }}>{ic}</div>
            <div style={{ fontSize: "0.48rem", color: activeTab === id ? c.g1 : c.muted, marginTop: 2, fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── DEMO SECTION ─── */
function Demo() {
  const [activeTab, setActiveTab] = useState("home");
  const d = DEMO_COPY[activeTab];
  const r = useReveal();
  return (
    <section id="demo" style={{ padding: "100px 30px", background: "linear-gradient(180deg,transparent,rgba(0,230,118,0.025),transparent)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>App Demo</SectionTag>
          <BigHeading>EXPLORA LA<br /><span style={{ color: c.g1 }}>APLICACIÓN</span></BigHeading>
          <p style={{ fontSize: "1rem", color: c.muted, lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
            Navega las pantallas de la app y descubre cómo FitMatch transforma tu experiencia deportiva.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 60, alignItems: "center" }}>
          <div className="reveal" ref={r}>
            {/* tabs */}
            <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
              {APP_TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: "10px 22px", borderRadius: 100, cursor: "pointer",
                    border: `1px solid ${activeTab === t.id ? "transparent" : c.border}`,
                    background: activeTab === t.id ? `linear-gradient(135deg,${c.g1},${c.g2})` : "transparent",
                    color: activeTab === t.id ? "#000" : c.muted,
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem",
                    transition: "all .22s",
                  }}>{t.label}</button>
              ))}
            </div>
            {/* copy */}
            <div key={activeTab} className="fade-slide">
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", lineHeight: 1, marginBottom: 14 }}>
                {d.title.map((line, i) => (
                  <span key={i} style={{ color: i === d.hi ? c.g1 : c.white }}>{line}{i < d.title.length - 1 ? <br /> : null}</span>
                ))}
              </h3>
              <p style={{ fontSize: "1rem", color: c.muted, lineHeight: 1.75, marginBottom: 28 }}>{d.desc}</p>
              <ul style={{ listStyle: "none" }}>
                {d.steps.map((s, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, fontSize: "0.95rem", color: c.lite }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg,${c.g1},${c.g2})`,
                      color: "#000", fontWeight: 800, fontSize: "0.78rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{i + 1}</div>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BigPhone activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARISON ─── */
function Comparison() {
  const r = useReveal();
  const rows = [
    ["Reservas de canchas","✅ Básicas","✅ + Gestión avanzada"],
    ["Comunidad deportiva","❌ No","✅ Feed + Equipos + Chat"],
    ["Torneos amateur","❌ No","✅ Brackets automáticos"],
    ["Salud integrada","❌ No","✅ Fit / HealthKit"],
    ["Perfil de jugador","❌ No","✅ Videos + Estadísticas"],
    ["Costo para usuario","💰 Pago","✅ TOTALMENTE GRATIS"],
    ["Foco El Salvador","❌ No","✅ 100% local"],
  ];
  return (
    <section style={{ padding: "100px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>Comparación</SectionTag>
          <BigHeading>¿POR QUÉ<br /><span style={{ color: c.g1 }}>ELEGIRNOS?</span></BigHeading>
        </div>
        <div className="reveal" ref={r} style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <thead>
              <tr>
                {["Característica","Otras Apps","FitMatch 🚀"].map((h, i) => (
                  <th key={h} style={{
                    padding: "18px 22px", textAlign: i === 0 ? "left" : "center",
                    border: "1px solid rgba(255,255,255,0.04)",
                    background: i === 2 ? "linear-gradient(135deg,rgba(0,230,118,0.2),rgba(0,230,118,0.08))" : "rgba(255,255,255,0.03)",
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.95rem",
                    color: i === 2 ? c.g3 : c.white,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feat, other, ours], ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "16px 22px", border: "1px solid rgba(255,255,255,0.04)", fontWeight: 600, color: c.lite, fontSize: "0.93rem" }}>{feat}</td>
                  <td style={{ padding: "16px 22px", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center", color: c.muted, fontSize: "0.93rem" }}>{other}</td>
                  <td style={{ padding: "16px 22px", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center", color: c.g1, fontWeight: 700, fontSize: "0.93rem" }}>{ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM ─── */
function Team() {
  const r = useReveal();
  return (
    <section id="team" style={{ padding: "100px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>El equipo</SectionTag>
          <BigHeading>LA MENTE<br /><span style={{ color: c.g1 }}>DETRÁS</span></BigHeading>
        </div>
        <div className="reveal" ref={r} style={{
          maxWidth: 760, margin: "0 auto",
          background: "var(--panel)", border: "1px solid var(--border)",
          borderRadius: 30, padding: 50,
          display: "flex", gap: 40, alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${c.g1},${c.blue},${c.g3})` }} />
          <div style={{
            width: 110, height: 110, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg,${c.g1},${c.blue})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.2rem", border: `4px solid rgba(0,230,118,0.35)`,
            boxShadow: "0 15px 40px rgba(0,230,118,0.22)",
          }}>👨‍💻</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 8 }}>Pablo Brito</div>
            <span style={{
              display: "inline-block", background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.2)",
              color: c.g3, fontSize: "0.78rem", fontWeight: 700, padding: "4px 14px", borderRadius: 100, marginBottom: 16,
            }}>Fundador & Desarrollador</span>
            <p style={{ fontSize: "0.93rem", color: c.muted, lineHeight: 1.72, marginBottom: 16 }}>
              Estudiante de Ingeniería Informática y fundador de FitMatch. Apasionado por conectar la comunidad deportiva salvadoreña y promover una vida activa y saludable a través de la tecnología.
            </p>
            <p style={{ color: c.g3, fontStyle: "italic", fontSize: "0.93rem", fontWeight: 600 }}>
              💬 "El cambio comienza con un solo partido. FitMatch es el primer paso hacia una comunidad más activa y unida en El Salvador."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  const r = useReveal();
  return (
    <section style={{ padding: "60px 30px 120px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div className="reveal" ref={r} style={{
          background: `linear-gradient(135deg,${c.g1},#00c853,${c.g1})`,
          borderRadius: 32, padding: "80px 50px", textAlign: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,230,118,0.28)",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%,rgba(255,255,255,0.14),transparent 60%),radial-gradient(circle at 70% 50%,rgba(0,0,0,0.07),transparent 60%)" }} />
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,5vw,5rem)", color: "#000", position: "relative", zIndex: 2, marginBottom: 14, lineHeight: 1 }}>
            ÚNETE A LA<br />REVOLUCIÓN DEPORTIVA
          </h2>
          <p style={{ color: "rgba(0,0,0,0.68)", fontSize: "1.1rem", fontWeight: 500, position: "relative", zIndex: 2, marginBottom: 36 }}>
            Descarga FitMatch y transforma el deporte amateur en El Salvador. ¡Sin costo, para siempre!
          </p>
          <button style={{
            background: "#000", color: c.white, border: "none", cursor: "pointer",
            padding: "18px 48px", borderRadius: 100,
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)", position: "relative", zIndex: 2,
            transition: "all .3s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-4px) scale(1.04)"; e.target.style.boxShadow = "0 18px 50px rgba(0,0,0,0.5)"; }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)"; }}
          >🚀 Descargar Ahora — Es Gratis</button>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "rgba(8,12,20,0.92)", borderTop: `1px solid ${c.border}`, padding: "60px 30px 30px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 50 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <LogoMark size={40} />
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>FitMatch</span>
            </div>
            <p style={{ color: c.muted, fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 260 }}>
              Conectando deportistas y locales recreativos en El Salvador. Comunidad, salud y deporte en un solo lugar.
            </p>
          </div>
          <div>
            <h5 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18, color: c.lite }}>Plataforma</h5>
            {[["Quiénes Somos","#about"],["Características","#features"],["Demo App","#demo"],["Equipo","#team"]].map(([l,h]) => (
              <a key={l} href={h} style={{ display: "block", color: c.muted, textDecoration: "none", fontSize: "0.88rem", marginBottom: 11, transition: "all .22s" }}
                onMouseEnter={e => { e.target.style.color = c.g1; e.target.style.paddingLeft = "4px"; }}
                onMouseLeave={e => { e.target.style.color = c.muted; e.target.style.paddingLeft = "0"; }}
              >{l}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18, color: c.lite }}>Legal</h5>
            {["Términos de uso","Privacidad","Cookies"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: c.muted, textDecoration: "none", fontSize: "0.88rem", marginBottom: 11 }}>{l}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18, color: c.lite }}>Contacto</h5>
            <p style={{ color: c.muted, fontSize: "0.88rem", marginBottom: 10 }}>📧 fitmatchsv@gmail.com</p>
            <p style={{ color: c.muted, fontSize: "0.88rem" }}>📍 El Salvador 🇸🇻</p>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 28,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
          color: c.muted, fontSize: "0.82rem",
        }}>
          <span>© 2025 FitMatch. Todos los derechos reservados.</span>
          <span>Desarrollado por <span style={{ color: c.g3 }}>Pablo Brito</span> · El Salvador 🇸🇻</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Problema />
      <Divider />
      <Features />
      <Divider />
      <Demo />
      <Divider />
      <Comparison />
      <Divider />
      <Team />
      <CTA />
      <Footer />
    </>
  );
}