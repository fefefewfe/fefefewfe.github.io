let scene, camera, renderer, personaje;

// Configuración básica
const ancho = window.innerWidth;
const alto = window.innerHeight;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, ancho / alto, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true
    });
    renderer.setSize(ancho, alto);

    // Crear personaje
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    personaje = new THREE.Mesh(geometry, material);
    scene.add(personaje);

    // Crear escenario
    const escenario = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    escenario.rotation.x = -Math.PI / 2;
    scene.add(escenario);

    // Crear objetos y PNJ
    const objetos = [];
    const pnjs = [];

    for (let i = 0; i < 10; i++) {
        const objeto = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
        objeto.position.x = Math.random() * 10 - 5;
        objeto.position.z = Math.random() * 10 - 5;
        objetos.push(objeto);
        scene.add(objeto);
    }

    for (let i = 0; i < 5; i++) {
        const pnj = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
        pnj.position.x = Math.random() * 10 - 5;
        pnj.position.z = Math.random() * 10 - 5;
        pnjs.push(pnj);
        scene.add(pnj);
    }

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Mover personaje
    if (keys['ArrowUp']) {
        personaje.position.z -= 0.1;
    }
    if (keys['ArrowDown']) {
        personaje.position.z += 0.1;
    }
    if (keys['ArrowLeft']) {
        personaje.position.x -= 0.1;
    }
    if (keys['ArrowRight']) {
        personaje.position.x += 0.1;
    }

    // Comprobar colisiones
    objetos.forEach(objeto => {
        const distancia = personaje.position.distanceTo(objeto.position);
        if (distancia < 1) {
            console.log('Colisión con objeto');
        }
    });

    pnjs.forEach(pnj => {
        const distancia = personaje.position.distanceTo(pnj.position);
        if (distancia < 1) {
            console.log('Colisión con PNJ');
        }
    });

    renderer.render(scene, camera);
}

const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

init();