export default function App() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white font-sans min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/10 shadow-2xl">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/15 border-2 border-emerald-500 rounded-2xl p-2 shadow-lg shadow-emerald-500/30 hover:scale-110 hover:rotate-6 transition-all">
              <div className="w-full h-full bg-emerald-500 rounded-lg"></div>
            </div>
            <span className="text-2xl font-black tracking-tight">FitMatch</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#about" className="text-slate-400 hover:text-emerald-400 transition">Quiénes Somos</a>
            <a href="#problema" className="text-slate-400 hover:text-emerald-400 transition">Problema</a>
            <a href="#features" className="text-slate-400 hover:text-emerald-400 transition">Características</a>
            <a href="#mockups" className="text-slate-400 hover:text-emerald-400 transition">Demo</a>
            <a href="#team" className="text-slate-400 hover:text-emerald-400 transition">Equipo</a>
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-black px-7 py-3 rounded-full font-bold hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all">
            Descargar Gratis
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
            Conecta, Juega y <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Crece</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            La plataforma que une deportistas, locales recreativos y bienestar físico en un solo ecosistema digital
          </p>
          
          <div className="flex gap-5 justify-center flex-wrap mb-16">
            <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-black px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all">
              🚀 Comenzar Ahora
            </button>
            <button className="bg-white/5 border-2 border-emerald-500/30 text-emerald-400 px-8 py-4 rounded-full font-bold hover:bg-emerald-500/10 hover:border-emerald-500 transition-all">
              📱 Ver Demo
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { num: '500+', label: 'Usuarios Activos' },
              { num: '50+', label: 'Locales Aliados' },
              { num: '100+', label: 'Partidos/Mes' },
              { num: '0$', label: 'Para Usuarios' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 hover:scale-105 transition-all">
                <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.num}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl p-12 border border-emerald-500/20 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-emerald-400">¿Quiénes Somos?</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                <strong className="text-white">FitMatch</strong> es una plataforma móvil gratuita para usuarios que conecta jugadores con locales recreativos. 
                Los usuarios no pagan; los locales pagan comisión por reserva. Promovemos la <strong className="text-emerald-400">actividad física</strong>, 
                facilitamos reservas en ambientes amigables y fortalecemos la <strong className="text-emerald-400">comunidad deportiva local</strong>.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 animate-bounce-slow">
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-2xl shadow-emerald-500/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA Y SOLUCIÓN */}
      <section id="problema" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">El Desafío que Enfrentamos</h2>
          <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
            La inactividad física y falta de organización deportiva son problemas reales
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/0 p-10 rounded-3xl border border-white/10 hover:border-emerald-500/30 hover:scale-105 transition-all group">
              <h3 className="text-3xl font-bold mb-5 text-emerald-400 group-hover:text-emerald-300 transition">🚨 El Problema</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                <strong>Alta prevalencia de inactividad y sobrepeso</strong> en El Salvador. Más del <strong className="text-red-400">65%</strong> no realiza actividad física frecuente.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <p className="text-red-400 font-semibold">
                  A pesar de la gran cultura de fútbol, la desorganización limita la participación.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/0 p-10 rounded-3xl border border-white/10 hover:border-emerald-500/30 hover:scale-105 transition-all group">
              <h3 className="text-3xl font-bold mb-5 text-emerald-400 group-hover:text-emerald-300 transition">✨ Nuestra Solución</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Reserva simple, gestión de torneos, perfil con videos, mHealth (Google Fit/HealthKit) y panel para locales.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <p className="text-emerald-400 font-bold">
                  🎯 Deporte + Comunidad + Tecnología + Bienestar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Características Principales</h2>
          <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
            Funciones diseñadas para revolucionar la experiencia deportiva amateur
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📍', title: 'Reserva Inteligente', desc: 'Busca canchas por zona, horario y precio. Confirma en segundos.' },
              { icon: '🏆', title: 'Torneos Relámpago', desc: 'Organiza torneos amateur con gestión automática de brackets.' },
              { icon: '👥', title: 'Red Social Deportiva', desc: 'Feed social, equipos, eventos y chat con tu comunidad.' },
              { icon: '📊', title: 'Perfil Profesional', desc: 'Sube stats y videos para que equipos te descubran.' },
              { icon: '❤️', title: 'Monitoreo de Salud', desc: 'Integración con Google Fit/HealthKit para seguimiento.' },
              { icon: '⚡', title: '100% Gratis', desc: 'Usuarios no pagan. Comisiones a locales por reservas.' }
            ].map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-500/10 to-blue-500/5 p-8 rounded-3xl text-center border border-emerald-500/20 hover:border-emerald-500 hover:scale-105 transition-all group">
                <div className="text-6xl mb-5 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARACIÓN */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">¿Por qué Elegirnos?</h2>
          <p className="text-center text-slate-400 text-lg mb-16">Comparación con la competencia</p>
          
          <div className="overflow-x-auto rounded-2xl shadow-2xl">
            <table className="w-full border-collapse bg-slate-900/50 backdrop-blur-sm">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-500/20 to-blue-500/10">
                  <th className="p-5 text-left border border-white/5 font-bold">Característica</th>
                  <th className="p-5 text-center border border-white/5 font-bold">Otras Apps</th>
                  <th className="p-5 text-center border border-white/5 font-bold text-emerald-400">FitMatch 🚀</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Reservas', '✅ Básicas', '✅ + Gestión'],
                  ['Comunidad', '❌', '✅ Feed + Equipos'],
                  ['Torneos', '❌', '✅ Automático'],
                  ['Salud', '❌', '✅ Fit/HealthKit'],
                  ['Perfil Jugador', '❌', '✅ Videos + Stats'],
                  ['Costo', '💰 Pago', '✅ GRATIS']
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-emerald-500/5 transition">
                    <td className="p-5 border border-white/5 font-semibold">{row[0]}</td>
                    <td className="p-5 text-center border border-white/5 text-slate-400">{row[1]}</td>
                    <td className="p-5 text-center border border-white/5 text-emerald-400 font-bold">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MOCKUPS */}
      <section id="mockups" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Mira Cómo Funciona</h2>
          <p className="text-center text-slate-400 text-lg mb-16">Interfaz intuitiva y moderna</p>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: '/images/mockup1.png', title: 'Pantalla Principal', desc: 'Encuentra canchas cercanas y conecta con jugadores.' },
              { img: '/images/mockup2.png', title: 'Reserva en Segundos', desc: 'Disponibilidad en tiempo real y confirmación instantánea.' },
              { img: '/images/mockup comunidad.png', title: 'Comunidad Activa', desc: 'Crea equipos, organiza torneos y comparte momentos.' }
            ].map((mock, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/0 p-8 rounded-3xl text-center border border-emerald-500/10 hover:border-emerald-500/30 hover:scale-105 transition-all group">
                <div className="mb-6 overflow-hidden rounded-2xl shadow-2xl">
                  <img src={mock.img} alt={mock.title} className="w-full group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-xl font-bold mb-3">{mock.title}</h4>
                <p className="text-slate-400">{mock.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Nuestro Equipo</h2>
          <p className="text-center text-slate-400 text-lg mb-16">El talento detrás de FitMatch</p>
          
          <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-emerald-500/20 hover:scale-105 transition-all">
            <img src="/images/fotoperfil.png" alt="Pablo Brito" className="w-32 h-32 rounded-full border-4 border-emerald-500 shadow-xl shadow-emerald-500/50 object-cover" />
            <div>
              <h4 className="text-2xl font-bold mb-3">Pablo Brito</h4>
              <p className="text-slate-400 leading-relaxed mb-4">
                Estudiante de Ingeniería Informática y fundador de FitMatch. Apasionado por conectar 
                la comunidad deportiva salvadoreña y promover vida activa y saludable.
              </p>
              <p className="text-emerald-400 italic font-semibold text-lg">
                💬 "El cambio comienza con un solo partido. FitMatch es el primer paso hacia una comunidad más activa."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-16 text-center text-black shadow-2xl shadow-emerald-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_10%,transparent_10%)] bg-[length:20px_20px] animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-5 relative z-10">Únete a la Revolución Deportiva</h2>
            <p className="text-lg md:text-xl mb-8 font-semibold relative z-10">
              Descarga FitMatch y transforma el deporte amateur en El Salvador. ¡Totalmente gratis!
            </p>
            <button className="bg-black text-white px-12 py-4 rounded-full font-bold hover:scale-110 hover:shadow-2xl transition-all relative z-10">
              🚀 Descargar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-500/10 bg-slate-950/80 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl"></div>
              <span className="text-xl font-black">FitMatch</span>
            </div>
            <p className="text-slate-400 text-sm">Conectando deportistas y locales en El Salvador.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Quiénes Somos</a>
              <a href="#features" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Características</a>
              <a href="#mockups" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Demo</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Términos</a>
              <a href="#" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Privacidad</a>
              <a href="#" className="block text-slate-400 hover:text-emerald-400 transition text-sm">Cookies</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p className="text-slate-400 text-sm mb-2">📧 fitmatchsv@gmail.com</p>
            <p className="text-slate-400 text-sm">📍 El Salvador</p>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm border-t border-white/5 pt-8">
          <p>© 2025 FitMatch. Todos los derechos reservados.</p>
          <p className="mt-2">Desarrollado con ❤️ por Pablo Brito | El Salvador 🇸🇻</p>
        </div>
      </footer>
    </div>
  );
}