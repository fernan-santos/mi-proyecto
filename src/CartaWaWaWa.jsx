import React, { useState, useEffect, useRef } from 'react';
import './CartaWaWaWa.css';

export default function CartaWaWaWa() {
  const [opened, setOpened] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (opened) {
      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        drift: (Math.random() - 0.5) * 100
      }));
      setHearts(newHearts);

      // Aumentar volumen gradualmente cuando se abre
      if (audioRef.current) {
        const targetVolume = 0.5; // Volumen objetivo (50%)
        const duration = 3000; // 3 segundos para subir el volumen
        const steps = 50;
        const increment = targetVolume / steps;
        const interval = duration / steps;

        let currentStep = 0;
        const volumeInterval = setInterval(() => {
          if (currentStep < steps && audioRef.current) {
            audioRef.current.volume = Math.min(increment * currentStep, targetVolume);
            currentStep++;
          } else {
            clearInterval(volumeInterval);
          }
        }, interval);

        return () => clearInterval(volumeInterval);
      }
    }
  }, [opened]);

  const handleEnvelopeClick = () => {
    if (!opened) {
      // Iniciar música al hacer click
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log("Error al reproducir audio:", err);
        });
      }
      setOpened(true);
    }
  };

  return (
    <div className="wawawa-conteiner">
      {/* Audio de fondo */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/aud.mp3" type="audio/mpeg" />
      </audio>

       {/* GIF izquierdo */}
       <div className="gif-left">
          <video src="/pepelove.mp4" alt="video/mp4" />
        </div>

        <div>
        <br />
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>  </p>
      </div>


      <div>
        <br />
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>      </p>
        <p>  </p>
      </div>


      <div
        className={`envelope ${opened ? 'opened' : ''}`}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-back"></div>
        <div className="envelope-flap"></div>

        <div className="letter">
          <h1 className="letter-header">
            Para Ti, mi mocosa wa wa wa
          </h1>

          <div className="letter-content">
            <p>
              Hola mo, en estos momentos estas duermiendo, pero no podía esperar a que despertaras para decirte lo mucho que te amo.
              Hoy que es San Valentín quise regalarte estas palabras, porque no quería dejar pasar la oportunidad de decirte lo mucho que significas para mí. Todo este tiempo a tu lado ha marcado mi vida de una forma que nunca imaginé. Hemos compartido risas, momentos difíciles, aprendizajes y sueños, y cada uno de ellos
              ha dejado una huella en mí. Me encantaría que sigamos escribiendo nuestra historia con paciencia, comprensión y mucho cariño.
            </p>

            <p>
              A veces siento que lo que llevo dentro no cabe en simples frases.
              Has sido esa persona que me entiende incluso cuando no sé cómo explicarme, la que me escucha, la que me calma y la que me impulsa a ser mejor. Estar contigo me ha enseñado lo que realmente significa querer a alguien de verdad.
            </p>

            <p>
              Quiero que sepas que mis sentimientos siguen firmes.
              Hoy celebro que existas en mi vida y deseo que el amor que nos une continúe creciendo con el tiempo.
            </p>

            <p>
              Te amo hoy con todo mi corazón Jhade.
            </p>
          </div>

          <div className="letter-signature">
            De parte de tu Mocoso Wa Wa Wa
          </div>

          {/* GIF izquierdo */}
          <div className="gif-left">
              <video src="/pepelove.mp4" alt="video/mp4" />
            </div>

          {/* GIF derecho */}
          <div className="gif-right">
            <video src="/pepelove.mp4" alt="video/mp4" />
          </div>

        </div>

        {!opened && (
          <div className="click-hint">
            ✨ Haz clic para abrir ✨
          </div>
        )}

      </div>

      {/* Corazones flotantes */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            '--drift': `${heart.drift}px`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}