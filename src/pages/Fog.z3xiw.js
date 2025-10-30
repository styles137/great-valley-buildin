// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w.onReady(function () {
        $w('#BG1F').onClick(() => {
            // Change background image dynamically
            $w('#body').background.src = "https://static.wixstatic.com/media/a4a336_1a1b2b1221744620b116a7b095ab7c71~mv2.jpg";
        });

        $w('#BG2F').onClick(() => {
            // Change background image dynamically
            $w('#body').background.src = "https://static.wixstatic.com/media/a4a336_85df8842d3444e04a9405fb8a1d0e0c2~mv2.jpg";
        });

        $w('#BG3F').onClick(() => {
            // Change background image dynamically
            $w('#body').background.src = "https://static.wixstatic.com/media/a4a336_54e2f8329fca4be5b7d3c0e0aa16eadc~mv2.jpg";
        });

        $w('#BG4F').onClick(() => {
            // Change background image dynamically
            $w('#body').background.src = "https://static.wixstatic.com/media/a4a336_5d842850e8d34fb8a163b33172a1df09~mv2.jpg";
        });

        $w('#BG5F').onClick(() => {
            // Change background image dynamically
            $w('#body').style.backgroundColor = "#718D9B";
            $w('#body').background.src = "";
        });

        $w('#BG6F').onClick(() => {
            // Change background image dynamically
            $w('#body').style.backgroundColor = "#ffffff";
            $w('#body').background.src = "";
        });
    });

    // Tray pasting these into the HTML spot on the test page in designer for cloud backgroud

    //     <!-- #1 Constantly rolling fog with mouse swirl (robust against rAF throttling) -->
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    // <canvas id="fogCanvas" style="width:100vw; height:100vh; position:fixed; top:0; left:0; z-index:-1;"></canvas>

    // <script>
    // const canvas = document.getElementById('fogCanvas');
    // const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // const scene = new THREE.Scene();
    // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // const uniforms = {
    //   u_time: { value: 0.0 },
    //   u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    //   u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    // };

    // const material = new THREE.ShaderMaterial({
    //   uniforms,
    //   fragmentShader: `
    //     uniform vec2 u_resolution;
    //     uniform vec2 u_mouse;
    //     uniform float u_time;

    //     // Hash / smooth noise helpers
    //     float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

    //     float noise(vec2 p) {
    //       vec2 i = floor(p);
    //       vec2 f = fract(p);
    //       float a = hash(i);
    //       float b = hash(i + vec2(1.0, 0.0));
    //       float c = hash(i + vec2(0.0, 1.0));
    //       float d = hash(i + vec2(1.0, 1.0));
    //       vec2 u = f * f * (3.0 - 2.0 * f);
    //       return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    //     }

    //     float fbm(vec2 p) {
    //       float v = 0.0;
    //       float a = 0.5;
    //       for (int i = 0; i < 5; i++) {
    //         v += a * noise(p);
    //         p *= 2.0;
    //         a *= 0.5;
    //       }
    //       return v;
    //     }

    //     void main() {
    //       vec2 st = gl_FragCoord.xy / u_resolution.xy;
    //       // keep aspect ratio
    //       st.x *= u_resolution.x / u_resolution.y;

    //       // continuous motion (time-driven)
    //       float t = u_time * 0.08;
    //       vec2 drift1 = vec2(t * 0.45, -t * 0.2);
    //       vec2 drift2 = vec2(-t * 0.25, t * 0.35);

    //       // layered rolling fog
    //       float base = fbm(st * 2.5 + drift1);
    //       base += 0.6 * fbm(st * 4.0 + drift2);
    //       base *= 0.7;

    //       // mouse swirl disturbance
    //       vec2 mouse = u_mouse;
    //       vec2 toMouse = st - mouse;
    //       float dist = length(toMouse);
    //       float influence = exp(-dist * 9.0);          // radius
    //       float swirlAngle = influence * 6.0;          // strength
    //       mat2 rot = mat2(cos(swirlAngle), -sin(swirlAngle),
    //                       sin(swirlAngle),  cos(swirlAngle));
    //       vec2 swirlCoord = rot * (st - mouse) + mouse;

    //       // additional layer that uses swirl coords
    //       float swirlLayer = fbm(swirlCoord * 3.0 + drift1 * 1.3);

    //       // combine and smooth
    //       float fog = mix(base, swirlLayer, influence * 0.9);
    //       fog = smoothstep(0.25, 0.85, fog);

    //       // color (soft bluish-gray)
    //       vec3 col = mix(vec3(0.55, 0.62, 0.68), vec3(0.95,0.95,0.96), fog * 0.9);
    //       gl_FragColor = vec4(col, 1.0);
    //     }
    //   `
    // });

    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    // scene.add(plane);

    // // mouse tracking inside the embed
    // window.addEventListener('mousemove', (e) => {
    //   uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
    //   uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
    // });

    // // keep resolution updated
    // window.addEventListener('resize', () => {
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    // });

    // // Robust animation: use rAF AND a fallback interval update
    // let lastTime = performance.now();
    // function renderFrame(now) {
    //   // always update time from performance.now() so 'move' is continuous
    //   uniforms.u_time.value = performance.now() * 0.001;
    //   renderer.render(scene, camera);
    //   lastTime = now;
    //   requestAnimationFrame(renderFrame);
    // }
    // requestAnimationFrame(renderFrame);

    // // Fallback: ensure we still tick even if rAF is throttled
    // const fallbackFPS = 30;
    // setInterval(() => {
    //   uniforms.u_time.value = performance.now() * 0.001;
    //   renderer.render(scene, camera);
    // }, 1000 / fallbackFPS);
    // </script>


    //***************************************************** */
    // <!-- Moving Fog Background -->
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    // <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.fog.min.js"></script>
    // <div id="vanta-bg" style="width:100vw; height:100vh;"></div>

    // <script>
    // VANTA.FOG({
    //   el: "#vanta-bg",
    //   mouseControls: true,
    //   touchControls: true,
    //   highlightColor: 0xffffff,
    //   midtoneColor: 0x8ecae6,
    //   lowlightColor: 0x219ebc,
    //   baseColor: 0x023047,
    //   blurFactor: 0.7,
    //   speed: 1.5
    // });
    // </script>

});
