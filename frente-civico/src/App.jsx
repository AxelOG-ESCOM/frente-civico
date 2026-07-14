import { useState, useEffect } from 'react';
import logoIcon from './logo.svg';

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '', correo: '', tipo: 'ciudadano',
    delegacion: '', tema: '', nombreOrg: '', enlaceWeb: ''
  });
  const [enviado, setEnviado] = useState(false);
  

  const [contador, setContador] = useState(14582);
  const [folio] = useState(`FC-${Math.floor(Math.random() * 90000 + 10000)}`);
  const [horaActual, setHoraActual] = useState(new Date());
  const [progresoScroll, setProgresoScroll] = useState(0);


  useEffect(() => {
    const borrador = localStorage.getItem('frenteCivicoBorrador');
    if (borrador) {
      setFormData(JSON.parse(borrador));
    }
  }, []);

  // Guarda los datos en tiempo real cada que el usuario escribe
  useEffect(() => {
    localStorage.setItem('frenteCivicoBorrador', JSON.stringify(formData));
  }, [formData]);

  //Reloj en tiempo real
  useEffect(() => {
    const intervaloReloj = setInterval(() => setHoraActual(new Date()), 1000);
    return () => clearInterval(intervaloReloj);
  }, []);

  // "Contador en vivo de ciudadanos"
  useEffect(() => {
    const intervaloContador = setInterval(() => {
      if (Math.random() > 0.5) {
        setContador(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 4000);
    return () => clearInterval(intervaloContador);
  }, []);

  // scroll
  useEffect(() => {
    const manejarScroll = () => {
      const scrollTotal = document.documentElement.scrollTop;
      const alturaVentana = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progreso = (scrollTotal / alturaVentana) * 100;
      setProgresoScroll(progreso);
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  // MANEJADORES DEL FORMULARIO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    localStorage.removeItem('frenteCivicoBorrador'); // Limpiar borrador al enviar
    
    setTimeout(() => {
      setEnviado(false);
      setFormData({
        nombre: '', correo: '', tipo: 'ciudadano',
        delegacion: '', tema: '', nombreOrg: '', enlaceWeb: ''
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-teal-200 scroll-smooth">
      
      <div 
        className="fixed top-0 left-0 h-1.5 bg-teal-600 z-60 transition-all duration-150 ease-out"
        style={{ width: `${progresoScroll}%` }}
      ></div>


      <nav className="border-b-2 border-stone-200 bg-white px-6 py-3 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <img src="/frente-civico/logo.svg" alt="Logo Frente Cívico" className="h-16 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform" />
          <span className="font-bold text-xl tracking-tight text-stone-800">Frente Cívico</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">Hora Oficial</span>
            <span className="text-sm font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              {horaActual.toLocaleTimeString('es-MX', { hour: '2-digit', minute:'2-digit', second:'2-digit' })} 
              <span className="text-teal-700 ml-1 font-bold text-xs">CDMX</span>
            </span>
          </div>
          <a href="#registro" className="text-sm font-bold bg-stone-100 border border-stone-300 px-4 py-2 hover:bg-stone-200 transition-colors">
            Participar
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto px-6 py-20 text-center relative">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-teal-200 rounded-full bg-teal-50 text-xs font-mono text-teal-800 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          Padrón abierto • {contador.toLocaleString()} ciudadanos unidos
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-stone-900 mb-6 tracking-tight leading-tight">
          La ciudad es nuestra. <br/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-700 to-emerald-600">El poder también.</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Suma tu voz al registro ciudadano más grande del país. Juntos exigimos transparencia, construimos seguridad y defendemos nuestros derechos.
        </p>
        <a href="#registro" className="inline-flex items-center justify-center bg-teal-700 text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-teal-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
          Unirme al Padrón
        </a>
      </header>

      {/* PILARES SECTION */}
      <section className="bg-stone-100 border-y border-stone-200 py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-black mb-12 text-center text-stone-800">Ejes de Acción</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: "01", titulo: "Transparencia", desc: "Vigilamos el uso de los recursos públicos y exigimos rendición de cuentas clara.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
              { id: "02", titulo: "Seguridad", desc: "Impulsamos redes vecinales y políticas de prevención para recuperar nuestras calles.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { id: "03", titulo: "Derechos", desc: "Defendemos jurídicamente las causas justas y empoderamos a la ciudadanía.", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" }
            ].map((pilar) => (
              <div key={pilar.id} className="bg-white p-8 border border-stone-300 shadow-sm hover:shadow-md transition-shadow relative group">
                <span className="absolute top-0 right-0 bg-stone-100 text-stone-400 font-mono text-xs px-2 py-1 m-3 border border-stone-200">Acta {pilar.id}</span>
                <div className="w-14 h-14 bg-teal-50 border border-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pilar.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">{pilar.titulo}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO SECTION */}
      <section id="registro" className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto bg-white border border-stone-300 shadow-xl p-8 md:p-14 relative">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-teal-800 to-teal-500"></div>
          
          <div className="border-b-2 border-stone-100 pb-6 mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h2 className="text-3xl font-black text-stone-800 tracking-tight">Formulario de Adhesión</h2>
              <p className="text-stone-500 mt-2">Llene los campos requeridos para oficializar su registro.</p>
            </div>
            <div className="border-2 border-dashed border-stone-300 p-3 text-center bg-stone-50">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Folio Generado</p>
              <p className="font-mono font-black text-teal-800 text-lg">{folio}</p>
            </div>
          </div>

          {enviado ? (
            <div className="bg-teal-50 border-2 border-teal-500 p-10 text-center animate-in fade-in zoom-in duration-500 shadow-inner">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-teal-900 mb-2">¡Registro Completado!</h3>
              <p className="text-teal-700">El folio <strong className="font-mono bg-white px-2 py-1 rounded mx-1">{folio}</strong> ha sido integrado al padrón ciudadano.<br/>Nos pondremos en contacto a través de tu correo.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-bold text-stone-700 mb-2 group-focus-within:text-teal-700 transition-colors">Nombre completo *</label>
                  <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors placeholder:text-stone-300" placeholder="Ej. Juan Pérez"/>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-stone-700 mb-2 group-focus-within:text-teal-700 transition-colors">Correo electrónico *</label>
                  <input type="email" name="correo" required value={formData.correo} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors placeholder:text-stone-300" placeholder="correo@ejemplo.com"/>
                </div>
              </div>

              <div className="bg-stone-50 p-6 border border-stone-200 rounded-sm">
                <label className="block text-sm font-bold text-stone-700 mb-4 uppercase tracking-wider">¿Cómo te sumas? *</label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <label className={`flex-1 flex items-center gap-3 p-4 border cursor-pointer transition-all rounded-sm ${formData.tipo === 'ciudadano' ? 'border-teal-600 bg-teal-50 shadow-sm' : 'border-stone-200 bg-white hover:border-teal-300'}`}>
                    <input type="radio" name="tipo" value="ciudadano" checked={formData.tipo === 'ciudadano'} onChange={handleChange} className="w-5 h-5 accent-teal-600" />
                    <span className="font-bold text-stone-700">Como Ciudadano</span>
                  </label>
                  <label className={`flex-1 flex items-center gap-3 p-4 border cursor-pointer transition-all rounded-sm ${formData.tipo === 'organizacion' ? 'border-teal-600 bg-teal-50 shadow-sm' : 'border-stone-200 bg-white hover:border-teal-300'}`}>
                    <input type="radio" name="tipo" value="organizacion" checked={formData.tipo === 'organizacion'} onChange={handleChange} className="w-5 h-5 accent-teal-600" />
                    <span className="font-bold text-stone-700">Como Organización</span>
                  </label>
                </div>
              </div>

              <div className="overflow-hidden transition-all duration-500 ease-in-out">
                {formData.tipo === 'ciudadano' ? (
                  <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Delegación / Municipio *</label>
                      <input type="text" name="delegacion" required value={formData.delegacion} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors" placeholder="Ej. Gustavo A. Madero"/>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Tema prioritario a reportar *</label>
                      <select name="tema" required value={formData.tema} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors text-stone-700 cursor-pointer">
                        <option value="">Selecciona un tema...</option>
                        <option value="baches">Infraestructura (Baches, luz)</option>
                        <option value="seguridad">Seguridad Pública</option>
                        <option value="corrupcion">Corrupción / Trámites</option>
                        <option value="agua">Suministro de Agua</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Nombre de la Organización *</label>
                      <input type="text" name="nombreOrg" required value={formData.nombreOrg} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors" placeholder="Nombre oficial"/>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Enlace Web o Redes Sociales</label>
                      <input type="url" name="enlaceWeb" value={formData.enlaceWeb} onChange={handleChange} className="w-full border-b-2 border-stone-200 px-0 py-2 focus:outline-none focus:border-teal-600 bg-transparent transition-colors" placeholder="https://"/>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-stone-900 text-white font-bold text-lg py-5 hover:bg-teal-800 transition-colors flex justify-center items-center gap-3 group rounded-sm shadow-md hover:shadow-lg">
                  Firmar Acta y Enviar
                  <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-mono">Documento clasificado: Público</p>
                  {/* Pequeño indicador de autoguardado */}
                  <p className="text-xs text-teal-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                    Borrador autoguardado
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
