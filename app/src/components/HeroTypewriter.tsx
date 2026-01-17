"use client";
import Typewriter from "typewriter-effect";

export default function HeroTypewriter() {

  const quoteBaseStyle = `
    color: rgba(168, 85, 247, 0.8); 
    font-family: serif; 
    font-size: 1.3em; 
    font-weight: 900;
    text-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
  `;

  const openQ = `<span style="${quoteBaseStyle} margin-right: 5px;">&ldquo;</span>`;
  const closeQ = `<span style="${quoteBaseStyle} margin-left: 5px;">&rdquo;</span>`;

  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
        delay: 18,
        deleteSpeed: 3,
        wrapperClassName: "typewriter-wrapper", 
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(openQ)
          .typeString('Que el código funcione, ')
          .pauseFor(300)
          .typeString('<span style="color: #ef4444; font-weight: 900; text-shadow: 0 0 15px rgba(239,68,68,0.6)">NO</span> ')
          .typeString('significa que esté ')
          .pauseFor(300)
          .typeString('<span style="color: #22c55e; font-weight: 900; text-shadow: 0 0 15px rgba(34,197,94,0.6)">BIEN HECHO ✔</span>')
          .typeString(closeQ)
          .pauseFor(1700)
          .deleteAll(20)

          .typeString(openQ)
          .typeString('Resolver problemas es fácil, lo difícil es ')
          .typeString('<span style="color: #a855f7; font-weight: 800; text-shadow: 0 0 10px rgba(168,85,247,0.4)">NO CREAR OTROS</span>')
          .typeString(closeQ)
          .pauseFor(2500)
          .deleteAll(20)

          .typeString(openQ)
          .typeString('La eficiencia ')
          .typeString('<span style="color: #ef4444; font-weight: 900; text-shadow: 0 0 10px rgba(239,68,68,0.4)">NO</span> ')
          .typeString('es negociable, es mi ')
          .typeString('<span style="color: #22c55e; font-weight: 900; text-shadow: 0 0 10px rgba(34,197,94,0.4)">ESTÁNDAR ✔</span>')
          .typeString(closeQ)
          .pauseFor(3000)
          .start();
      }}
    />
  );
}