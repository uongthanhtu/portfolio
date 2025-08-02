window.addEventListener("load", () => {
  tsParticles.load("particles-js", {
    fullScreen: { enable: false },
    background: { color: { value: "#ffffff" } },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: true, mode: ["push", "grab"] },
        resize: { enable: true, delay: 0.5 },
      },
      modes: {
        push: { quantity: 4 },
        bubble: {
          distance: 100,
          size: 12,
          duration: 0.4,
          color: "#667eea",
        },
      },
    },
    particles: {
      size: { value: { min: 8, max: 14 }, animation: { enable: false } },
      number: { value: 60, density: { enable: true, area: 1200 } },
      color: { value: "#CCCCCC" },
      links: {
        enable: true,
        distance: 150,
        color: "#888888",
        opacity: 0.5,
        width: 2.3,
      },
      move: { enable: true, speed: 2, outModes: { default: "out" } },
      collisions: { enable: true, mode: "bounce" },
    },
    detectRetina: true,
  });
});
