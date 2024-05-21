const cube = document.getElementById('cube-container');
const fileInputs = document.querySelectorAll('.file-input');
const cubeNameInput = document.getElementById('cube-name');
const modidInput = document.getElementById('modid');
const submitButton = document.querySelector('button');
let isDragging = false;
let previousX = 0;
let previousY = 0;
let currentX = 0;
let currentY = 0;
let deltaX = 0;
let deltaY = 0;
let rotationX = 0;
let rotationY = 0;
let scale = 1;
let velocityX = 0;
let velocityY = 0;
let inertiaAnimationFrame;

function handleMouseDown(event) {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    cube.style.transition = 'none';
    cancelAnimationFrame(inertiaAnimationFrame);
}

function handleMouseMove(event) {
    if (!isDragging) return;
    currentX = event.clientX;
    currentY = event.clientY;
    deltaX = currentX - previousX;
    deltaY = currentY - previousY;
    rotationX -= deltaY * 0.25;
    rotationY += deltaX * 0.25;
    cube.style.transform = `scale(${scale}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    previousX = currentX;
    previousY = currentY;

    // 更新速度
    velocityX = deltaX;
    velocityY = deltaY;
}

function handleMouseUp() {
    isDragging = false;
    cube.style.transition = 'transform 0.5s ease';
    applyInertia();
}

function handleMouseWheel(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        scale *= 0.9;
    } else {
        scale *= 1.1;
    }
    cube.style.transition = 'transform 0.5s ease';
    cube.style.transform = `scale(${scale}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

function handleFileInputChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const textureUrl = e.target.result;
            const face = document.querySelector(`.${event.target.id}`);
            face.style.backgroundImage = `url(${textureUrl})`;
            face.style.backgroundSize = 'cover';
            face.style.backgroundRepeat = 'no-repeat';
            face.style.backgroundPosition = 'center';
            face.style.imageRendering = 'pixelated';
        }
        reader.readAsDataURL(file);
    }
}

function generateJSON() {
    const cubeName = cubeNameInput.value.trim().toLowerCase().replace(/\s+/g, '_');
    const modid = modidInput.value.trim();
    const textures = {};
    let particleTexture = '';
    fileInputs.forEach(input => {
        const textureName = input.id;
        const fileName = input.files[0].name.split('.')[0];
        textures[textureName] = `${modid}:blocks/${fileName}`;
        if (textureName === 'down') {
            particleTexture = `${modid}:blocks/${fileName}`;
        }
    });
    textures['particle'] = particleTexture;
    const jsonContent = {
        "parent": "block/cube",
        "textures": textures
    };
    const jsonString = JSON.stringify(jsonContent, null, 4);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cubeName}.json`;
    link.click();
}

function applyInertia() {
    const friction = 0.9;
    const minVelocity = 1;
    function animate() {
        velocityX *= friction;
        velocityY *= friction;

        rotationX -= velocityY * 0.6;
        rotationY += velocityX * 0.6;
        cube.style.transform = `scale(${scale}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        if (Math.abs(velocityX) > minVelocity || Math.abs(velocityY) > minVelocity) {
            inertiaAnimationFrame = requestAnimationFrame(animate);
        }
    }
    inertiaAnimationFrame = requestAnimationFrame(animate);
}

cube.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('wheel', handleMouseWheel);
fileInputs.forEach(input => {
    input.addEventListener('change', handleFileInputChange);
});
submitButton.addEventListener('click', generateJSON);
