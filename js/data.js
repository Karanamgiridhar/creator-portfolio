/* ==========================================================================
   CENTRALIZED CREATOR DATA STORE
   All content, stats, projects, creators worked with, training packs, and team.
   ========================================================================== */

const CREATOR_DATA = {
    profile: {
        name: "GiriEditsZone",
        initials: "GEZ",
        title: "VIDEOGRAPHER / EDITOR / PHOTOGRAPHER / CREATOR",
        bio: "Creative Visual Storyteller & Educator with over 3 years of experience crafting high-impact commercial films, brand documentaries, viral short-form content, and precise editorial color grades. Specializing in positioning brands and creators at the forefront of modern visual culture.",
        philosophy: "We don't just record frames; we sculpt emotion, rhythm, and tension into unforgettable digital experiences.",
        location: "Worldwide / Remote",
        email: "giriunfiltered12345@gmail.com",
        phone: "+91 8328415457",
        backgroundCover: "assets/bg pic/DSC02661.webp",
        stats: [
            { id: "years",    label: "Years Experience",    value: 3,   suffix: "+" },
            { id: "projects", label: "Projects Delivered",  value: 500, suffix: "+" },
            { id: "brands",   label: "Brands & Clients",    value: 20,  suffix: "+" },
            { id: "students", label: "Students Mentored",   value: 50,  suffix: "+" },
            { id: "reach",    label: "Social Media Impressions",  value: "100K+", suffix: "+" }
        ]
    },

    showreel: {
        title: "2026 CREATIVE SHOWREEL",
        subtitle: "A compilation of commercial direction, editing, color grading, and visual storytelling.",
        duration: "02:15",
        poster: "assets/bg pic/hero-showcase.webp",
        videoUrl: "assets/works/commercial_videography/AGKC FUN EDIT.mp4"
    },

    /* ==========================================================================
       CREATORS I WORKED WITH (INSTAGRAM PROFILE CARDS - 5 CARDS DYNAMIC)
       ========================================================================== */
    creatorsWorkedWith: [
        {
            id: "creator-itisharita",
            username: "itisharita",
            name: "Harita Reddy",
            handle: "@itisharita",
            emoji: "✨",
            avatar: "assets/creators/itisharita.jpg",
            posts: "261",
            followers: "7.6K",
            followersExact: 7633,
            following: "21",
            instagramUrl: "https://www.instagram.com/itisharita?igsi=ajBsMXo2ZnpqaTJ2",
            niche: "Fashion & Aesthetics Storyteller",
            glowColor: "rgba(245, 158, 11, 0.45)"
        },
        {
            id: "creator-rainbowofmy_life",
            username: "rainbowofmy_life",
            name: "Meghana",
            handle: "@rainbowofmy_life",
            emoji: "🌈",
            avatar: "assets/creators/rainbowofmy_life.jpg",
            posts: "564",
            followers: "7.5K",
            followersExact: 7524,
            following: "606",
            instagramUrl: "https://www.instagram.com/rainbowofmy_life?igsi=aDlweTM4azNpeXlz",
            niche: "Travel & Cinematic Vlogger",
            glowColor: "rgba(234, 179, 8, 0.45)"
        },
        {
            id: "creator-teja_reddyyss",
            username: "teja_reddyyss",
            name: "Teja Reddy",
            handle: "@teja_reddyyss",
            emoji: "🏋️",
            avatar: "assets/creators/teja_reddyyss.jpg",
            posts: "495",
            followers: "25K",
            followersExact: 25000,
            following: "8",
            instagramUrl: "https://www.instagram.com/teja_reddyyss?igsi=NWV6ODZhY3BjZHc5",
            niche: "Fitness & Commercial Athlete",
            glowColor: "rgba(229, 184, 64, 0.45)"
        },
        {
            id: "creator-giri_editszone",
            username: "giri.editszone",
            name: "Karanam Giridhar Saikiran",
            handle: "@giri.editszone",
            emoji: "🎬",
            avatar: "assets/pic.webp",
            posts: "256",
            followers: "100K",
            followersExact: 100000,
            following: "535",
            instagramUrl: "https://www.instagram.com/giri.editszone?igsi=cHNrbjh5aWZ5eTFm&utm_source=qr",
            niche: "Videographer, Editor & Mentor",
            glowColor: "rgba(229, 184, 64, 0.55)"
        },
        {
            id: "creator-swathi_siara",
            username: "swathi_siara",
            name: "Swathi Siara",
            handle: "@swathi_siara",
            emoji: "📸",
            avatar: "assets/creators/swathi_siara.jpg",
            posts: "245",
            followers: "71K",
            followersExact: 71000,
            following: "727",
            instagramUrl: "https://www.instagram.com/swathi_siara?igsi=bWZnMjBmNTBqZWo2",
            niche: "Brand & Editorial Fashion",
            glowColor: "rgba(229, 184, 64, 0.4)"
        }
    ],

    /* ==========================================================================
       SERVICES OFFERED
       ========================================================================== */
    services: [
        {
            id: "commercial-films",
            title: "Commercial & Narrative Films",
            icon: "fa-solid fa-film",
            description: "High-end brand films, cinematic ads, product showcases, and mini-documentaries engineered to elevate brand perception.",
            features: ["Concept-to-delivery direction", "4K Cinema camera workflows", "Custom sound design & mixing", "Broadcast-quality master export"]
        },
        {
            id: "post-production",
            title: "Post-Production & Colour Grading",
            icon: "fa-solid fa-wand-magic-sparkles",
            description: "Precision color science in DaVinci Resolve, dynamic rhythm editing in Premiere Pro, VFX, and pacing optimization.",
            features: ["DaVinci ACES / Log grading", "Film emulation & grain texture", "Dynamic sound effects layer", "Multi-cam & podcast assembly"]
        },
        {
            id: "creator-content",
            title: "High-Retention Creator Content",
            icon: "fa-solid fa-bolt",
            description: "Short-form video assets engineered for maximum watch time, engagement, and viral algorithmic performance.",
            features: ["9:16 Vertical mastery", "Hook optimization & speed ramps", "Kinetic typography & SFX", "Content batching systems"]
        },
        {
            id: "influencer-collabs",
            title: "Influencer Collaborations",
            icon: "fa-solid fa-handshake",
            description: "End-to-end video production, creative visual direction, and editing tailored specifically for digital influencers.",
            features: ["Co-branded visual narratives", "High-conversion product showcases", "Tailored pacing & aesthetics", "Multi-platform cutdowns (Reels/Shorts/YT)"]
        },
        {
            id: "editorial-photography",
            title: "Editorial & Portrait Photography",
            icon: "fa-solid fa-camera",
            description: "Cinematic portraiture, commercial lookbooks, and high-fashion lifestyle imagery with distinctive atmospheric lighting.",
            features: ["Studio & location lighting", "High-end skin retouching", "Commercial licensing ready", "Fast turnaround for campaigns"]
        },
        {
            id: "creative-mentorship",
            title: "Creator Mentorship & Training",
            icon: "fa-solid fa-graduation-cap",
            description: "Cohort-based mentorship and structured digital courses empowering editors to monetize their visual craft.",
            features: ["Comprehensive Curriculum", "Hands-on project reviews", "Exclusive asset packs & LUTs", "Direct industry coaching"]
        }
    ],

    /* ==========================================================================
       TECHNICAL SKILLS (11 EXACT CORE TOOLS)
       ========================================================================== */
    skills: [
        { name: "CapCut", category: "Mobile & Desktop Editing", iconClass: "fa-solid fa-scissors", color: "#00F0FF" },
        { name: "Premiere Pro", category: "Adobe Creative Suite", icon: "Pr", color: "#9999FF" },
        { name: "DaVinci Resolve", category: "Blackmagic Design", icon: "Dv", color: "#FF6B6B" },
        { name: "After Effects", category: "Motion Graphics & VFX", icon: "Ae", color: "#D291FF" },
        { name: "Photoshop", category: "Raster Design & Retouch", icon: "Ps", color: "#31A8FF" },
        { name: "Lightroom", category: "Color & RAW Processing", icon: "Lr", color: "#31A8FF" },
        { name: "Cinematography", category: "Camera Direction & Lighting", iconClass: "fa-solid fa-video", color: "#E5B840" },
        { name: "Color Grading", category: "ACES & Log Color Science", iconClass: "fa-solid fa-sliders", color: "#F59E0B" },
        { name: "Motion Graphics", category: "Kinetic Titles & Animation", iconClass: "fa-solid fa-bezier-curve", color: "#A855F7" },
        { name: "Storytelling", category: "Narrative Arc & Pacing", iconClass: "fa-solid fa-book-open", color: "#10B981" },
        { name: "Photography", category: "Editorial & Portrait Frames", iconClass: "fa-solid fa-camera-retro", color: "#EC4899" }
    ],

    /* ==========================================================================
       PORTFOLIO / WORK
       Filter tags: 'commercial', 'editing', 'thumbnails', 'photos'
       ========================================================================== */
    portfolio: [
        /* --------------------------------------------------------------------------
           1. COMMERCIAL VIDEOGRAPHY (8 VIDEOS)
           -------------------------------------------------------------------------- */
        {
            id: "proj-comm-1",
            title: "0302 Commercial Feature",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "9/16",
            year: "2025",
            client: "Commercial Showcase",
            role: "Videographer & Director",
            tools: ["Cinema Line", "DaVinci Resolve", "Sound Design"],
            videoUrl: "assets/works/commercial_videography/0302 (1)(1).mp4",
            poster: "assets/works/covers/proj-comm-1_0302__1__1.webp",
            fallbackVideo: "assets/reviews/student1.mp4",
            description: "High-impact vertical commercial direction crafted with dynamic rhythm, cinematic lighting, and custom sound design."
        },
        {
            id: "proj-comm-2",
            title: "0725 Visual Direction",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "9/16",
            year: "2025",
            client: "Brand Campaign",
            role: "Cinematographer & Colorist",
            tools: ["DaVinci Resolve", "Cinema Optics"],
            videoUrl: "assets/works/commercial_videography/0725 (1)(1).mp4",
            poster: "assets/works/covers/proj-comm-2_0725__1__1.webp",
            fallbackVideo: "assets/reviews/student2.mp4",
            description: "Cinematic commercial reel designed for strong retention, atmospheric lighting, and emotional engagement."
        },
        {
            id: "proj-comm-3",
            title: "Cinematic Commercial Narrative",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "16/9",
            year: "2025",
            client: "Commercial Production",
            role: "Lead Cinematographer",
            tools: ["Full-Frame Cinema", "DaVinci Resolve", "Premiere Pro"],
            videoUrl: "assets/works/commercial_videography/aaaaaa.mp4",
            poster: "assets/works/covers/proj-comm-3_aaaaaa.webp",
            fallbackVideo: "assets/reviews/student3.mp4",
            description: "Widescreen 16:9 cinematic commercial film featuring rich tonal range, precision framing, and fluid visual storytelling."
        },
        {
            id: "proj-comm-4",
            title: "AGKC Brand Visual Story",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "9/16",
            year: "2025",
            client: "AGKC Production",
            role: "Director & Editor",
            tools: ["Cinema Line", "Premiere Pro"],
            videoUrl: "assets/works/commercial_videography/agkc 123.mp4",
            poster: "assets/works/covers/proj-comm-4_agkc_123.webp",
            fallbackVideo: "assets/reviews/student4.mp4",
            description: "Dynamic commercial vertical cut highlighting brand authenticity and high-energy motion."
        },
        {
            id: "proj-comm-5",
            title: "AGKC Fun Edit — Motion Cut",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "9/16",
            year: "2025",
            client: "AGKC Media",
            role: "Video Director",
            tools: ["Premiere Pro", "Sound Design"],
            videoUrl: "assets/works/commercial_videography/AGKC FUN EDIT.mp4",
            poster: "assets/works/covers/proj-comm-5_AGKC_FUN_EDIT.jpg",
            fallbackVideo: "assets/reviews/student5.mp4",
            description: "Energetic visual narrative filled with playful pacing, sound sync, and vibrant color grading."
        },
        {
            id: "proj-comm-6",
            title: "JP Commercial Narrative",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "9/16",
            year: "2025",
            client: "JP Showcase",
            role: "Cinematographer",
            tools: ["Sony Cinema", "DaVinci Resolve"],
            videoUrl: "assets/works/commercial_videography/JP.mp4",
            poster: "assets/works/covers/proj-comm-6_JP.webp",
            fallbackVideo: "assets/reviews/student2.mp4",
            description: "Engaging commercial reel blending personal connection with polished commercial color aesthetics."
        },
        {
            id: "proj-comm-7",
            title: "Train — Cinematic Motion Film",
            category: "Commercial Videography",
            filterTag: "commercial",
            aspectRatio: "16/9",
            year: "2025",
            client: "Travel & Narrative",
            role: "Lead Cinematographer",
            tools: ["Full-Frame Cinema", "Sound Design"],
            videoUrl: "assets/works/commercial_videography/train.mp4",
            poster: "assets/works/covers/proj-comm-7_train.webp",
            fallbackVideo: "assets/reviews/student3.mp4",
            description: "Atmospheric train journey visual poem captured with rich contrast, scenic motion, and evocative soundscape."
        },

        /* --------------------------------------------------------------------------
           2. VIDEO EDITING (11 VIDEOS)
           -------------------------------------------------------------------------- */
        {
            id: "proj-edit-1",
            title: "Editorial Cut 0130",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Originals Media",
            role: "Lead Editor",
            tools: ["Premiere Pro", "After Effects"],
            videoUrl: "assets/works/video_editing/0130.mp4",
            poster: "assets/works/covers/proj-edit-1_0130.webp",
            fallbackVideo: "assets/reviews/student1.mp4",
            description: "Precision rhythm cut engineered with seamless hook transitions and sharp audio sync."
        },
        {
            id: "proj-edit-2",
            title: "Creative Transition Edit",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Visual Studio",
            role: "Video Editor",
            tools: ["CapCut PC", "Premiere Pro"],
            videoUrl: "assets/works/video_editing/C3846FE3-8117-4CE8-B467-54620ABFCDEF.mp4",
            poster: "assets/works/covers/proj-edit-2_C3846FE3-8117-4CE8-B467-54620ABFCDEF.webp",
            fallbackVideo: "assets/reviews/student2.mp4",
            description: "Intricate visual match-cuts and motion pacing designed for maximum digital watch time."
        },
        {
            id: "proj-edit-3",
            title: "Visual Pacing & Narrative 0724",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Creator Series",
            role: "Editor & Motion Artist",
            tools: ["Premiere Pro", "DaVinci Resolve"],
            videoUrl: "assets/works/video_editing/Copy of 0724.mp4",
            poster: "assets/works/covers/proj-edit-3_Copy_of_0724.webp",
            fallbackVideo: "assets/reviews/student3.mp4",
            description: "High-retention storytelling episode balancing conversational flow with kinetic cutaways."
        },
        {
            id: "proj-edit-4",
            title: "Podcast & Talk Series — Ep 10",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Talk Series",
            role: "Lead Video Editor",
            tools: ["Premiere Pro", "CapCut PC", "Photoshop"],
            videoUrl: "assets/works/video_editing/Copy of E10.mp4",
            poster: "assets/works/covers/proj-edit-4_Copy_of_E10.webp",
            fallbackVideo: "assets/reviews/student4.mp4",
            description: "Multi-angle podcast edit with custom animated subtitles, sound design, and speaker punch-ins."
        },
        {
            id: "proj-edit-5",
            title: "Episode Series — Ep 14",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Digital Series",
            role: "Video Editor",
            tools: ["Premiere Pro", "Sound Design"],
            videoUrl: "assets/works/video_editing/Copy of ep-14.mp4",
            poster: "assets/works/covers/proj-edit-5_Copy_of_ep-14.webp",
            fallbackVideo: "assets/reviews/student5.mp4",
            description: "Fast-paced episode assembly focused on story tension and punchy comedic or dramatic delivery."
        },
        {
            id: "proj-edit-6",
            title: "Episode Series — Ep 15",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Digital Series",
            role: "Video Editor",
            tools: ["Premiere Pro", "DaVinci Resolve"],
            videoUrl: "assets/works/video_editing/Copy of ep-15.mp4",
            poster: "assets/works/covers/proj-edit-6_Copy_of_ep-15.webp",
            fallbackVideo: "assets/reviews/student1.mp4",
            description: "Nuanced narrative editing combining smooth transitions, crisp audio levels, and color harmony."
        },
        {
            id: "proj-edit-7",
            title: "Episode Series — Ep 16",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Digital Series",
            role: "Lead Video Editor",
            tools: ["Premiere Pro", "After Effects"],
            videoUrl: "assets/works/video_editing/Copy of epp-16.mp4",
            poster: "assets/works/covers/proj-edit-7_Copy_of_epp-16.webp",
            fallbackVideo: "assets/reviews/student2.mp4",
            description: "Polished climax episode edit featuring motion graphics, sound fx architecture, and pacing rhythm."
        },
        {
            id: "proj-edit-9",
            title: "Course Batch Masterclass",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "GiriEditsZone Academy",
            role: "Creator & Lead Editor",
            tools: ["CapCut", "Premiere Pro"],
            videoUrl: "assets/works/video_editing/COURSE-B2-V1.mp4",
            poster: "assets/works/covers/proj-edit-9_COURSE-B2-V1.webp",
            fallbackVideo: "assets/reviews/student4.mp4",
            description: "Intensive training curriculum promo highlighting step-by-step editing breakdowns and asset tools."
        },
        {
            id: "proj-edit-10",
            title: "Signature Channel Intro Animation",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "GEZ Originals",
            role: "Motion Graphics Designer",
            tools: ["After Effects", "Premiere Pro"],
            videoUrl: "assets/works/video_editing/INTRO.mp4",
            poster: "assets/works/covers/proj-edit-10_INTRO.webp",
            fallbackVideo: "assets/reviews/student5.mp4",
            description: "Sleek, brand-defining channel intro animation with kinetic typography and energetic sound design."
        },
        {
            id: "proj-edit-11",
            title: "SFX Design & Audio Layering",
            category: "Video Editing",
            filterTag: "editing",
            aspectRatio: "9/16",
            year: "2025",
            client: "Sound Architecture",
            role: "Audio & Video Editor",
            tools: ["Premiere Pro", "Audition", "Sound FX"],
            videoUrl: "assets/works/video_editing/sfx design.mp4",
            poster: "assets/works/covers/proj-edit-11_sfx_design.webp",
            fallbackVideo: "assets/reviews/student1.mp4",
            description: "A masterclass in layered sound design, whooshes, risers, and impact hits synchronized to the cut."
        },

        /* --------------------------------------------------------------------------
           3. THUMBNAILS & GRAPHIC DESIGN (REPLACES VIRAL REELS — 6 THUMBNAILS)
           -------------------------------------------------------------------------- */
        {
            id: "proj-thumb-1",
            title: "Series High-CTR YouTube Thumbnail",
            category: "Thumbnail Design",
            filterTag: "thumbnails",
            aspectRatio: "16/9",
            year: "2025",
            client: "YouTube Creator Network",
            role: "Thumbnail Designer",
            tools: ["Photoshop", "Canva", "Lightroom"],
            poster: "assets/works/thumbnails/7E157648-7963-4F98-AF66-AFDB5F96385C (1).webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "High-contrast, click-optimized 16:9 YouTube thumbnail engineered with compelling facial expression and bold typography."
        },
        {
            id: "proj-thumb-2",
            title: "Instagram Account Recovery Guide",
            category: "Thumbnail Design",
            filterTag: "thumbnails",
            aspectRatio: "16/9",
            year: "2025",
            client: "Tech & Social Explainer",
            role: "Graphic Designer",
            tools: ["Photoshop", "Canva"],
            poster: "assets/works/thumbnails/Instagram rerecovery.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Viral 16:9 thumbnail design for technical troubleshooting, utilizing authoritative visual hierarchy and high clarity."
        },
        {
            id: "proj-thumb-3",
            title: "The Beauty of Tirumala — Poster",
            category: "Graphic Design",
            filterTag: "thumbnails",
            aspectRatio: "4/5",
            year: "2025",
            client: "Cultural & Travel Campaign",
            role: "Visual Artist",
            tools: ["Photoshop", "Canva", "Lightroom"],
            poster: "assets/works/thumbnails/the beauty of tirumala.webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "Atmospheric 4:5 vertical poster design capturing spiritual aura, heritage architecture, and divine color palettes."
        },
        {
            id: "proj-thumb-4",
            title: "Visual Storytelling Poster",
            category: "Graphic Design",
            filterTag: "thumbnails",
            aspectRatio: "4/5",
            year: "2025",
            client: "Creative Series",
            role: "Poster Designer",
            tools: ["Canva", "Photoshop"],
            poster: "assets/works/photography/Untitled design (2).webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Clean aesthetic poster layout featuring modern serif typography, balanced negative space, and evocative imagery."
        },
        {
            id: "proj-thumb-5",
            title: "Creative Brand Aesthetic Poster",
            category: "Graphic Design",
            filterTag: "thumbnails",
            aspectRatio: "4/5",
            year: "2025",
            client: "Brand Lookbook",
            role: "Graphic Designer",
            tools: ["Canva", "Photoshop"],
            poster: "assets/works/photography/Untitled design.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Contemporary 4:5 graphic design crafted for social feed resonance, brand elevation, and visual harmony."
        },
        {
            id: "proj-thumb-6",
            title: "Mana Episode Cover Artwork",
            category: "Thumbnail Design",
            filterTag: "thumbnails",
            aspectRatio: "16/9",
            year: "2025",
            client: "Originals Production",
            role: "Lead Designer",
            tools: ["Photoshop", "Canva"],
            poster: "assets/works/thumbnails/మన (1).webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "Vibrant regional Telugu YouTube thumbnail engineered for high click-through rates and emotional intrigue."
        },

        /* --------------------------------------------------------------------------
           4. PHOTOGRAPHY & LOOKBOOKS (16 PHOTOS: 11 LANDSCAPE 3:2, 5 PORTRAIT 4:5)
           -------------------------------------------------------------------------- */
        {
            id: "proj-photo-1",
            title: "Traditional Wedding Editorial — 0G5A4021",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Editorial Lookbook",
            role: "Lead Photographer & Colorist",
            tools: ["Sony Full-Frame", "Prime Lens", "Lightroom"],
            poster: "assets/works/photography/0G5A4021.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "High-resolution 3:2 landscape portrait capturing subtle natural lighting, textured shadows, and skin tones."
        },
        {
            id: "proj-photo-12",
            title: "Siara Lookbook — DSC02129",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "4/5",
            year: "2025",
            client: "Siara Studio",
            role: "Photographer & Colorist",
            tools: ["Sony Cinema Line", "Lightroom"],
            poster: "assets/works/photography/DSC02129.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "4:5 vertical fashion portraiture crafted with soft organic rim lighting and radiant skin tones."
        },
        {
            id: "proj-photo-13",
            title: "Siara Golden Glow — DSC02130",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "4/5",
            year: "2025",
            client: "Siara Studio",
            role: "Photographer & Retoucher",
            tools: ["Sony Cinema Line", "Lightroom"],
            poster: "assets/works/photography/DSC02130.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Warm-toned 4:5 editorial lookbook frame highlighting apparel textures and natural illumination."
        },
        {
            id: "proj-photo-14",
            title: "Siara Mood & Shadow — DSC02135",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "4/5",
            year: "2025",
            client: "Siara Studio",
            role: "Photographer",
            tools: ["Sony Cinema Line", "Lightroom"],
            poster: "assets/works/photography/DSC02135.webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "High-contrast editorial portrait capturing presence, depth, and expressive visual shadows."
        },
        {
            id: "proj-photo-15",
            title: "Siara Elegance — DSC02171",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "4/5",
            year: "2025",
            client: "Siara Studio",
            role: "Lead Photographer",
            tools: ["Full-Frame Cinema", "Lightroom"],
            poster: "assets/works/photography/DSC02171.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Distinctive portrait framing blending architectural background elements with soft subject lighting."
        },
        {
            id: "proj-photo-16",
            title: "Siara High-Fashion Stills — DSC02215",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "4/5",
            year: "2025",
            client: "Siara Studio",
            role: "Photographer & Retoucher",
            tools: ["Sony Cinema Line", "Lightroom", "Photoshop"],
            poster: "assets/works/photography/DSC02215.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Contemporary 4:5 fashion lookbook finale shot engineered with exquisite tonal balance."
        },
        {
            id: "proj-photo-2",
            title: "Cinematic Atmosphere — 0G5A5027",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Commercial Campaign",
            role: "Photographer",
            tools: ["Sony Full-Frame", "Lightroom"],
            poster: "assets/works/photography/0G5A5027.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Atmospheric editorial shot balancing gentle ambient lighting with sharp subject isolation."
        },
        {
            id: "proj-photo-3",
            title: "Golden Hour Mood — 0G5A5191",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Lifestyle Lookbook",
            role: "Photographer & Retoucher",
            tools: ["Sony Cinema Line", "Lightroom"],
            poster: "assets/works/photography/0G5A5191.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Warm-toned lifestyle portrait capturing genuine emotion and soft golden-hour backlight."
        },
        {
            id: "proj-photo-4",
            title: "Studio Retouch — 0G5A5903",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Brand Campaign",
            role: "Photographer",
            tools: ["Studio Strobes", "Photoshop", "Lightroom"],
            poster: "assets/works/photography/0G5A5903.webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "Studio portraiture with refined key lighting, crisp details, and polished high-end skin retouching."
        },
        {
            id: "proj-photo-5",
            title: "Artistic Expression — 0G5A6108",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Portrait Series",
            role: "Lead Photographer",
            tools: ["Sony Full-Frame", "Lightroom"],
            poster: "assets/works/photography/0G5A6108.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Intimate portrait frame emphasizing gaze, expression, and nuanced ambient tone."
        },
        {
            id: "proj-photo-6",
            title: "Depth & Contrast — 0G5A6110",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Editorial Lookbook",
            role: "Photographer",
            tools: ["Prime 85mm", "Lightroom"],
            poster: "assets/works/photography/0G5A6110.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Compelling bokeh separation and rich tonal depth capturing commercial-grade visual elegance."
        },
        {
            id: "proj-photo-7",
            title: "Commercial Stills — 0G5A6501",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Commercial Production",
            role: "Stills Photographer",
            tools: ["Full-Frame Cinema", "Lightroom"],
            poster: "assets/works/photography/0G5A6501.webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "Production still showcasing cinematic set dynamics, natural textures, and vibrant styling."
        },
        {
            id: "proj-photo-8",
            title: "Vibrant Presence — 0G5A6503",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Commercial Campaign",
            role: "Photographer",
            tools: ["Sony Cinema", "Lightroom"],
            poster: "assets/works/photography/0G5A6503.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Striking composition highlighting expressive motion and cinema-matched color calibration."
        },
        {
            id: "proj-photo-9",
            title: "Nuanced Form — 0G5A6522",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Editorial Fashion",
            role: "Photographer & Colorist",
            tools: ["Studio Lighting", "Lightroom"],
            poster: "assets/works/photography/0G5A6522.webp",
            fallbackPoster: "assets/bg pic/DSC02661.webp",
            description: "Fashion editorial stills shot with high dynamic range and subtle film-like highlights."
        },
        {
            id: "proj-photo-10",
            title: "Dynamic Gaze — 0G5A6524",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Fashion Campaign",
            role: "Photographer",
            tools: ["Prime Lens", "Lightroom"],
            poster: "assets/works/photography/0G5A6524.webp",
            fallbackPoster: "assets/bg pic/hero-showcase.webp",
            description: "Precision-focused fashion portrait combining delicate rim light and crisp facial textures."
        },
        {
            id: "proj-photo-11",
            title: "Editorial Climax — 0G5A6632",
            category: "Photography",
            filterTag: "photos",
            aspectRatio: "3/2",
            year: "2025",
            client: "Editorial Lookbook",
            role: "Lead Photographer",
            tools: ["Full-Frame Cinema", "Lightroom"],
            poster: "assets/works/photography/0G5A6632.webp",
            fallbackPoster: "assets/black tshirt/DSC06104.webp",
            description: "Grand editorial landscape still blending atmospheric environmental depth with character focus."
        }
    ],

    /* ==========================================================================
       TRAINING PACKS & COURSES
       ========================================================================== */
    trainingPacks: [
        {
            id: "pack-capcut-mobile",
            title: "CapCut Mobile Editing Course",
            shortDesc: "Master cinematic mobile editing — from speed ramping and beat sync to motion graphics, keyframe animation, and real client editing breakdowns.",
            fullDesc: "A comprehensive CapCut Mobile course covering everything from basic editing to professional-grade cinematic reels. Pre-recorded classes so you can learn at your own pace, with editing assets and resources included.",
            price: "₹1,699",
            priceNote: "Complete Self-Paced Masterclass",
            level: "Beginner to Advanced",
            format: "Pre-recorded Classes",
            duration: "Self-Paced",
            startDate: "Instant Access",
            status: "open",
            image: "assets/courses/capcut mobile.webp",
            features: [
                "Pre-recorded classes — learn at your pace",
                "Editing Assets & Resources included",
                "Real Client Editing Breakdowns"
            ],
            modules: [
                "Complete CapCut Mobile Editing",
                "Cinematic Reel Editing",
                "Speed Ramping & Velocity Editing",
                "Motion Graphics & Keyframe Animation",
                "Advanced Speed Editing",
                "Beat Sync & Smooth Transitions",
                "Professional Effects & Creative Editing",
                "Real Client Editing Breakdowns",
                "Editing Assets & Resources"
            ]
        },
        {
            id: "pack-capcut-pc",
            title: "CapCut PC Course",
            shortDesc: "Beginner to intermediate CapCut PC editing — installation, interface, keyframes, speed ramping, colour adjustments, export quality, and real editing workflow.",
            fullDesc: "A structured 30-day live Zoom program (extendable to 40 days) that takes total beginners through every aspect of CapCut PC editing. 1–2 hours of live class daily, dedicated WhatsApp support, recordings for missed sessions, plus 1 week of Canva training and 1 week of Content Creation & Instagram Growth training.",
            price: "₹2,499",
            priceNote: "All-inclusive — Canva & Content Creation weeks included",
            level: "Beginner to Intermediate",
            format: "Live Zoom Classes",
            duration: "30 Days (Extendable to 40 Days)",
            startDate: "Upcoming Batch",
            status: "open",
            image: "assets/courses/capcut pc.webp",
            features: [
                "Live Zoom — ~1–2 hours/day",
                "Class recordings for missed sessions",
                "Dedicated WhatsApp support group",
                "Assignments & doubt clearing sessions",
                "1 week Canva Training included",
                "1 week Content Creation & Instagram Growth included",
                "Free Editing Assets",
                "Practical projects & assignments",
                "30 days (extendable to 40 days)"
            ],
            modules: [
                "Beginner to Intermediate CapCut PC Editing",
                "Installation, Interface & Tool Overview",
                "Basic Cuts, Trimming & Video Structuring",
                "Keyframes, Speed Ramping & Motion",
                "Effects, Smooth Transitions & Masking",
                "Colour Adjustments & Cinematic LUTs",
                "Audio Sync, Sound Design & SFX",
                "Export Quality & Aspect Ratio Optimization",
                "Real-Time Editing Workflow",
                "Complete Project Workflows"
            ]
        },
        {
            id: "pack-canva-design",
            title: "Complete Canva Design Course",
            shortDesc: "Comprehensive graphic design with Canva — YouTube thumbnails, Instagram carousels, posters, banners, brand kits, typography, and professional layouts.",
            fullDesc: "Master Canva from the ground up. Learn how to create eye-catching YouTube thumbnails, engaging Instagram carousels, professional flyers, posters, brand kits, typography hierarchies, and video templates that convert viewers into followers.",
            price: "₹1,199",
            priceNote: "Full Graphic & Thumbnail Design Mastery",
            level: "Beginner to Advanced",
            format: "Self-Paced",
            duration: "Lifetime Access",
            startDate: "Instant Access",
            status: "open",
            image: "assets/courses/complete canva.webp",
            features: [
                "Canva Interface & Essential Tools",
                "Viral YouTube Thumbnails & Posters",
                "Instagram Carousels & Reels Templates",
                "Typography, Color Theory & Brand Kits"
            ],
            modules: [
                "Canva Interface, Tools & Shortcuts",
                "High-CTR YouTube Thumbnail Design",
                "Instagram Carousels & Post Graphics",
                "Posters, Banners & Flyer Creation",
                "Brand Kits, Typography & Color Palette",
                "Basic Animation & Video Editing in Canva",
                "Export Formats, Quality & Design Monetization"
            ]
        },
        {
            id: "pack-content-creation",
            title: "Content Creation & Instagram Growth Masterclass",
            shortDesc: "End-to-end creator roadmap — viral scripting, hook psychology, lighting, framing, growth strategies, brand deals, and monetization.",
            fullDesc: "Learn how to build a high-income personal brand from scratch. Covers viral hooks, content pillars, scriptwriting, budget-friendly lighting & camera setups, audio optimization, Instagram algorithm mechanics, audience engagement, and inbound brand sponsorships.",
            price: "₹599",
            priceNote: "Viral Hooks & Growth Blueprint",
            level: "All Levels",
            format: "Self-Paced / Masterclass",
            duration: "Lifetime Access",
            startDate: "Enrollment Open",
            status: "open",
            image: "assets/courses/content creation.webp",
            features: [
                "Viral Hooks & Scriptwriting Formulas",
                "Mobile & Camera Setup with Studio Lighting",
                "Instagram Algorithm & Growth Strategies",
                "Monetization, Brand Collaborations & Pricing"
            ],
            modules: [
                "Niche Selection & Target Audience Blueprint",
                "Viral Hook Psychology & Retention Scripting",
                "Budget Studio Setup — Lighting, Mic & Framing",
                "Camera Confidence & Screen Presence",
                "Instagram Algorithm, Reels Timing & SEO",
                "Community Building, DMs & Engagement Funnels",
                "Monetization: Client Inbound, Brand Deals & Rates"
            ]
        }
    ],

    /* ==========================================================================
       MEET MY TEAM
       ========================================================================== */
    team: [
        {
            id: "team-giri",
            name: "Giridhara Sai Kiran",
            role: "Founder, Head & Lead Editor / Visual Director",
            bio: "Over 3+ years directing high-impact visual narratives, commercial video edits, and masterclass training programs.",
            avatar: "assets/pic.webp",
            skills: ["Directing", "Editing", "Color Grading", "Mentorship"],
            instagram: "https://instagram.com/girieditszone",
            linkedin: "https://linkedin.com"
        },
        {
            id: "team-santhosh",
            name: "Santhosh Kumar",
            role: "Technical Head & Lead Developer",
            bio: "Architecting high-performance digital platforms, interactive web experiences, and scalable creator ecosystems.",
            avatar: "assets/santhosh.webp",
            skills: ["Fullstack Architecture", "UI/UX Engineering", "System Design", "Automation"],
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        },
        {
            id: "team-nagraj",
            name: "Nagraj",
            role: "Photographer & Videographer",
            bio: "Capturing cinematic frames, dynamic motion videography, and stunning commercial photography for brands and creators.",
            avatar: "assets/nagraj.webp",
            skills: ["Cinematography", "Commercial Photography", "Lighting Setup", "Visual Framing"],
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        }
    ],

    /* ==========================================================================
       STUDENT VIDEO REVIEWS (ASSETS/REVIEWS FOLDER)
       ========================================================================== */
    studentReviews: [
        {
            id: "review-1",
            name: "Student 1",
            video: "assets/reviews/student1.mp4",
            poster: "assets/reviews/student1_poster.jpg",
            tagline: "Practical learning // Real growth",
            course: "Mastered DaVinci Resolve & Premiere Pro",
            rating: 5
        },
        {
            id: "review-2",
            name: "Student 2",
            video: "assets/reviews/student2.mp4",
            poster: "assets/reviews/student2_poster.jpg",
            tagline: "Practical learning // Real growth",
            course: "From Beginner to Full-Time Editor",
            rating: 5
        },
        {
            id: "review-3",
            name: "Student 3",
            video: "assets/reviews/student3.mp4",
            poster: "assets/reviews/student3_poster.jpg",
            tagline: "Practical learning // Real growth",
            course: "Cinematic Storytelling & Color Grading",
            rating: 5
        },
        {
            id: "review-4",
            name: "Student 4",
            video: "assets/reviews/student4.mp4",
            poster: "assets/reviews/student4_poster.jpg",
            tagline: "Practical learning // Real growth",
            course: "Landed High-Ticket Brand Projects",
            rating: 5
        },
        {
            id: "review-5",
            name: "Student 5",
            video: "assets/reviews/student5.mp4",
            poster: "assets/reviews/student5_poster.jpg",
            tagline: "Practical learning // Real growth",
            course: "Sound Design & Advanced Motion Timing",
            rating: 5
        }
    ],

    testimonials: [
        {
            id: "t1",
            quote: "Giri's cohort transformed my entire editing rhythm. In 3 weeks I went from basic cuts to directing full commercial campaigns.",
            name: "Student 1",
            role: "Advanced Cohort Graduate",
            company: "Independent Creator",
            rating: 5,
            avatar: "assets/creators/itisharita.jpg"
        }
    ],

    /* ==========================================================================
       SOCIAL PLATFORMS
       ========================================================================== */
    socialPlatforms: [
        { platform: "Instagram", count: "@giri.editszone", url: "https://www.instagram.com/giri.editszone/", iconClass: "fa-brands fa-instagram" },
        { platform: "YouTube", count: "@GiriEditsZone", url: "https://www.youtube.com/@GiriEditsZone", iconClass: "fa-brands fa-youtube" },
        { platform: "LinkedIn", count: "Coming Soon", url: "#", idle: true, iconClass: "fa-brands fa-linkedin-in" },
        { platform: "Twitter / X", count: "Coming Soon", url: "#", idle: true, iconClass: "fa-brands fa-x-twitter" }
    ],

    socialContentGrid: [
        { title: "Commercial Storyboard Still", type: "Film Still", image: "assets/works/photography/DSC02129.webp" },
        { title: "DaVinci Resolve Node Graph", type: "Behind The Scenes", image: "assets/works/photography/DSC02130.webp" },
        { title: "Editorial Lighting Setup", type: "Production Still", image: "assets/works/photography/DSC02135.webp" },
        { title: "Creator Masterclass Session", type: "Training Recap", image: "assets/works/photography/DSC02171.webp" }
    ]
};
