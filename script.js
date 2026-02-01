const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const card = document.querySelector('.card');
const bgMusic = document.getElementById('bgMusic');

// Try to play music as soon as page loads
bgMusic.play().catch(err => {
    console.log('Autoplay blocked, waiting for user interaction');
    // If autoplay is blocked, play on first interaction
    document.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log('Music play failed:', e));
    }, { once: true });
});

// Teasing messages for the No button
const noMessages = ["No", "Are you sure?", "Really?", "Think again!", "Please? 🥺", "Don't do this!", "Nope! 😜", "Can't catch me!", "Try again!", "Hehe 😏"];
let hoverCount = 0;
let originalSize = null;

// Function to move the No button away from cursor
function moveNoButton(e) {
    const parent = document.querySelector('.buttons');
    const noContainer = document.querySelector('.no-container');
    
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Get the right half of the buttons area (where No button belongs)
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    
    // No button should only move in the right half (after Yes button)
    const minX = parentWidth / 2 + 10; // Start after the middle
    const maxX = parentWidth - btnWidth - 10;
    const minY = 0;
    const maxY = parentHeight - btnHeight;
    
    // Random position within the right side
    let randomX = minX + Math.random() * (maxX - minX);
    let randomY = minY + Math.random() * (maxY - minY);
    
    // Apply position
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    
    // Increment hover count and apply fun effects
    hoverCount++;
    
    // Change button text
    if (hoverCount < noMessages.length) {
        noBtn.textContent = noMessages[hoverCount];
    } else {
        noBtn.textContent = noMessages[Math.floor(Math.random() * noMessages.length)];
    }
    
    // Make button progressively smaller (but not too small)
    const shrinkFactor = Math.max(0.7, 1 - hoverCount * 0.03);
    noBtn.style.transform = `scale(${shrinkFactor})`;
    
    // Add shake animation
    noBtn.classList.add('shake');
    setTimeout(() => noBtn.classList.remove('shake'), 300);
    
    // Make Yes button grow bigger as No gets harder to catch
    const yesGrowth = Math.min(1.25, 1 + hoverCount * 0.025);
    yesBtn.style.transform = `scale(${yesGrowth})`;
}

// For desktop: Move on hover
noBtn.addEventListener('mouseenter', moveNoButton);

// For mobile/tablet: Move on touch start (before click happens)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton(e.touches[0]);
});

// Also move when trying to click (backup for mobile)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton(e);
});

// Yes button action
yesBtn.addEventListener('click', () => {
    card.innerHTML = `
        <div class="heart">💗</div>
        <h1 class="question" style="color: #e91e63;">Yay! 💕</h1>
        <video autoplay loop muted playsinline style="width: 200px; height: auto; border-radius: 15px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <source src="hehe.mp4" type="video/mp4">
        </video>
        <p style="font-size: 20px; color: #666; margin-top: 15px;">
            I knew you'd say yes! 😊<br>
            You just made me the happiest! 💖
        </p>
        <p style="font-size: 16px; color: #e91e63; margin-top: 10px; font-weight: bold;">
            Happy Valentine's Day, Samprada! 💝
        </p>
    `;
});