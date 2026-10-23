document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Metrics Counter Animation on Scroll
    const counters = document.querySelectorAll('[data-target]');
    let hasCounted = false;

    if (counters.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + window.innerHeight;
            const targetSection = counters[0].closest('section');
            if (!targetSection) return;

            const triggerPos = targetSection.offsetTop + 100;
            if (scrollPos > triggerPos && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const isPercentage = counter.getAttribute('data-percent') === 'true';
                    let current = 0;
                    const step = target / 40;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.floor(current) + (isPercentage ? '%' : '+');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = (target % 1 !== 0 ? target.toFixed(1) : target) + (isPercentage ? '%' : '+');
                        }
                    };
                    updateCounter();
                });
            }
        });
    }

    // 3. Automated Project Inquiry Form Mailto Dispatch
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name')?.value || 'Client';
            const email = document.getElementById('form-email')?.value || 'Not provided';
            const service = document.getElementById('form-service')?.value || 'CAD Modeling';
            const urgency = document.getElementById('form-urgency')?.value || 'Standard';
            const message = document.getElementById('form-message')?.value || 'None';

            const recipient = "info@apexmech.dev";
            const subject = encodeURIComponent(`Design RFQ: ${service} - ${name}`);
            const body = encodeURIComponent(
                `Full Name: ${name}\n` +
                `Corporate Email: ${email}\n` +
                `Selected Capability: ${service}\n` +
                `Urgency / Delivery: ${urgency}\n\n` +
                `Part Specifications & Scope:\n${message}\n\n` +
                `Dispatched via ApexMech Engineering Web Portal`
            );

            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        });
    }

    // 4. Automated Indian Festival Greeting System
    checkFestivalGreeting();
});

let animReqId = null;

function checkFestivalGreeting() {
    if (sessionStorage.getItem('dismissed_festival_banner') === 'true') {
        return;
    }

    const today = new Date();
    const currentYear = today.getFullYear();

    const fixedHolidays = [
        { name: "New Year's Day", icon: "✨", theme: "gold", month: 0, day: 1, msg: "Team ApexMech wishes you a prosperous, innovative, and successful New Year!" },
        { name: "Makar Sankranti & Pongal", icon: "🪁", theme: "harvest", month: 0, day: 14, msg: "Wishing you and your family abundant happiness, prosperity, and successful projects this Makar Sankranti!" },
        { name: "Republic Day", icon: "🇮🇳", theme: "tricolor", month: 0, day: 26, msg: "Saluting Indian engineering ingenuity, unity, and progress. Happy Republic Day!" },
        { name: "Telangana Formation Day", icon: "🏛️", theme: "gold", month: 5, day: 2, msg: "Happy Telangana Formation Day! Proud to engineer and innovate from Hyderabad." },
        { name: "Independence Day", icon: "🇮🇳", theme: "tricolor", month: 7, day: 15, msg: "Celebrating freedom, sovereign innovation, and engineering progress. Happy Independence Day!" },
        { name: "Gandhi Jayanti", icon: "👓", theme: "tricolor", month: 9, day: 2, msg: "Remembering the Father of the Nation and his eternal ideals of truth, peace, and simplicity." },
        { name: "Christmas Day", icon: "🎄", theme: "festive-red", month: 11, day: 25, msg: "Season's greetings! Wishing you a Merry Christmas and continuous success in the coming year." }
    ];

    const lunarHolidaysByYear = {
        2026: [
            { name: "Maha Shivaratri", icon: "🕉️", theme: "divine-blue", month: 1, day: 15, msg: "Wishing you peace, determination, and divine blessings on Maha Shivaratri." },
            { name: "Holi", icon: "🎨", theme: "holi-color", month: 2, day: 3, msg: "May your journey be filled with vibrant happiness, colors, and breakthroughs. Happy Holi!" },
            { name: "Ugadi", icon: "🌿", theme: "harvest", month: 2, day: 19, msg: "Wishing you a fruitful, joyful, and successful Telugu New Year! Happy Ugadi." },
            { name: "Eid-ul-Fitr", icon: "🌙", theme: "green", month: 2, day: 21, msg: "May this blessed occasion bring harmony, good health, and success. Eid Mubarak!" },
            { name: "Vinayaka Chavithi", icon: "🐘", theme: "harvest", month: 8, day: 14, msg: "May Lord Ganesha eliminate obstacles and illuminate your ventures with prosperity!" },
            { name: "Vijaya Dashami (Dussehra)", icon: "🏹", theme: "harvest", month: 9, day: 20, msg: "Celebrating the victory of excellence, wisdom, and truth. Happy Dussehra!" },
            { name: "Deepavali (Diwali)", icon: "🪔", theme: "diwali-glow", month: 10, day: 8, msg: "Wishing you and your family a luminous, sparkling, and prosperous Diwali! Warm greetings from ApexMech." }
        ],
        2027: [
            { name: "Maha Shivaratri", icon: "🕉️", theme: "divine-blue", month: 2, day: 6, msg: "Wishing you peace, determination, and divine blessings on Maha Shivaratri." },
            { name: "Holi", icon: "🎨", theme: "holi-color", month: 2, day: 22, msg: "May your journey be filled with vibrant happiness and colors. Happy Holi!" },
            { name: "Ugadi", icon: "🌿", theme: "harvest", month: 3, day: 7, msg: "Wishing you a bountiful, joyful, and successful Telugu New Year! Happy Ugadi." },
            { name: "Deepavali (Diwali)", icon: "🪔", theme: "diwali-glow", month: 9, day: 29, msg: "Wishing you and your family a luminous and prosperous Diwali! Warm wishes from ApexMech." }
        ]
    };

    const activeHolidays = [...fixedHolidays, ...(lunarHolidaysByYear[currentYear] || [])];
    const oneDayMS = 24 * 60 * 60 * 1000;

    for (const fest of activeHolidays) {
        const festDate = new Date(currentYear, fest.month, fest.day, 0, 0, 0);
        const diffDays = (today - festDate) / oneDayMS;

        if (diffDays >= -1.0 && diffDays <= 1.99) {
            setupFestiveTheme(fest);
            break;
        }
    }
}

function setupFestiveTheme(fest) {
    const banner = document.getElementById('festival-banner');
    const iconEl = document.getElementById('festival-icon');
    const titleEl = document.getElementById('festival-title');
    const msgEl = document.getElementById('festival-message');
    const bgEl = document.getElementById('festival-bg');

    if (!banner || !iconEl || !titleEl || !msgEl || !bgEl) return;

    iconEl.innerText = fest.icon;
    titleEl.innerText = `Happy ${fest.name}!`;
    msgEl.innerText = fest.msg;

    if (fest.theme === 'diwali-glow') {
        bgEl.className = "absolute inset-0 bg-gradient-to-br from-[#2a1303] via-[#1a0c02] to-[#0a0502] z-0";
        startFestiveAnimation('sparks');
    } else if (fest.theme === 'tricolor') {
        bgEl.className = "absolute inset-0 bg-gradient-to-br from-[#122214] via-[#0b111a] to-[#2b1604] z-0";
        startFestiveAnimation('confetti');
    } else {
        bgEl.className = "absolute inset-0 bg-gradient-to-br from-[#1a1208] via-[#0d1e38] to-[#040812] z-0";
        startFestiveAnimation('gold');
    }

    banner.classList.remove('hidden');
}

function startFestiveAnimation(animType) {
    const canvas = document.getElementById('festival-anim-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth || 340;
    canvas.height = canvas.parentElement.offsetHeight || 180;

    if (animReqId) cancelAnimationFrame(animReqId);

    const particles = [];
    const colors = animType === 'confetti'
        ? ['#ff9933', '#ffffff', '#138808', '#38bdf8']
        : ['#fbbf24', '#f59e0b', '#d97706', '#fff7ed'];

    for (let i = 0; i < 24; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.2 + 1,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: (Math.random() - 0.5) * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.6 + 0.3
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y -= p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        animReqId = requestAnimationFrame(render);
    }
    render();
}

function dismissFestivalBanner() {
    const banner = document.getElementById('festival-banner');
    if (banner) {
        banner.classList.add('hidden');
        sessionStorage.setItem('dismissed_festival_banner', 'true');
        if (animReqId) cancelAnimationFrame(animReqId);
    }
}