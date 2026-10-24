/* ==========================================================================
   MAIN FRONTEND INTERACTIVE LOGIC & DYNAMIC RENDERER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initNavbar();
    renderHeroAndAbout();
    renderCreatorsWorkedWith();
    renderServices();
    renderSkills();
    renderPortfolio();
    renderTestimonials();
    renderTrainingPacks();
    renderTeam();
    renderSocialSection();
    initModals();
    initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. PRELOADER
   -------------------------------------------------------------------------- */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const counter = document.getElementById('preloader-counter');
    const subtitle = document.getElementById('preloader-subtitle');

    if (!preloader) return;

    let isReload = false;
    try {
        const navEntries = (window.performance && performance.getEntriesByType) ? performance.getEntriesByType('navigation') : [];
        if (navEntries.length > 0 && navEntries[0].type === 'reload') {
            isReload = true;
        } else if (window.performance && performance.navigation && performance.navigation.type === 1) {
            isReload = true;
        }
    } catch (e) {
        isReload = false;
    }

    if (window.location.hash) {
        if (preloader) {
            preloader.style.display = 'none';
            preloader.classList.add('loaded');
        }
        sessionStorage.setItem('gez_intro_played', 'true');
        setTimeout(() => {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
        return;
    }

    if (isReload) {
        // Page was explicitly reloaded: reset and show intro animation
        sessionStorage.removeItem('gez_intro_played');
        document.documentElement.classList.remove('no-preloader');
        preloader.style.display = 'flex';
        preloader.classList.remove('loaded');
    } else if (sessionStorage.getItem('gez_intro_played') === 'true') {
        // Redirecting / navigating back from another page: skip immediately
        preloader.style.display = 'none';
        preloader.classList.add('loaded');
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        preloader.classList.add('loaded');
        sessionStorage.setItem('gez_intro_played', 'true');
        return;
    }

    const duration = 6000; // Continuous 6.0 seconds animation on first entry
    const startTime = performance.now();

    function updateFrame(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.floor(progress * 100);

        if (bar) bar.style.width = (progress * 100) + '%';
        if (counter) counter.textContent = percent + '%';

        if (subtitle) {
            if (progress < 0.33) {
                subtitle.textContent = "INITIALIZING CINEMATIC ENGINE...";
            } else if (progress < 0.70) {
                subtitle.textContent = "LOADING 4K DIRECTORIES & SHOWCASE...";
            } else {
                subtitle.textContent = "WELCOME TO GIRIEDITSZONE";
            }
        }

        if (progress < 1) {
            requestAnimationFrame(updateFrame);
        } else {
            if (counter) counter.textContent = '100%';
            sessionStorage.setItem('gez_intro_played', 'true');
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 300);
        }
    }

    requestAnimationFrame(updateFrame);
}

/* --------------------------------------------------------------------------
   2. CUSTOM DUAL-RING CURSOR (desktop only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    if ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        dot.style.display = ring.style.display = 'none';
        return;
    }

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.45;
        ringY += (mouseY - ringY) * 0.45;
        ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(animateRing);
    })();

    const hoverSel = 'a,button,.brand-logo,.hero-showcase-container,.portfolio-card,.showreel-container,.filter-btn,.social-card,.training-card,.creator-card,.team-card';
    document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout',  e => { if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover'); });
}

/* --------------------------------------------------------------------------
   3. STICKY NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
    const navbar    = document.querySelector('.navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const drawer    = document.getElementById('mobile-drawer');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    if (mobileBtn && drawer) {
        mobileBtn.addEventListener('click', () => {
            const open = drawer.classList.toggle('open');
            const icon = mobileBtn.querySelector('i');
            if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => drawer.classList.remove('open'));
        });
    }

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 180) current = s.id; });
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    });
}

/* --------------------------------------------------------------------------
   4. RENDER HERO & ABOUT STATS
   -------------------------------------------------------------------------- */
function renderHeroAndAbout() {
    const p = CREATOR_DATA.profile;

    const nameEl = document.getElementById('hero-name');
    if (nameEl) nameEl.textContent = p.name;

    const bioEl = document.getElementById('about-bio');
    if (bioEl) bioEl.textContent = p.bio;

    const philEl = document.getElementById('about-philosophy');
    if (philEl) philEl.textContent = `"${p.philosophy}"`;

    const statsContainer = document.getElementById('stats-grid');
    if (statsContainer) {
        statsContainer.innerHTML = p.stats.map(s => `
            <div class="stat-card">
                <div class="stat-number" data-target="${s.value}" data-suffix="${s.suffix || ''}">${s.isStatic ? s.value : '0' + (s.suffix || '')}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');
        animateCounters();
    }
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(card => {
        const rawTarget = card.getAttribute('data-target') || '';
        const numMatch = rawTarget.match(/^(\d+)(.*)$/);
        if (!numMatch) {
            card.textContent = rawTarget;
            return;
        }

        const target = parseInt(numMatch[1], 10);
        const unitSuffix = numMatch[2] || card.getAttribute('data-suffix') || '+';

        if (isNaN(target)) {
            card.textContent = rawTarget;
            return;
        }

        let current = 0;
        const inc = Math.max(1, Math.ceil(target / 35));
        const timer = setInterval(() => {
            current = Math.min(current + inc, target);
            card.textContent = current + unitSuffix;
            if (current >= target) {
                card.textContent = target + unitSuffix;
                clearInterval(timer);
            }
        }, 30);
    });
}

/* --------------------------------------------------------------------------
   5. CREATORS I WORKED WITH — INSTAGRAM PROFILE CARDS CAROUSEL (LIFO ORDER)
   -------------------------------------------------------------------------- */
let currentCreatorIndex = 0;
let hasAnimatedCreatorStats = false;

function renderCreatorsWorkedWith() {
    const track = document.getElementById('creators-track');
    if (!track) return;

    function buildCardsHtml() {
        return CREATOR_DATA.creatorsWorkedWith.map(c => `
            <div class="creator-card" style="opacity: 1 !important; visibility: visible !important; transform: none !important; --card-glow:${c.glowColor || 'rgba(229,184,64,0.35)'};">
                <div class="creator-card-header">
                    <div class="creator-avatar-wrap">
                        <img id="avatar-img-${c.id}" src="${c.avatar}" alt="${c.name}" class="creator-avatar-img" loading="lazy" />
                    </div>
                    <div class="creator-info">
                        <a href="${c.instagramUrl}" target="_blank" rel="noopener" class="creator-username-link" title="Visit Instagram profile">
                            <span>${c.handle}</span>
                            <span>${c.emoji || ''}</span>
                            <i class="fa-brands fa-instagram" style="color:var(--color-primary);font-size:0.85rem;"></i>
                        </a>
                        <span class="creator-real-name">${c.name}</span>
                        <span class="creator-niche">${c.niche || 'Digital Creator'}</span>
                    </div>
                </div>

                <!-- 3 Dynamic Instagram Stats -->
                <div class="creator-stats-bar">
                    <div class="creator-stat-item">
                        <span class="creator-stat-val creator-counter" data-target="${c.posts}">${c.posts}</span>
                        <span class="creator-stat-lbl">Posts</span>
                    </div>
                    <div class="creator-stat-item">
                        <span class="creator-stat-val creator-counter" data-target="${c.followers}">${c.followers}</span>
                        <span class="creator-stat-lbl">Followers</span>
                    </div>
                    <div class="creator-stat-item">
                        <span class="creator-stat-val creator-counter" data-target="${c.following}">${c.following}</span>
                        <span class="creator-stat-lbl">Following</span>
                    </div>
                </div>

                <a href="${c.instagramUrl}" target="_blank" rel="noopener" class="creator-ig-btn">
                    <i class="fa-brands fa-instagram"></i> VIEW ON INSTAGRAM
                </a>
            </div>
        `).join('');
    }

    track.innerHTML = buildCardsHtml();
    updateCreatorsCarouselPosition();
    initCreatorStatsAnimation();
    startCreatorAutoPlay();
    setupCreatorsCarouselInteractions();

    // Dynamically sync with live fetched Instagram data if available
    fetch('assets/creators/creators_data.json')
        .then(res => {
            if (!res.ok) throw new Error('No json');
            return res.json();
        })
        .then(liveData => {
            let updated = false;
            CREATOR_DATA.creatorsWorkedWith.forEach(c => {
                if (c.username && liveData[c.username]) {
                    const l = liveData[c.username];
                    if (l.followers && l.followers !== c.followers) { c.followers = l.followers; updated = true; }
                    if (l.posts && l.posts !== c.posts) { c.posts = l.posts; updated = true; }
                    if (l.following && l.following !== c.following) { c.following = l.following; updated = true; }
                }
            });
            if (updated) {
                track.innerHTML = buildCardsHtml();
                updateCreatorsCarouselPosition();
                initCreatorStatsAnimation(true);
            }
        })
        .catch(() => {});
}

function initCreatorStatsAnimation(force = false) {
    if (hasAnimatedCreatorStats && !force) return;
    const counters = document.querySelectorAll('.creator-counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hasAnimatedCreatorStats = true;
                counters.forEach(el => animateCountUp(el));
                obs.disconnect();
            }
        });
    }, { threshold: 0.2 });

    const section = document.getElementById('creators');
    if (section) {
        observer.observe(section);
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimatedCreatorStats = true;
            counters.forEach(el => animateCountUp(el));
            observer.disconnect();
        }
    }
}

function animateCountUp(el) {
    const raw = el.getAttribute('data-target') || el.textContent.trim();
    const match = raw.match(/^([\d,\.]+)\s*([KkMmB%+]?)$/);
    if (!match) return;

    const numStr = match[1].replace(/,/g, '');
    const num = parseFloat(numStr);
    const suffix = match[2] || '';
    const hasComma = raw.includes(',');
    const hasDecimal = match[1].includes('.');
    const decimals = hasDecimal ? match[1].split('.')[1].length : 0;
    const duration = 1400;

    let start = null;
    function frame(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = ease * num;
        let formatted = hasDecimal ? current.toFixed(decimals) : Math.floor(current);
        if (hasComma) {
            formatted = Number(formatted).toLocaleString();
        }
        el.textContent = formatted + suffix;
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = raw;
        }
    }
    requestAnimationFrame(frame);
}

let creatorAutoPlayTimer = null;
let creatorsInteractionsSetup = false;

function startCreatorAutoPlay() {
    stopCreatorAutoPlay();
    creatorAutoPlayTimer = setInterval(() => {
        const visibleCount = getVisibleCreatorCardsCount();
        const maxIndex = Math.max(0, CREATOR_DATA.creatorsWorkedWith.length - visibleCount);
        if (currentCreatorIndex >= maxIndex) {
            currentCreatorIndex = 0;
        } else {
            currentCreatorIndex++;
        }
        updateCreatorsCarouselPosition();
    }, 3200);
}

function stopCreatorAutoPlay() {
    if (creatorAutoPlayTimer) {
        clearInterval(creatorAutoPlayTimer);
        creatorAutoPlayTimer = null;
    }
}

function setupCreatorsCarouselInteractions() {
    if (creatorsInteractionsSetup) return;
    creatorsInteractionsSetup = true;

    const wrap = document.querySelector('.creators-carousel-wrap');
    if (wrap) {
        wrap.addEventListener('mouseenter', stopCreatorAutoPlay);
        wrap.addEventListener('mouseleave', startCreatorAutoPlay);
    }

    const viewport = document.querySelector('.creators-track-viewport');
    if (viewport) {
        let startX = 0;
        viewport.addEventListener('touchstart', e => {
            if (e.touches && e.touches[0]) startX = e.touches[0].clientX;
            stopCreatorAutoPlay();
        }, { passive: true });
        viewport.addEventListener('touchend', e => {
            if (e.changedTouches && e.changedTouches[0]) {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 40) {
                    window.nextCreators();
                } else if (endX - startX > 40) {
                    window.prevCreators();
                }
            }
            startCreatorAutoPlay();
        }, { passive: true });
    }
}

function getVisibleCreatorCardsCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCreatorsCarouselPosition() {
    const track   = document.getElementById('creators-track');
    const prevBtn = document.getElementById('creator-prev-btn');
    const nextBtn = document.getElementById('creator-next-btn');
    if (!track) return;

    const visibleCount = getVisibleCreatorCardsCount();
    const maxIndex     = Math.max(0, CREATOR_DATA.creatorsWorkedWith.length - visibleCount);

    if (currentCreatorIndex > maxIndex) currentCreatorIndex = maxIndex;
    if (currentCreatorIndex < 0) currentCreatorIndex = 0;

    const card = track.querySelector('.creator-card');
    const gap = 24;
    const parentW = track.parentElement ? track.parentElement.offsetWidth : window.innerWidth;
    const fallbackWidth = (parentW - (visibleCount - 1) * gap) / visibleCount;
    const cardWidth = (card && card.offsetWidth > 0) ? card.offsetWidth : fallbackWidth;
    const offset = currentCreatorIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    // Keep both buttons active for continuous circular looping
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
}

window.nextCreators = function () {
    const visibleCount = getVisibleCreatorCardsCount();
    const maxIndex     = Math.max(0, CREATOR_DATA.creatorsWorkedWith.length - visibleCount);
    if (currentCreatorIndex < maxIndex) {
        currentCreatorIndex++;
    } else {
        currentCreatorIndex = 0;
    }
    updateCreatorsCarouselPosition();
    startCreatorAutoPlay();
};

window.prevCreators = function () {
    const visibleCount = getVisibleCreatorCardsCount();
    const maxIndex     = Math.max(0, CREATOR_DATA.creatorsWorkedWith.length - visibleCount);
    if (currentCreatorIndex > 0) {
        currentCreatorIndex--;
    } else {
        currentCreatorIndex = maxIndex;
    }
    updateCreatorsCarouselPosition();
    startCreatorAutoPlay();
};

window.addEventListener('resize', updateCreatorsCarouselPosition);

/* --------------------------------------------------------------------------
   6. SERVICES
   -------------------------------------------------------------------------- */
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = CREATOR_DATA.services.map(s => `
        <div class="service-card">
            <div class="service-icon"><i class="${s.icon}"></i></div>
            <h3 class="service-title">${s.title}</h3>
            <p style="font-size:0.9rem;color:var(--color-text-muted);line-height:1.6;">${s.description}</p>
            <ul class="service-list">${s.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   7. SKILLS VISUALIZATION (11 specified skills only)
   -------------------------------------------------------------------------- */
function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = CREATOR_DATA.skills.map(sk => {
        const col = sk.color || 'var(--color-primary)';
        const iconHtml = sk.iconClass
            ? `<i class="${sk.iconClass}" style="color:${col};font-size:1.25rem;"></i>`
            : `<span style="color:${col};font-weight:800;font-size:0.95rem;letter-spacing:-0.5px;">${sk.icon}</span>`;
        return `
            <div class="skill-card">
                <div class="skill-icon-badge" style="border-color:${col}55;background:${col}15;">${iconHtml}</div>
                <div class="skill-info">
                    <h4>${sk.name}</h4>
                    <p>${sk.category}</p>
                </div>
            </div>
        `;
    }).join('');
}

/* --------------------------------------------------------------------------
   8. PROJECTS I WORKED WITH — FOLDER DISPLAYING SECTION (REDIRECTS TO PROJECTS.HTML)
   When in "ALL COLLECTIONS", show 1 collection folder card from each section.
   Clicking any collection folder redirects to projects.html?category=...
   -------------------------------------------------------------------------- */
let activeFilter = 'all';

window.goToProjectsCategory = function (category) {
    window.location.href = `projects.html?category=${encodeURIComponent(category)}`;
};

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    if (activeFilter === 'all') {
        const directoryCards = [
            {
                tag: 'commercial',
                category: 'Commercial Videography',
                title: 'Cinematic Films & Brand Campaigns',
                count: CREATOR_DATA.portfolio.filter(p => p.filterTag === 'commercial').length,
                video: 'assets/works/commercial_videography/AGKC FUN EDIT.mp4',
                poster: 'assets/works/covers/proj-comm-5_AGKC_FUN_EDIT.jpg',
                tools: '4K Cinema · DaVinci Resolve · Lighting'
            },
            {
                tag: 'editing',
                category: 'Video Editing & VFX',
                title: 'High-Retention Cuts & Sound Architecture',
                count: CREATOR_DATA.portfolio.filter(p => p.filterTag === 'editing').length,
                video: 'assets/works/video_editing/0130.mp4',
                poster: 'assets/works/covers/proj-edit-1_0130.webp',
                tools: 'Premiere Pro · After Effects · Sound FX'
            },
            {
                tag: 'thumbnails',
                category: 'YouTube & Graphic Thumbnails',
                title: 'High-CTR Thumbnails & Visual Covers',
                count: CREATOR_DATA.portfolio.filter(p => p.filterTag === 'thumbnails').length,
                img: 'assets/works/thumbnails/7E157648-7963-4F98-AF66-AFDB5F96385C (1).webp',
                tools: 'Photoshop · Canva · Graphic Design'
            },
            {
                tag: 'photos',
                category: 'Editorial Photography',
                title: 'Commercial Lookbooks & Portraits',
                count: CREATOR_DATA.portfolio.filter(p => p.filterTag === 'photos').length,
                img: 'assets/works/covers/proj-photo-cover_wedding_siara.webp',
                fallbackImg: 'assets/works/photography/0G5A4021.webp',
                tools: 'Sony Full-Frame · Studio Lighting'
            }
        ];

        grid.innerHTML = directoryCards.map(d => `
        <div class="portfolio-card folder-card" onclick="goToProjectsCategory('${d.tag}')" tabindex="0" role="button" aria-label="Open ${d.category} directory">
            <div class="portfolio-media-wrap">
                ${d.video ? `
                    <video class="portfolio-thumb-video" autoplay loop muted playsinline preload="metadata" poster="${d.poster || ''}" src="${d.video}#t=0.001" style="width:100%;height:100%;object-fit:cover;display:block;"></video>
                ` : `
                    <img src="${d.img}" alt="${d.title}" class="portfolio-thumb" loading="lazy" onerror="this.onerror=null; if('${d.fallbackImg || ''}') this.src='${d.fallbackImg}';" />
                `}
                <div class="folder-badge-wrap">
                    <span class="folder-badge"><i class="fa-solid fa-folder-closed"></i> ${d.category}</span>
                    <span class="folder-count-badge">${d.count} Items</span>
                </div>
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${d.category}</span>
                    <h3 class="portfolio-title">${d.title}</h3>
                </div>
                <div class="folder-media-pill"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Directory</div>
            </div>
            <div class="folder-card-footer">
                <span class="folder-meta-tools">${d.tools}</span>
                <span class="folder-action-cta">EXPLORE FOLDER <i class="fa-solid fa-arrow-right"></i></span>
            </div>
        </div>
        `).join('');

        initScrollAnimations();
        return;
    }

    const filtered = CREATOR_DATA.portfolio.filter(p => p.filterTag === activeFilter);
    if (!filtered.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--color-text-muted);">No items found in this directory.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const ratio = p.aspectRatio || (p.videoUrl ? '9/16' : '16/9');
        const isMov = p.videoUrl && p.videoUrl.endsWith('.mov');

        if (p.videoUrl) {
            return `
            <div class="portfolio-card video-showcase-card card-ratio-${ratio.replace('/', '-')}" style="background:#070709;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.45);">
                <div style="aspect-ratio:${ratio}; width:100%; position:relative; background:#000; overflow:hidden; border-radius:15px;">
                    <video controls playsinline preload="metadata" poster="${p.poster}" src="${p.videoUrl}#t=0.001" style="width:100%;height:100%;object-fit:cover;background:#000;display:block;border-radius:15px;">
                        <source src="${p.videoUrl}" type="${isMov ? 'video/quicktime' : 'video/mp4'}" />
                        ${isMov ? `<source src="${p.videoUrl}" type="video/mp4" />` : ''}
                    </video>
                </div>
            </div>
            `;
        } else {
            return `
            <div class="portfolio-card photo-showcase-card" onclick="goToProjectsCategory('${p.filterTag}')" style="cursor:pointer;">
                <div class="portfolio-media-wrap" style="aspect-ratio:${ratio};">
                    <img src="${p.poster}" alt="${p.title}" class="portfolio-thumb" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />
                    <div class="portfolio-overlay">
                        <span class="portfolio-category">${p.category}</span>
                        <h3 class="portfolio-title">${p.title}</h3>
                    </div>
                </div>
                <div class="folder-card-footer">
                    <span class="folder-meta-tools">${p.tools ? p.tools.join(' · ') : 'Photography'}</span>
                    <span class="folder-action-cta">VIEW IN GALLERY <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </div>
            `;
        }
    }).join('');

    initScrollAnimations();
}

window.filterPortfolio = function (tag, btn) {
    activeFilter = tag;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderPortfolio();
};

/* --------------------------------------------------------------------------
   9. STUDENT VIDEO REVIEWS — CLICK TO PLAY ON/OFF & 0.25X CONTINUOUS MOVEMENT
   -------------------------------------------------------------------------- */
let reviewDirection = 1; // 1 = left to right, -1 = right to left
const reviewSpeed = 0.25; // 0.25x smooth cinematic speed
let isReviewPaused = false;
let currentReviewScroll = 0;
let isReviewLoopStarted = false;

function isAnyReviewVideoPlaying() {
    const playing = document.querySelector('.review-video:not([paused])');
    return !!(playing && !playing.paused);
}

function renderTestimonials() {
    const track = document.getElementById('reviews-track');
    const viewport = document.getElementById('reviews-viewport');
    if (!track || !viewport) return;

    function buildReviewCards(data) {
        // Render 2 sets for wide viewports so back-and-forth motion has ample travel distance
        const items = data.length < 8 ? [...data, ...data] : data;
        return items.map((r, idx) => `
            <div class="review-card" id="review-card-${r.id}-${idx}" onclick="toggleReviewPlay('${r.id}-${idx}')">
                <div class="review-media-wrap">
                    <video id="review-video-${r.id}-${idx}" class="review-video" playsinline preload="metadata" src="${r.video}"></video>
                    <img src="${r.poster}" alt="${r.name} Testimonial" class="review-poster-img" />
                </div>

                <div class="review-card-overlay">
                    <div class="review-header-badge">
                        <span>Student Testimonial</span>
                    </div>

                    <div class="review-play-center" aria-label="Toggle ${r.name} Review Playback">
                        <i class="fa-solid fa-play"></i>
                    </div>

                    <div class="review-footer-content">
                        <span class="review-growth-tag">Practical learning<br>Real growth</span>
                        <span class="review-student-lbl">${r.name}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const defaultReviews = CREATOR_DATA.studentReviews || [];
    track.innerHTML = buildReviewCards(defaultReviews);
    setupReviewListeners();

    // Check for updated manifest in assets/reviews/manifest.json
    fetch('assets/reviews/manifest.json')
        .then(res => {
            if (!res.ok) throw new Error('No manifest');
            return res.json();
        })
        .then(manifestData => {
            if (Array.isArray(manifestData) && manifestData.length > 0) {
                CREATOR_DATA.studentReviews = manifestData;
                track.innerHTML = buildReviewCards(manifestData);
                setupReviewListeners();
            }
        })
        .catch(() => {});

    // Start continuous 0.25x movement loop
    if (!isReviewLoopStarted) {
        isReviewLoopStarted = true;
        startContinuousReviewMovement(viewport);
    }
}

function setupReviewListeners() {
    document.querySelectorAll('.review-video').forEach(video => {
        video.addEventListener('ended', function () {
            const card = this.closest('.review-card');
            if (card) {
                card.classList.remove('playing');
                const icon = card.querySelector('.review-play-center i');
                if (icon) icon.className = 'fa-solid fa-play';
            }
            if (!isAnyReviewVideoPlaying()) {
                isReviewPaused = false;
            }
        });
    });
}

function startContinuousReviewMovement(viewport) {
    viewport.addEventListener('mouseenter', () => { isReviewPaused = true; });
    viewport.addEventListener('mouseleave', () => {
        if (!isAnyReviewVideoPlaying()) isReviewPaused = false;
    });

    viewport.addEventListener('touchstart', () => { isReviewPaused = true; }, { passive: true });
    viewport.addEventListener('touchend', () => {
        if (!isAnyReviewVideoPlaying()) isReviewPaused = false;
    }, { passive: true });

    function movementStep() {
        if (viewport && !isReviewPaused) {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            if (maxScroll > 10) {
                currentReviewScroll += reviewDirection * reviewSpeed;

                if (currentReviewScroll >= maxScroll) {
                    currentReviewScroll = maxScroll;
                    reviewDirection = -1; // Smoothly reverse: right to left!
                } else if (currentReviewScroll <= 0) {
                    currentReviewScroll = 0;
                    reviewDirection = 1; // Smoothly reverse: left to right!
                }

                viewport.scrollLeft = currentReviewScroll;
            }
        }
        requestAnimationFrame(movementStep);
    }

    requestAnimationFrame(movementStep);
}

window.toggleReviewPlay = function (cardKey) {
    const card = document.getElementById(`review-card-${cardKey}`);
    const video = document.getElementById(`review-video-${cardKey}`);
    if (!card || !video) return;

    const icon = card.querySelector('.review-play-center i');

    if (video.paused || video.ended) {
        // TURN ON: Pause any other video currently playing
        document.querySelectorAll('.review-video').forEach(otherVideo => {
            if (otherVideo !== video && !otherVideo.paused) {
                otherVideo.pause();
                const parentCard = otherVideo.closest('.review-card');
                if (parentCard) {
                    parentCard.classList.remove('playing');
                    const otherIcon = parentCard.querySelector('.review-play-center i');
                    if (otherIcon) otherIcon.className = 'fa-solid fa-play';
                }
            }
        });

        // Pause continuous movement while watching review video
        isReviewPaused = true;

        video.play().then(() => {
            card.classList.add('playing');
            if (icon) icon.className = 'fa-solid fa-pause';
        }).catch(() => {
            video.muted = true;
            video.play().then(() => {
                card.classList.add('playing');
                if (icon) icon.className = 'fa-solid fa-pause';
            }).catch(() => {});
        });
    } else {
        // TURN OFF: Pause video and resume movement
        video.pause();
        card.classList.remove('playing');
        if (icon) icon.className = 'fa-solid fa-play';
        if (!isAnyReviewVideoPlaying()) {
            isReviewPaused = false;
        }
    }
};

/* --------------------------------------------------------------------------
   10. TRAINING PACKS & COURSES — DEDICATED CURRICULUM
   -------------------------------------------------------------------------- */
function renderTrainingPacks() {
    const grid = document.getElementById('training-grid');
    if (!grid) return;

    grid.innerHTML = CREATOR_DATA.trainingPacks.map(pack => {
        const isLive = pack.format && pack.format.toLowerCase().includes('live');

        const featurePills = (pack.features || []).map(f => `
            <span class="training-feature-pill"><i class="fa-solid fa-check"></i>${f}</span>
        `).join('');

        const moduleItems = (pack.modules || []).map((m, i) => `
            <li>
                <span class="module-num">${String(i + 1).padStart(2, '0')}</span>
                <span>${m}</span>
            </li>
        `).join('');

        return `
            <div class="training-card">
                <div class="training-card-banner">
                    <img src="${pack.image}" alt="${pack.title}" loading="lazy" />
                    <span class="badge badge-gold" style="position:absolute;top:16px;right:16px;z-index:2;">ENROLLMENT OPEN</span>
                    <span class="training-format-badge ${isLive ? 'live' : ''}" style="position:absolute;bottom:16px;left:16px;z-index:2;">
                        <i class="fa-solid ${isLive ? 'fa-video' : 'fa-play-circle'}"></i>
                        ${pack.format}
                    </span>
                </div>

                <div class="training-card-body">
                    <div>
                        <h3 class="training-title">${pack.title}</h3>
                        <p class="training-desc" style="margin-top:8px;">${pack.shortDesc}</p>
                    </div>

                    <div class="training-features">${featurePills}</div>

                    <div>
                        <button class="module-toggle-btn" onclick="toggleModules(this)" aria-expanded="false">
                            <i class="fa-solid fa-list-ul"></i>
                            VIEW ${pack.modules.length} MODULES
                            <i class="fa-solid fa-chevron-down" style="margin-left:auto;font-size:0.65rem;"></i>
                        </button>
                        <ul class="module-list" style="margin-top:10px;">${moduleItems}</ul>
                    </div>

                    <div class="training-meta">
                        <span><i class="fa-regular fa-calendar" style="color:var(--color-primary);margin-right:5px;"></i>${pack.startDate}</span>
                        <span><i class="fa-regular fa-clock" style="color:var(--color-primary);margin-right:5px;"></i>${pack.duration}</span>
                    </div>

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;gap:12px;flex-wrap:wrap;">
                        <div>
                            <span class="training-price">${pack.price}</span>
                            ${pack.priceNote ? `<p style="font-size:0.75rem;color:var(--color-text-muted);margin-top:2px;">${pack.priceNote}</p>` : ''}
                        </div>
                        <button class="btn-primary" onclick="openTrainingEnquiryModal('${pack.id}')">ENROLL NOW</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.toggleModules = function (btn) {
    const list    = btn.nextElementSibling;
    const chevron = btn.querySelector('.fa-chevron-down');
    const isOpen  = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    const moduleCount = btn.textContent.match(/\d+/)?.[0] || '';
    btn.querySelector('.fa-list-ul').nextSibling.textContent = isOpen ? ` HIDE MODULES ` : ` VIEW ${moduleCount} MODULES `;
    if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : '';
};

/* --------------------------------------------------------------------------
   11. MEET MY TEAM SECTION (Giridhara Sai Kiran, Santhosh Kumar & Nagraj)
   -------------------------------------------------------------------------- */
function renderTeam() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = CREATOR_DATA.team.map(m => `
        <div class="team-card">
            <img src="${m.avatar}" alt="${m.name}" class="team-avatar" onerror="this.onerror=null; this.src=(this.src.includes('nagraj') ? 'assets/nagraj.peg' : 'assets/pic.webp');" />
            <div class="team-info">
                <span class="team-role">${m.role}</span>
                <h3 class="team-name">${m.name}</h3>
                <p class="team-bio">${m.bio}</p>
                <div class="team-skills">
                    ${m.skills.map(s => `<span class="team-skill-tag">${s}</span>`).join('')}
                </div>
                <div class="team-socials">
                    ${m.instagram ? `<a href="${m.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>` : ''}
                    ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   12. SOCIAL SECTION & CONTENT WALL
   -------------------------------------------------------------------------- */
function renderSocialSection() {
    const platformsGrid = document.getElementById('social-platforms-grid');
    if (platformsGrid) {
        platformsGrid.innerHTML = CREATOR_DATA.socialPlatforms.map(s => {
            const isIdle = !s.url || s.url === '#' || s.idle;
            return `
            <a href="${isIdle ? 'javascript:void(0)' : s.url}" ${isIdle ? 'style="opacity:0.6; cursor:default;"' : 'target="_blank" rel="noopener"'} class="social-card ${isIdle ? 'idle' : ''}">
                <i class="${s.iconClass || 'fa-solid fa-share-nodes'} social-icon"></i>
                <div>
                    <h4 style="font-family:var(--font-heading);font-weight:700;">${s.platform}</h4>
                    <p style="font-size:0.85rem;color:var(--color-text-muted);">${s.count}</p>
                </div>
            </a>
            `;
        }).join('');
    }

    const wallGrid = document.getElementById('social-wall-grid');
    if (wallGrid) {
        wallGrid.innerHTML = CREATOR_DATA.socialContentGrid.map(item => `
            <div class="social-wall-item">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="portfolio-overlay" style="padding:16px;">
                    <span class="portfolio-category">${item.type}</span>
                    <h4 style="font-size:0.9rem;font-weight:700;margin-top:4px;">${item.title}</h4>
                </div>
            </div>
        `).join('');
    }
}

/* --------------------------------------------------------------------------
   13. MODALS SYSTEM
   -------------------------------------------------------------------------- */
function initModals() {
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', e => { if (e.target === modal) closeAllModals(); });
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    const showreelVid = document.getElementById('showreel-modal-video');
    if (showreelVid) { showreelVid.pause(); showreelVid.src = ''; }
}

window.openProjectModal = function (projectId) {
    const proj    = CREATOR_DATA.portfolio.find(p => p.id === projectId);
    const modal   = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    if (!proj || !modal || !content) return;

    const mediaHtml = proj.videoUrl
        ? `<video src="${proj.videoUrl}" controls poster="${proj.poster}" style="width:100%;height:100%;object-fit:cover;background:#000;" preload="metadata" autoplay></video>`
        : `<img src="${proj.poster}" alt="${proj.title}" style="width:100%;height:100%;object-fit:cover;" />`;

    content.innerHTML = `
        <button class="modal-close-btn" onclick="closeAllModals()">&times;</button>
        <span class="badge badge-gold" style="margin-bottom:12px;">${proj.category}</span>
        <h2 style="font-family:var(--font-heading);size:2rem;font-weight:800;margin-bottom:16px;">${proj.title}</h2>

        <div style="aspect-ratio:16/9;width:100%;border-radius:var(--radius-md);overflow:hidden;margin-bottom:24px;border:1px solid var(--color-border);background:#000;">
            ${mediaHtml}
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;">
            <div>
                <h4 style="font-family:var(--font-heading);color:var(--color-primary);margin-bottom:8px;">PROJECT BRIEF</h4>
                <p style="color:var(--color-text-muted);line-height:1.7;">${proj.description}</p>
            </div>
            <div style="background:var(--color-surface-2);padding:20px;border-radius:var(--radius-md);border:1px solid var(--color-border);">
                ${[
                    ['Client',  proj.client],
                    ['Year',    proj.year],
                    ['Role',    proj.role],
                    ['Tools',   proj.tools.join(', ')]
                ].map(([label, val]) => `
                    <div style="margin-bottom:14px;">
                        <span style="font-size:0.72rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
                        <p style="font-weight:600;font-size:0.9rem;color:${label==='Tools' ? 'var(--color-primary)' : 'var(--color-text)'};">${val}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    modal.classList.add('active');
};

window.openShowreelModal = function () {
    const modal = document.getElementById('showreel-modal');
    const video = document.getElementById('showreel-modal-video');
    if (!modal || !video) return;
    video.src = CREATOR_DATA.showreel.videoUrl;
    modal.classList.add('active');
    video.play();
};

window.closeShowreelModal = function () {
    closeAllModals();
};

window.openTrainingEnquiryModal = function (packId) {
    const pack    = CREATOR_DATA.trainingPacks.find(p => p.id === packId);
    const modal   = document.getElementById('training-modal');
    const content = document.getElementById('training-modal-content');
    if (!pack || !modal || !content) return;

    content.innerHTML = `
        <button class="modal-close-btn" onclick="closeAllModals()">&times;</button>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;padding-right:32px;">
            <img src="${pack.image}" alt="${pack.title}" style="width:110px;height:66px;object-fit:cover;border-radius:var(--radius-md);border:1px solid var(--color-border);flex-shrink:0;" />
            <div>
                <span class="badge badge-gold" style="font-size:0.68rem;padding:3px 8px;margin-bottom:4px;display:inline-block;">ENROLLMENT OPEN</span>
                <h2 style="font-family:var(--font-heading);font-size:1.25rem;font-weight:800;line-height:1.25;margin:0 0 4px 0;">${pack.title}</h2>
                <p style="font-size:0.85rem;color:var(--color-primary);font-weight:700;margin:0;">Fee: ${pack.price} &nbsp;·&nbsp; <span style="color:var(--color-text-muted);font-weight:400;">${pack.duration}</span></p>
            </div>
        </div>
        <p style="font-size:0.86rem;color:var(--color-text-muted);margin-bottom:20px;">
            Fill out the form below to enquire about curriculum access, onboarding, and schedule details for this course.
        </p>

        <form id="training-enquiry-form" onsubmit="handleTrainingEnquirySubmit(event,'${pack.id}')">
            <input type="text" name="honeypot" style="display:none;" tabindex="-1" autocomplete="off" />

            <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" name="fullName" class="form-input" placeholder="Your full name" required />
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" name="email" class="form-input" placeholder="your@email.com" required />
                </div>
                <div class="form-group">
                    <label class="form-label">WhatsApp / Phone *</label>
                    <input type="tel" name="phone" class="form-input" placeholder="+91 XXXXX XXXXX" required />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Current Skill Level</label>
                <select name="skillLevel" class="form-select">
                    <option value="Beginner">Beginner (just starting out)</option>
                    <option value="Intermediate">Intermediate (basic editing done)</option>
                    <option value="Advanced">Advanced (professional focus)</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Your Goals / Questions</label>
                <textarea name="message" class="form-textarea" rows="3" placeholder="Tell us what you want to achieve or any questions you have..."></textarea>
            </div>

            <div class="form-group" style="margin-top:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" name="capacityConsent" required />
                    <span>I agree to receive course onboarding details, access links, and schedule via WhatsApp / Email.</span>
                </label>
            </div>

            <button type="submit" class="btn-primary" style="width:100%;margin-top:16px;">
                SUBMIT ENQUIRY & ENROLL
            </button>
        </form>
    `;
    modal.classList.add('active');
};

window.handleTrainingEnquirySubmit = async function (e, packId) {
    e.preventDefault();
    const form     = e.target;
    const formData = {
        fullName:        form.fullName.value,
        email:           form.email.value,
        phone:           form.phone.value,
        skillLevel:      form.skillLevel.value,
        message:         form.message.value,
        capacityConsent: form.capacityConsent.checked,
        honeypot:        form.honeypot.value,
        trainingPackId:  packId
    };

    const response = await TrainingService.submitEnquiry(formData);
    const content  = document.getElementById('training-modal-content');

    if (response.success) {
        const pack = CREATOR_DATA.trainingPacks.find(p => p.id === packId) || {};
        const waMsg = 
`*NEW COURSE ENQUIRY / ENROLLMENT*
*Course:* ${pack.title || 'Course'}
*Fee:* ${pack.price || ''}
*Full Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Skill Level:* ${formData.skillLevel}
*Goals / Notes:* ${formData.message || 'N/A'}`;

        const waUrl = `https://wa.me/918328415457?text=${encodeURIComponent(waMsg)}`;

        content.innerHTML = `
            <button class="modal-close-btn" onclick="closeAllModals()">&times;</button>
            <div style="text-align:center;padding:26px 10px;">
                <div style="width:64px;height:64px;border-radius:50%;background:rgba(34,197,94,0.15);color:#4ADE80;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:16px;">✓</div>
                <h3 style="font-family:var(--font-heading);font-size:1.8rem;font-weight:800;margin-bottom:12px;">
                    Enquiry Received!
                </h3>
                <p style="color:var(--color-text-muted);max-width:440px;margin:0 auto 20px auto;line-height:1.6;">${response.message}</p>
                <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
                    <a href="${waUrl}" target="_blank" class="btn-primary" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;padding:12px 24px;">
                        <i class="fa-brands fa-whatsapp" style="font-size:1.2rem;color:#25D366;"></i> CONNECT ON WHATSAPP
                    </a>
                    <button class="btn-secondary" onclick="closeAllModals()" style="font-size:0.85rem;padding:8px 18px;">CLOSE WINDOW</button>
                </div>
            </div>
        `;
        renderTrainingPacks();
    } else {
        alert(response.message);
    }
};

const WHATSAPP_TARGET_PHONE = '918328415457';

window.openClientModal = function (prefilledService) {
    const modal = document.getElementById('client-modal');
    if (!modal) return;

    if (prefilledService) {
        const select = modal.querySelector('select[name="projectType"]');
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].text.toLowerCase().includes(prefilledService.toLowerCase()) ||
                    select.options[i].value.toLowerCase().includes(prefilledService.toLowerCase())) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }
    }
    modal.classList.add('active');
};

window.handleClientEnquirySubmit = async function (e) {
    e.preventDefault();
    const form = e.target;

    const name = form.name ? form.name.value.trim() : '';
    const phone = form.phone ? form.phone.value.trim() : '';
    const email = form.email ? form.email.value.trim() : '';
    const projectType = form.projectType ? form.projectType.value : '';
    const budget = form.budget ? form.budget.value.trim() : '';
    const refLink = form.referenceLink ? form.referenceLink.value.trim() : '';
    const message = form.message ? form.message.value.trim() : '';

    // Construct professional project enquiry & negotiation WhatsApp message
    let waText = `🎬 *PROJECT ENQUIRY & NEGOTIATION — GiriEditsZone*\n\n`;
    waText += `👤 *Client / Brand Name:* ${name}\n`;
    waText += `📱 *Phone / WhatsApp:* ${phone}\n`;
    waText += `📧 *Email Address:* ${email}\n`;
    waText += `🎯 *Service Required:* ${projectType || 'Creative Production'}\n`;
    waText += `💰 *Budget Range:* ${budget || 'Flexible / To discuss'}\n\n`;

    if (refLink) {
        waText += `🔗 *Reference Video / Drive Link:*\n${refLink}\n\n`;
    }

    waText += `📝 *Project Scope & Requirements:*\n${message}\n\n`;
    waText += `⚡ _Sent via GiriEditsZone Portfolio_`;

    const waUrl = `https://wa.me/${WHATSAPP_TARGET_PHONE}?text=${encodeURIComponent(waText)}`;

    try {
        if (typeof ClientEnquiryService !== 'undefined') {
            await ClientEnquiryService.submitClientProject({
                name, phone, email, projectType, budget, message, refLink,
                photoCount: 0,
                honeypot: form.honeypot ? form.honeypot.value : ''
            });
        }
    } catch (err) {
        console.warn('Local client enquiry save:', err);
    }

    window.open(waUrl, '_blank');

    const content = document.getElementById('client-modal-content');
    if (content) {
        content.innerHTML = `
            <button class="modal-close-btn" onclick="closeAllModals()">&times;</button>
            <div style="text-align:center; padding:32px 12px;">
                <div style="width:72px; height:72px; border-radius:50%; background:rgba(37, 211, 102, 0.15); border:2px solid #25D366; color:#25D366; display:inline-flex; align-items:center; justify-content:center; font-size:2.4rem; margin-bottom:18px;">
                    <i class="fa-brands fa-whatsapp"></i>
                </div>
                <h3 style="font-family:var(--font-heading); font-size:1.85rem; font-weight:800; margin-bottom:12px; color:#fff;">
                    OPENING WHATSAPP...
                </h3>
                <p style="color:var(--color-text-muted); max-width:480px; margin:0 auto 20px auto; line-height:1.6; font-size:0.95rem;">
                    Your project enquiry details have been transferred to GiriEditsZone on WhatsApp (<strong style="color:var(--color-primary);">+91 8328415457</strong>). You can now discuss scope, timeline, and negotiations directly with Giri!
                </p>
                <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:20px;">
                    <a href="${waUrl}" target="_blank" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px;">
                        <i class="fa-brands fa-whatsapp"></i> LAUNCH WHATSAPP CHAT
                    </a>
                    <button class="btn-secondary" onclick="closeAllModals()">CLOSE</button>
                </div>
            </div>
        `;
    }
};

window.toggleAboutVideoAudio = function (btn) {
    const video = document.getElementById('about-portrait-video') || document.querySelector('.about-portrait');
    if (!video) return;
    video.muted = !video.muted;
    if (video.paused) {
        video.play().catch(() => {});
    }
    const icon = btn.querySelector('i');
    if (icon) {
        icon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    }
};

window.trigger404 = function () {
    const modal = document.getElementById('notfound-modal');
    if (modal) modal.classList.add('active');
};

/* --------------------------------------------------------------------------
   14. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-active');
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.service-card,.portfolio-card,.training-card,.stat-card,.skill-card,.social-card,.creator-card,.team-card').forEach(el => {
            observer.observe(el);
        });
    }
}
