// 共用脚本

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 分享页面功能
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: '隐迹的瑰宝：中华白海豚数字守护计划',
            text: '加入我们，一起守护中华白海豚！',
            url: window.location.href
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(function() {
            showNotification('链接已复制到剪贴板，请分享给你的朋友！', 'success');
        });
    }
}

// 通知函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full opacity-0`;
    
    // 根据类型设置样式
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    // 设置内容
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 页面加载时的动画
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏功能
    initNavigation();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化鼠标跟随效果
    initMouseFollow();
    
    // 初始化数字计数动画
    initCounterAnimations();
});

// 回到顶部按钮
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 导航栏功能初始化
function initNavigation() {
    // 移动端菜单功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换菜单图标
            const svg = this.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
                // 添加菜单显示动画
                navLinks.style.animation = 'slideIn 0.3s ease-out forwards';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                // 添加菜单隐藏动画
                navLinks.style.animation = 'slideOut 0.3s ease-in forwards';
            }
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const svg = mobileMenuBtn.querySelector('svg');
                    svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                    navLinks.style.animation = 'slideOut 0.3s ease-in forwards';
                }
            }
        });
    }
    
    // 当前页面高亮
    highlightCurrentPage();
    
    // 初始化返回按钮
    initBackButton();
}

// 当前页面高亮
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// 初始化返回按钮
function initBackButton() {
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.history.back();
        });
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-float, .animate-pulse');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// 初始化鼠标跟随效果
function initMouseFollow() {
    // 创建跟随元素
    const followCircle = document.createElement('div');
    followCircle.className = 'fixed w-8 h-8 rounded-full bg-blue-500 bg-opacity-20 pointer-events-none z-40 mix-blend-multiply';
    document.body.appendChild(followCircle);
    
    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        // 平滑跟随效果
        const x = e.clientX;
        const y = e.clientY;
        
        followCircle.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
        followCircle.style.transition = 'transform 0.1s ease-out';
    });
    
    // 鼠标离开窗口时隐藏
    document.addEventListener('mouseleave', () => {
        followCircle.style.opacity = '0';
    });
    
    // 鼠标进入窗口时显示
    document.addEventListener('mouseenter', () => {
        followCircle.style.opacity = '1';
    });
}

// 初始化数字计数动画
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 动画持续时间（毫秒）
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const value = Math.floor(progress * target);
                    
                    counter.textContent = value.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    // 显示/隐藏回到顶部按钮
    const scrollToTopBtn = document.querySelector('.floating-btn[onclick="scrollToTop()"]');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    }
});

// 移动端菜单
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-links');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .floating-btn[onclick="scrollToTop()"] {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);