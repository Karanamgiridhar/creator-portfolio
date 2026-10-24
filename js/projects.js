/* ==========================================================================
   PROJECTS ARCHIVES & DIRECTORIES — DEDICATED SCRIPT
   Handles category filtering, rich video container playback, photo lightboxes,
   theater mode, and mobile navbar parity with index.html.
   Strictly NO enquiry forms.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCategoryFromUrl();
    renderAllProjectSections();
    setupLightboxKeyboard();
});

// Current active category
let currentCategory = 'all';

// Photography gallery state for lightbox navigation
let photoGalleryList = [];
let currentPhotoIndex = 0;

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER (MATCHING INDEX.HTML)
   -------------------------------------------------------------------------- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    if (mobileBtn && drawer) {
        mobileBtn.addEventListener('click', () => {
            const open = drawer.classList.toggle('open');
            const icon = mobileBtn.querySelector('i');
            if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                const icon = mobileBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   2. CATEGORY SWITCHING & ROUTING
   -------------------------------------------------------------------------- */
function initCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && ['all', 'commercial', 'editing', 'thumbnails', 'photos'].includes(cat)) {
        currentCategory = cat;
    } else {
        currentCategory = 'all';
    }
    updateCategoryTabUI(currentCategory);
}

window.switchCategory = function (category, btn) {
    currentCategory = category;

    // Update URL without full page reload
    const newUrl = new URL(window.location);
    if (category === 'all') {
        newUrl.searchParams.delete('category');
    } else {
        newUrl.searchParams.set('category', category);
    }
    window.history.pushState({}, '', newUrl);

    updateCategoryTabUI(category);
};

function updateCategoryTabUI(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const sections = {
        commercial: document.getElementById('section-commercial'),
        editing: document.getElementById('section-editing'),
        thumbnails: document.getElementById('section-thumbnails'),
        photos: document.getElementById('section-photos')
    };

    if (category === 'all') {
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = 'block';
        });
    } else {
        Object.entries(sections).forEach(([key, sec]) => {
            if (sec) {
                if (key === category) {
                    sec.style.display = 'block';
                    setTimeout(() => {
                        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                } else {
                    sec.style.display = 'none';
                }
            }
        });
    }
}

/* --------------------------------------------------------------------------
   3. RENDER DEDICATED MEDIA CONTAINERS WITH ENQUIRY BUTTON
   -------------------------------------------------------------------------- */
function renderAllProjectSections() {
    const portfolio = (typeof CREATOR_DATA !== 'undefined' && CREATOR_DATA.portfolio) ? CREATOR_DATA.portfolio : [];

    // 1. Cinematic Videography & Commercial Films
    renderCommercialSection(portfolio.filter(p => p.filterTag === 'commercial'));

    // 2. Video Editing & Post-Production
    renderEditingSection(portfolio.filter(p => p.filterTag === 'editing'));

    // 3. Thumbnails & Graphic Design (Replaces Viral Reels)
    renderThumbnailsSection(portfolio.filter(p => p.filterTag === 'thumbnails'));

    // 4. Photography & Editorial Lookbooks
    renderPhotosSection(portfolio.filter(p => p.filterTag === 'photos'));
}

/* 1. Cinematic Videography — Dedicated Showcase Containers (Videos Only) */
function renderCommercialSection(items) {
    const container = document.getElementById('videography-grid');
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `<p style="text-align:center; color:var(--color-text-muted); padding: 40px 0;">No commercial films available.</p>`;
        return;
    }

    const widescreenItems = items.filter(p => p.aspectRatio === '16/9');
    const verticalItems = items.filter(p => p.aspectRatio !== '16/9');

    const renderCard = p => {
        const ratio = p.aspectRatio || '9/16';
        const isMov = p.videoUrl && p.videoUrl.endsWith('.mov');

        return `
        <div class="video-project-card card-ratio-${ratio.replace('/', '-')}" id="card-${p.id}">
            <div class="video-player-container" style="aspect-ratio: ${ratio};">
                <video id="video-${p.id}" controls playsinline preload="none" poster="${p.poster}" src="${p.videoUrl}#t=0.001">
                    <source src="${p.videoUrl}" type="${isMov ? 'video/quicktime' : 'video/mp4'}" />
                    ${isMov ? `<source src="${p.videoUrl}" type="video/mp4" />` : ''}
                </video>
            </div>
        </div>
        `;
    };

    let html = '';
    if (widescreenItems.length > 0) {
        html += `
        <div class="video-group-block">
            <div class="video-group-header">
                <span class="video-group-badge"><i class="fa-solid fa-film"></i> 16:9 CINEMATIC PRODUCTIONS</span>
                <span class="video-group-line"></span>
            </div>
            <div class="commercial-widescreen-grid">
                ${widescreenItems.map(renderCard).join('')}
            </div>
        </div>
        `;
    }

    if (verticalItems.length > 0) {
        html += `
        <div class="video-group-block" style="margin-top: 40px;">
            <div class="video-group-header">
                <span class="video-group-badge"><i class="fa-solid fa-mobile-screen"></i> 9:16 VERTICAL COMMERCIAL REELS</span>
                <span class="video-group-line"></span>
            </div>
            <div class="commercial-reels-grid">
                ${verticalItems.map(renderCard).join('')}
            </div>
        </div>
        `;
    }

    container.innerHTML = html;
    bindVideoAutoPause();
}

/* 2. Video Editing & Episodes — Dedicated Post-Production Containers (Videos Only) */
function renderEditingSection(items) {
    const container = document.getElementById('editing-grid');
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--color-text-muted); padding: 40px 0;">No editing projects available.</p>`;
        return;
    }

    container.innerHTML = items.map(p => {
        const ratio = p.aspectRatio || '9/16';
        const isMov = p.videoUrl && p.videoUrl.endsWith('.mov');

        return `
        <div class="video-project-card card-ratio-${ratio.replace('/', '-')}" id="card-${p.id}">
            <div class="video-player-container" style="aspect-ratio: ${ratio};">
                <video id="video-${p.id}" controls playsinline preload="none" poster="${p.poster}" src="${p.videoUrl}#t=0.001">
                    <source src="${p.videoUrl}" type="${isMov ? 'video/quicktime' : 'video/mp4'}" />
                    ${isMov ? `<source src="${p.videoUrl}" type="video/mp4" />` : ''}
                </video>
            </div>
        </div>
        `;
    }).join('');

    bindVideoAutoPause();
}

/* 3. Thumbnails & Graphic Design (Dedicated High-Res Containers) */
let thumbnailGalleryList = [];
function renderThumbnailsSection(items) {
    const container = document.getElementById('thumbnails-grid');
    if (!container) return;

    thumbnailGalleryList = items;

    if (!items.length) {
        container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--color-text-muted);">No thumbnails available.</p>`;
        return;
    }

    container.innerHTML = items.map((p, index) => {
        const fallbackPoster = p.fallbackPoster || 'assets/bg pic/hero-showcase.webp';
        const ratio = p.aspectRatio || '16/9';

        return `
        <div class="photo-gallery-card thumbnail-card card-ratio-${ratio.replace('/', '-')}" onclick="openPhotoLightbox(${index}, 'thumbnails')" tabindex="0" role="button" aria-label="View thumbnail ${p.title}">
            <div class="photo-media-container" style="aspect-ratio: ${ratio};">
                <img src="${p.poster}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPoster}';" />
                <div class="photo-overlay-actions">
                    <span class="photo-expand-btn"><i class="fa-solid fa-expand"></i></span>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

/* 4. Photography & Editorial Lookbooks — Lookbook Containers (Photos Only) */
function renderPhotosSection(items) {
    const container = document.getElementById('photos-lookbook-grid');
    if (!container) return;

    photoGalleryList = items;

    if (!items.length) {
        container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--color-text-muted);">No photography photos available.</p>`;
        return;
    }

    container.innerHTML = items.map((p, index) => {
        const fallbackPoster = p.fallbackPoster || 'assets/bg pic/DSC02661.webp';
        const ratio = p.aspectRatio || '3/2';

        return `
        <div class="photo-gallery-card card-ratio-${ratio.replace('/', '-')}" onclick="openPhotoLightbox(${index}, 'photos')" tabindex="0" role="button" aria-label="View photo ${p.title}">
            <div class="photo-media-container" style="aspect-ratio: ${ratio};">
                <img src="${p.poster}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPoster}';" />
                <div class="photo-overlay-actions">
                    <span class="photo-expand-btn"><i class="fa-solid fa-expand"></i></span>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

/* Helper to pause other videos when one starts playing */
function bindVideoAutoPause() {
    document.querySelectorAll('video').forEach(vid => {
        vid.onplay = () => {
            document.querySelectorAll('video').forEach(other => {
                if (other !== vid && !other.paused) {
                    other.pause();
                }
            });
        };
    });
}

/* --------------------------------------------------------------------------
   4. VIDEO PLAYBACK CONTROLLER
   -------------------------------------------------------------------------- */
window.toggleProjectVideo = function (projectId) {
    const video = document.getElementById(`video-${projectId}`);
    const card = document.getElementById(`card-${projectId}`);
    if (!video || !card) return;

    // Pause any other playing video across all project cards
    document.querySelectorAll('.video-project-card.playing').forEach(c => {
        if (c !== card) {
            const v = c.querySelector('video');
            if (v && !v.paused) v.pause();
            c.classList.remove('playing');
        }
    });

    if (video.paused) {
        video.play().then(() => {
            card.classList.add('playing');
        }).catch(() => {
            card.classList.remove('playing');
        });
    } else {
        video.pause();
        card.classList.remove('playing');
    }

    video.onended = () => {
        card.classList.remove('playing');
    };
};

window.handleVideoFallback = function (videoEl, fallbackVid, fallbackPoster) {
    videoEl.onerror = null;
    if (fallbackPoster) {
        videoEl.poster = fallbackPoster;
    }
    if (fallbackVid && videoEl.src !== fallbackVid) {
        videoEl.src = fallbackVid;
        videoEl.load();
    }
};

/* --------------------------------------------------------------------------
   5. THEATER VIDEO MODAL
   -------------------------------------------------------------------------- */
window.openTheaterMode = function (projectId) {
    const p = CREATOR_DATA.portfolio.find(x => x.id === projectId);
    if (!p) return;

    const modal = document.getElementById('theater-video-modal');
    const player = document.getElementById('theater-video-player');
    const title = document.getElementById('theater-title');
    const desc = document.getElementById('theater-desc');
    const meta = document.getElementById('theater-meta');

    if (!modal || !player) return;

    const vidSrc = p.videoUrl || p.fallbackVideo || 'assets/reviews/student1.mp4';
    player.src = vidSrc;
    player.poster = p.poster || '';
    if (title) title.textContent = p.title;
    if (desc) desc.textContent = p.description;
    if (meta) meta.textContent = `${p.client || 'Client'} · ${p.year} · ${(p.tools || []).join(' · ')}`;

    modal.classList.add('open');
    player.play().catch(() => {});
};

window.closeTheaterMode = function () {
    const modal = document.getElementById('theater-video-modal');
    const player = document.getElementById('theater-video-player');
    if (player) {
        player.pause();
        player.src = '';
    }
    if (modal) modal.classList.remove('open');
};

/* --------------------------------------------------------------------------
   6. FULLSCREEN PHOTO & THUMBNAIL LIGHTBOX
   -------------------------------------------------------------------------- */
let currentGalleryType = 'photos'; // 'photos' or 'thumbnails'

window.openPhotoLightbox = function (index, type = 'photos') {
    currentGalleryType = type;
    const list = type === 'thumbnails' ? thumbnailGalleryList : photoGalleryList;
    if (!list || !list[index]) return;
    currentPhotoIndex = index;

    const modal = document.getElementById('photo-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const meta = document.getElementById('lightbox-meta');

    if (!modal || !img) return;

    const item = list[index];
    const imgSrc = item.poster;
    const fallbackSrc = item.fallbackPoster || 'assets/bg pic/DSC02661.webp';

    img.onerror = function () {
        this.onerror = null;
        this.src = fallbackSrc;
    };
    img.src = imgSrc;
    img.alt = item.title;

    if (title) title.textContent = item.title;
    if (meta) meta.textContent = `${index + 1} of ${list.length} — ${item.title} · ${item.category}`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closePhotoLightbox = function () {
    const modal = document.getElementById('photo-lightbox-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
};

window.nextPhotoLightbox = function () {
    const list = currentGalleryType === 'thumbnails' ? thumbnailGalleryList : photoGalleryList;
    if (!list.length) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % list.length;
    openPhotoLightbox(currentPhotoIndex, currentGalleryType);
};

window.prevPhotoLightbox = function () {
    const list = currentGalleryType === 'thumbnails' ? thumbnailGalleryList : photoGalleryList;
    if (!list.length) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + list.length) % list.length;
    openPhotoLightbox(currentPhotoIndex, currentGalleryType);
};

function setupLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
        const photoModal = document.getElementById('photo-lightbox-modal');
        const theaterModal = document.getElementById('theater-video-modal');

        if (photoModal && photoModal.classList.contains('open')) {
            if (e.key === 'Escape') closePhotoLightbox();
            if (e.key === 'ArrowRight') nextPhotoLightbox();
            if (e.key === 'ArrowLeft') prevPhotoLightbox();
        }

        if (theaterModal && theaterModal.classList.contains('open')) {
            if (e.key === 'Escape') closeTheaterMode();
        }

        const clientModal = document.getElementById('client-modal');
        if (clientModal && clientModal.classList.contains('active')) {
            if (e.key === 'Escape') closeClientModal();
        }
    });
}

/* --------------------------------------------------------------------------
   7. CLIENT WORK MODAL & WHATSAPP INTEGRATION (+91 8328415457)
   -------------------------------------------------------------------------- */
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

window.closeClientModal = function () {
    const modal = document.getElementById('client-modal');
    if (modal) modal.classList.remove('active');
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
            <button class="modal-close-btn" onclick="closeClientModal()">&times;</button>
            <div style="text-align:center; padding:32px 12px;">
                <div style="width:72px; height:72px; border-radius:50%; background:rgba(37, 211, 102, 0.15); border:2px solid #25D366; color:#25D366; display:inline-flex; align-items:center; justify-content:center; font-size:2.4rem; margin-bottom:18px;">
                    <i class="fa-brands fa-whatsapp"></i>
                </div>
                <h3 style="font-family:var(--font-heading); font-size:1.85rem; font-weight:800; margin-bottom:12px; color:#fff;">
                    OPENING WHATSAPP...
                </h3>
                <p style="color:var(--color-text-muted); max-width:480px; margin:0 auto 20px auto; line-height:1.6; font-size:0.95rem;">
                    Your project enquiry details have been formatted and transferred to GiriEditsZone on WhatsApp (<strong style="color:var(--color-primary);">+91 8328415457</strong>). You can now discuss scope, timeline, and negotiations directly with Giri!
                </p>
                <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:20px;">
                    <a href="${waUrl}" target="_blank" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px;">
                        <i class="fa-brands fa-whatsapp"></i> LAUNCH WHATSAPP CHAT
                    </a>
                    <button class="btn-secondary" onclick="closeClientModal()">CLOSE</button>
                </div>
            </div>
        `;
    }
};

