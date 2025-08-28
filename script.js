// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initLoadingScreen();
    initScrollEffects();
    initParallaxEffects();
    initWorkItemAnimations();
    initPixelEffects();
    initSmoothScrolling();
    initKeyboardNavigation();
});

// 加载屏幕动画
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.querySelector('.main-content');
    
    // 模拟加载时间
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.style.opacity = '1';
        
        // 完全移除加载屏幕
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }, 2000);
}

// 滚动效果
function initScrollEffects() {
    const sections = document.querySelectorAll('.content-section');
    const navbar = document.querySelector('.navbar');
    
    // 创建Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateWorkItems(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderRadius = '8px';
            navbar.style.padding = '10px';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderRadius = '0';
            navbar.style.padding = '0';
        }
    });
}

// 视差效果
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const pixelStars = document.querySelector('.pixel-stars');
    const pixelClouds = document.querySelector('.pixel-clouds');
    const floatingPixels = document.querySelector('.floating-pixels');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rate = scrollY * -0.5;
        const cloudRate = scrollY * -0.3;
        const pixelRate = scrollY * -0.1;
        
        if (pixelStars) {
            pixelStars.style.transform = `translateY(${rate}px)`;
        }
        
        if (pixelClouds) {
            pixelClouds.style.transform = `translateY(${cloudRate}px)`;
        }
        
        if (floatingPixels) {
            floatingPixels.style.transform = `translateY(${pixelRate}px)`;
        }
    });
}

// 作品项目动画
function initWorkItemAnimations() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach((item, index) => {
        // 鼠标悬停效果
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
            
            // 添加像素粒子效果
            createPixelParticles(item);
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击效果
        item.addEventListener('click', () => {
            item.style.animation = 'pixelPulse 0.3s ease-out';
            
            setTimeout(() => {
                item.style.animation = '';
            }, 300);
        });
    });
}

// 动画作品项目
function animateWorkItems(section) {
    const workItems = section.querySelectorAll('.work-item');
    
    workItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }, index * 200);
    });
}

// 创建像素粒子效果
function createPixelParticles(element) {
    const particleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-particle';
        
        // 随机位置和颜色
        const colors = ['#00ff41', '#ff6b6b', '#ffd93d', '#6bcf7f'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${randomColor};
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// 像素效果
function initPixelEffects() {
    // 添加粒子动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0);
            }
        }
        
        .animate-in {
            animation: sectionFadeIn 1s ease-out;
        }
        
        @keyframes sectionFadeIn {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .work-item {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
    
    // 鼠标跟随像素效果
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        // 限制频率
        if (Math.random() > 0.7) {
            createMousePixel(e.clientX, e.clientY);
        }
        
        // 更新鼠标轨迹
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
    });
}

// 创建鼠标像素
function createMousePixel(x, y) {
    const pixel = document.createElement('div');
    const colors = ['#00ff41', '#ff6b6b', '#ffd93d', '#6bcf7f'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    pixel.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: ${randomColor};
        pointer-events: none;
        z-index: 999;
        left: ${x}px;
        top: ${y}px;
        animation: mousePixelFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(pixel);
    
    setTimeout(() => {
        pixel.remove();
    }, 800);
}

// 平滑滚动
function initSmoothScrolling() {
    // 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('#favorite-works');
            if (firstSection) {
                firstSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // 添加鼠标像素淡出动画
    const style = document.createElement('style');
    style.textContent += `
        @keyframes mousePixelFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// 键盘导航
function initKeyboardNavigation() {
    const socialBtns = document.querySelectorAll('.social-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    // 为社交按钮添加键盘支持
    socialBtns.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
        
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
    });
    
    // 为作品项目添加键盘支持
    workItems.forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
        
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 按ESC键回到顶部
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 按空格键暂停/恢复动画
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            toggleAnimations();
        }
    });
}

// 切换动画状态
function toggleAnimations() {
    const body = document.body;
    const isAnimationPaused = body.classList.contains('animations-paused');
    
    if (isAnimationPaused) {
        body.classList.remove('animations-paused');
    } else {
        body.classList.add('animations-paused');
    }
    
    // 添加动画暂停样式
    if (!document.querySelector('#animation-pause-style')) {
        const style = document.createElement('style');
        style.id = 'animation-pause-style';
        style.textContent = `
            .animations-paused * {
                animation-play-state: paused !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化滚动事件
const optimizedScrollHandler = throttle(() => {
    // 滚动相关的性能敏感操作
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误报告逻辑
});

// 页面可见性API - 当页面不可见时暂停动画
document.addEventListener('visibilitychange', () => {
    const body = document.body;
    
    if (document.hidden) {
        body.classList.add('page-hidden');
    } else {
        body.classList.remove('page-hidden');
    }
});

// 添加页面隐藏时的样式
const visibilityStyle = document.createElement('style');
visibilityStyle.textContent = `
    .page-hidden * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(visibilityStyle);

// 控制台彩蛋
console.log('%c-273k PIXEL WEBSITE', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%c像素艺术家的个人网站 🎮', 'color: #ff6b6b; font-size: 14px;');
console.log('%c按ESC键回到顶部，按空格键暂停/恢复动画', 'color: #ffd93d; font-size: 12px;');