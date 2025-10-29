// 👗 DressCodeSection - Sección de código de vestimenta y confirmación

import React, { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";
import { GiLargeDress } from "react-icons/gi";
import Image from "next/image";
import { quinceMainData } from "@/components/sections/data/main-data";

export default function DressCodeSection() {
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { event, dressCode } = quinceMainData;
  const { parents } = event;

  // IntersectionObserver para animaciones escalonadas que se reactivan
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
   
  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="py-20"
      style={{
        backgroundImage: ` url('${parents.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
     
      <div
        style={{
          animation: "bounce1 2s ease 0s 1 infinite",
          //backgroundColor: "#C8BFE795",
        }}
        className="container mx-auto px-4  p-6 rounded-2xl"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Título - Animación desde arriba */}
          <h2 className={`font-main-text text-5xl text-indigo-500 transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}>
            Código de Vestimenta
          </h2>
          
          {/* Imagen - Animación con escala */}
          <div className={`flex gap-4 justify-center items-center bg-white/30 p-4 rounded-lg shadow-lg transition-all duration-700 delay-300 ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}>
            <div>
              <Image
                src={dressCode.backgroundImage}
                alt="Código de Vestimenta"
                width={100}
                height={200}
                className="mx-auto rounded-lg"
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
          </div>
          
          {/* Mensaje principal - Animación desde la izquierda */}
          <h3 className={`text-3xl font-bold text-amber-600 transition-all duration-700 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`}>
            {dressCode.message}
          </h3>
          
          {/* Subtítulo - Animación desde la derecha */}
          <p className={`text-2xl text-sky-500 transition-all duration-700 delay-700 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8'
          }`}>
            {dressCode.subtitle}
          </p>

          {/* Restricción - Animación desde abajo */}
          <p 
          style={{display:'none'}}
          className={`text-xl text-indigo-500 my-4 font-bold transition-all duration-700 delay-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {dressCode.restriction}
          </p>

          
        </div>
      </div>
    </section>
  );
}
