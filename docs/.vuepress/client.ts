import { defineClientConfig } from '@vuepress/client'
import IconHome from './components/IconHome.vue'
import IconBook from './components/IconBook.vue'
import IconArticle from './components/IconArticle.vue'
import IconGift from './components/IconGift.vue'
import IconPen from './components/IconPen.vue'
import IconMessageBoard from './components/IconMessageBoard.vue'
import IconUser from './components/IconUser.vue'
import FriendshipLinks from './components/FriendshipLinks.vue'

// 性能优化工具函数
const utils = {
    // 防抖函数
    debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
        let timeout: ReturnType<typeof setTimeout> | null = null
        return function executedFunction(...args: Parameters<T>) {
            const later = () => {
                timeout = null
                func(...args)
            }
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    },
    
    // 节流函数
    throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
        let inThrottle: boolean
        return function executedFunction(...args: Parameters<T>) {
            if (!inThrottle) {
                func(...args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    },
    
    // 智能延迟执行（使用 requestIdleCallback 或 setTimeout）
    idleCallback(callback: () => void, timeout = 2000): void {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            requestIdleCallback(callback, { timeout })
        } else {
            setTimeout(callback, Math.min(timeout, 100))
        }
    },
    
    // 等待 DOM 就绪
    waitForDOM(callback: () => void, maxAttempts = 10, interval = 100): void {
        let attempts = 0
        const check = () => {
            attempts++
            if (document.readyState === 'complete' || attempts >= maxAttempts) {
                callback()
            } else {
                setTimeout(check, interval)
            }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback)
        } else {
            check()
        }
    }
}

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 注册图标组件
        app.component('IconHome', IconHome)
        app.component('IconBook', IconBook)
        app.component('IconArticle', IconArticle)
        app.component('IconGift', IconGift)
        app.component('IconPen', IconPen)
        app.component('IconMessageBoard', IconMessageBoard)
        app.component('IconUser', IconUser)
        // 注册友情链接组件
        app.component('FriendshipLinks', FriendshipLinks)
        // 添加搜索框快捷键提示
        if (typeof window !== 'undefined') {
            const addSearchShortcut = () => {
                const searchBox = document.querySelector('.navbar-search input, .search-box input, input[type="search"]');
                if (searchBox && !document.querySelector('.search-shortcut-hint')) {
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                    const shortcutKey = isMac ? '⌘ K' : 'Ctrl K';
                    
                    const hint = document.createElement('div');
                    hint.className = 'search-shortcut-hint';
                    hint.textContent = shortcutKey;
                    hint.style.cssText = `
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: rgba(0, 0, 0, 0.05);
                        color: #666;
                        padding: 2px 6px;
                        border-radius: 3px;
                        font-size: 11px;
                        font-weight: 600;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        pointer-events: none;
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        z-index: 10;
                        line-height: 1.3;
                        display: inline-flex;
                        align-items: center;
                        height: 20px;
                    `;
                    
                    const searchContainer = searchBox.parentElement;
                    if (searchContainer) {
                        searchContainer.style.position = 'relative';
                        searchContainer.appendChild(hint);
                        
                        // 调整输入框padding
                        (searchBox as HTMLInputElement).style.paddingRight = '65px';
                        
                        // 暗黑模式适配
                        const updateTheme = () => {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            if (isDark) {
                                hint.style.background = 'rgba(255, 255, 255, 0.1)';
                                hint.style.color = 'rgba(255, 255, 255, 0.6)';
                                hint.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            } else {
                                hint.style.background = 'rgba(0, 0, 0, 0.05)';
                                hint.style.color = '#666';
                                hint.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                            }
                        };
                        
                        updateTheme();
                        
                        // 监听主题变化
                        const observer = new MutationObserver(updateTheme);
                        observer.observe(document.documentElement, {
                            attributes: true,
                            attributeFilter: ['data-theme']
                        });
                    }
                }
            };
            
            // 优化：使用智能延迟执行，避免重复调用
            utils.waitForDOM(() => {
                utils.idleCallback(addSearchShortcut, 500)
            })
            
            // 添加搜索快捷键功能
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    const searchInput = document.querySelector<HTMLInputElement>('.navbar-search input, .search-box input, input[type="search"]');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            });
        }
        
        // 优化图片懒加载和 WebP 支持
        if (typeof window !== 'undefined') {
            // 检测 WebP 支持
            const supportsWebP = (): Promise<boolean> => {
                return new Promise((resolve) => {
                    const webP = new Image();
                    webP.onload = webP.onerror = () => {
                        resolve(webP.height === 2);
                    };
                    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
                });
            };
            
            const initImageLazyLoad = async () => {
                const webPSupported = await supportsWebP();
                
                // 为所有图片添加 loading="lazy" 属性（如果还没有）
                const allImages = document.querySelectorAll('img:not([loading])');
                allImages.forEach((img) => {
                    const imageElement = img as HTMLImageElement;
                    // 只对非关键图片启用懒加载（保留关键图片如 logo、avatar 立即加载）
                    if (!imageElement.src.includes('logo') && !imageElement.src.includes('avatar') && !imageElement.src.includes('favicon')) {
                        imageElement.loading = 'lazy';
                        // 保存原始 src 到 data-src
                        if (!imageElement.dataset.src) {
                            imageElement.dataset.src = imageElement.src;
                        }
                        
                        // 尝试使用 WebP 格式（如果支持）
                        if (webPSupported && !imageElement.src.includes('.webp')) {
                            const webpSrc = imageElement.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                            // 预加载 WebP 版本，如果失败则使用原图
                            const testImg = new Image();
                            testImg.onload = () => {
                                imageElement.src = webpSrc;
                                if (imageElement.dataset.src) {
                                    imageElement.dataset.src = webpSrc;
                                }
                            };
                            testImg.src = webpSrc;
                        }
                    }
                });

                // 使用 IntersectionObserver 实现懒加载
                if ('IntersectionObserver' in window) {
                    const imageObserver = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    const img = entry.target as HTMLImageElement;
                                    const dataSrc = img.dataset.src;
                                    
                                    // 如果图片有 data-src，说明需要懒加载
                                    if (dataSrc && img.src !== dataSrc) {
                                        // 创建新的 Image 对象预加载
                                        const imageLoader = new Image();
                                        imageLoader.onload = () => {
                                            img.src = dataSrc;
                                            img.classList.add('loaded');
                                        };
                                        imageLoader.onerror = () => {
                                            // 加载失败时也显示原图
                                            img.src = dataSrc;
                                            img.classList.add('loaded');
                                        };
                                        imageLoader.src = dataSrc;
                                    } else {
                                        // 没有 data-src，直接标记为已加载
                                        img.classList.add('loaded');
                                    }
                                    
                                    imageObserver.unobserve(img);
                                }
                            });
                        },
                        {
                            rootMargin: '50px', // 提前 50px 开始加载
                            threshold: 0.01
                        }
                    );

                    // 观察所有懒加载图片
                    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
                        imageObserver.observe(img);
                    });
                } else {
                    // 不支持 IntersectionObserver 的浏览器，直接加载所有图片
                    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
                        const imageElement = img as HTMLImageElement;
                        if (imageElement.dataset.src) {
                            imageElement.src = imageElement.dataset.src;
                        }
                        imageElement.classList.add('loaded');
                    });
                }
            };

            // 优化：使用防抖和智能延迟执行
            const debouncedImageLazyLoad = utils.debounce(initImageLazyLoad, 100)
            
            // DOMContentLoaded 时立即初始化
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    utils.idleCallback(initImageLazyLoad, 200)
                });
            } else {
                utils.idleCallback(initImageLazyLoad, 200)
            }

            // 路由变化后重新初始化（使用防抖）
            router.afterEach(() => {
                debouncedImageLazyLoad()
            });
            
            // 页面可见性变化时重新检查（用户切换标签页回来时）
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    setTimeout(initImageLazyLoad, 100);
                }
            });
            
            // 控制评论显示：只在留言板页面显示评论
            const toggleComments = () => {
                const currentPath = window.location.pathname;
                // 判断是否为留言板页面：路径包含 /guestbook/
                const isGuestbook = currentPath.includes('/guestbook/') || 
                                   currentPath === '/guestbook' ||
                                   currentPath.endsWith('/guestbook');
                
                // 查找评论容器（包括所有可能的 Waline 容器）
                const commentContainers = document.querySelectorAll(
                    '#waline, .waline-wrapper, .waline-container, [id*="waline"], [class*="waline-wrapper"], [class*="waline-container"]'
                );
                
                commentContainers.forEach((container) => {
                    const element = container as HTMLElement;
                    if (isGuestbook) {
                        element.style.display = '';
                        element.style.visibility = 'visible';
                    } else {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                });
                
                // 也检查父容器
                const pageContainers = document.querySelectorAll('.page, .theme-reco-content, .content__default');
                pageContainers.forEach((container) => {
                    const walineInContainer = container.querySelectorAll(
                        '#waline, .waline-wrapper, .waline-container'
                    );
                    walineInContainer.forEach((waline) => {
                        const element = waline as HTMLElement;
                        if (isGuestbook) {
                            element.style.display = '';
                            element.style.visibility = 'visible';
                        } else {
                            element.style.display = 'none';
                            element.style.visibility = 'hidden';
                        }
                    });
                });
            };
            
            // 隐藏留言板页面的目录
            const hideToc = () => {
                try {
                    const currentPath = window.location.pathname;
                    // 判断是否为留言板页面：路径包含 /guestbook/
                    const isGuestbook = currentPath.includes('/guestbook/') || 
                                       currentPath === '/guestbook' ||
                                       currentPath.endsWith('/guestbook');
                    
                    if (isGuestbook) {
                        // 查找所有可能的目录容器（使用更精确的选择器）
                        const tocSelectors = [
                            '.page-toc-wrapper',
                            '.page-catalog-container',
                            '.catalog-wrapper',
                            '.reco-toc',
                            '.page-catalog',
                            '.catalog-container',
                            '.right-sidebar',
                            '.page-right-sidebar',
                            '.toc-container',
                            '.table-of-contents',
                            '#toc'
                        ];
                        
                        tocSelectors.forEach(selector => {
                            try {
                                const elements = document.querySelectorAll(selector);
                                elements.forEach((element) => {
                                    if (element && element.parentElement) {
                                        const el = element as HTMLElement;
                                        el.style.display = 'none';
                                        el.style.visibility = 'hidden';
                                    }
                                });
                            } catch (e) {
                                // 忽略选择器错误
                            }
                        });
                    }
                } catch (e) {
                    // 忽略错误，避免影响页面渲染
                    console.warn('hideToc error:', e);
                }
            };

            // 调整留言板页面评论区域宽度，使其与信息栏对齐
            const adjustGuestbookWidth = () => {
                try {
                    const currentPath = window.location.pathname;
                    const isGuestbook = currentPath.includes('/guestbook/') || 
                                       currentPath === '/guestbook' ||
                                       currentPath.endsWith('/guestbook');
                    
                    if (isGuestbook) {
                        // 查找所有 Waline 容器及其父容器
                        const walineSelectors = [
                            '.waline-wrapper',
                            '#waline',
                            '.waline-container',
                            '.page .waline-wrapper',
                            '.content__default .waline-wrapper',
                            '.theme-reco-content .waline-wrapper'
                        ];
                        
                        walineSelectors.forEach(selector => {
                            try {
                                const elements = document.querySelectorAll(selector);
                                elements.forEach((element) => {
                                    const el = element as HTMLElement;
                                    // 使用 !important 通过 setProperty 设置
                                    el.style.setProperty('margin-left', '0', 'important');
                                    el.style.setProperty('margin-right', '0', 'important');
                                    el.style.setProperty('padding-left', '0', 'important');
                                    el.style.setProperty('padding-right', '0', 'important');
                                    el.style.setProperty('max-width', '100%', 'important');
                                    el.style.setProperty('width', '100%', 'important');
                                    el.style.setProperty('box-sizing', 'border-box', 'important');
                                    
                                    // 也处理内部容器
                                    const innerContainers = el.querySelectorAll('.waline, .waline-wrapper > div, .waline-container > div');
                                    innerContainers.forEach((innerEl) => {
                                        const inner = innerEl as HTMLElement;
                                        inner.style.setProperty('max-width', '100%', 'important');
                                        inner.style.setProperty('width', '100%', 'important');
                                    });
                                });
                            } catch (e) {
                                // 忽略选择器错误
                            }
                        });
                    }
                } catch (e) {
                    console.warn('adjustGuestbookWidth error:', e);
                }
            };
            
            // 优化：使用防抖和智能延迟执行，避免重复调用
            const debouncedToggleComments = utils.debounce(toggleComments, 150)
            const debouncedHideToc = utils.debounce(hideToc, 150)
            const debouncedAdjustGuestbookWidth = utils.debounce(adjustGuestbookWidth, 150)
            
            // 初始执行（使用智能延迟）
            utils.waitForDOM(() => {
                utils.idleCallback(() => {
                    debouncedToggleComments()
                    debouncedHideToc()
                    debouncedAdjustGuestbookWidth()
                }, 300)
            })
            
            // 路由变化后重新执行（使用防抖）
            router.afterEach(() => {
                debouncedToggleComments()
                debouncedHideToc()
                debouncedAdjustGuestbookWidth()
            });

            // 监听 DOM 变化，确保动态加载的内容也能应用样式
            if (typeof MutationObserver !== 'undefined') {
                const observer = new MutationObserver(() => {
                    const currentPath = window.location.pathname;
                    const isGuestbook = currentPath.includes('/guestbook/') || 
                                       currentPath === '/guestbook' ||
                                       currentPath.endsWith('/guestbook');
                    if (isGuestbook) {
                        adjustGuestbookWidth();
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }

            // 优化：使用 MutationObserver 替代轮询，性能更好
            const checkAndAdjust = () => {
                const currentPath = window.location.pathname;
                const isGuestbook = currentPath.includes('/guestbook/') || 
                                   currentPath === '/guestbook' ||
                                   currentPath.endsWith('/guestbook');
                if (isGuestbook) {
                    const hasWaline = document.querySelector('.waline-wrapper, #waline, .waline-container');
                    if (hasWaline) {
                        debouncedAdjustGuestbookWidth();
                        return true;
                    }
                }
                return false;
            };

            // 使用 MutationObserver 监听 DOM 变化，替代轮询
            if (typeof MutationObserver !== 'undefined') {
                const walineObserver = new MutationObserver(utils.debounce(() => {
                    checkAndAdjust()
                }, 200))
                
                walineObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                })
                
                // 设置超时，避免无限观察
                setTimeout(() => {
                    walineObserver.disconnect()
                }, 10000) // 10秒后停止观察
            }
            
            // 在博客列表页加载 Waline 浏览量统计（已禁用，不在卡片上显示浏览量）
            const initBlogListPageviews = () => {
                // 已禁用博客卡片上的浏览量显示，直接返回
                return;
                
                try {
                    const currentPath = window.location.pathname;
                    // 判断是否为博客列表页面（posts.html 或首页）
                    const isBlogListPage = currentPath === '/posts.html' || 
                                          currentPath === '/posts' ||
                                          currentPath === '/' ||
                                          currentPath.endsWith('/posts.html') ||
                                          currentPath.endsWith('/posts');
                    
                    // 判断是否为文章详情页（包含具体文章路径，不是列表页）
                    const isArticlePage = currentPath.includes('/posts/') && 
                                         !currentPath.endsWith('/posts') &&
                                         !currentPath.endsWith('/posts.html');
                    
                    // 只在博客列表页面初始化浏览量
                    if (isBlogListPage && !isArticlePage) {
                        // 如果已经初始化过且找到了链接，就不再重复执行
                        if ((window as any).__pageviewInitialized && (window as any).__pageviewLinksFound) {
                            return;
                        }
                        console.log('[Pageview] Initializing blog list pageviews...');
                        console.log('[Pageview] Current path:', currentPath);
                        console.log('[Pageview] isBlogListPage:', isBlogListPage, 'isArticlePage:', isArticlePage);
                        
                        // 输出页面上所有可能的博客相关元素
                        const allPossibleSelectors = [
                            '.item-wrapper',
                            '.reco-blog-wrapper',
                            '.home-blog-wrapper',
                            '.blog-wrapper',
                            '.blog-list',
                            '.reco-blog-list',
                            '[class*="blog"]',
                            '[class*="item"]',
                            '[class*="post"]',
                            'article',
                            '.card',
                            '.post-card'
                        ];
                        
                        console.log('[Pageview] Checking page structure...');
                        allPossibleSelectors.forEach(selector => {
                            try {
                                const elements = document.querySelectorAll(selector);
                                if (elements.length > 0) {
                                    console.log(`[Pageview] Found ${elements.length} elements with selector: ${selector}`);
                                    if (elements.length <= 3) {
                                        // 只输出前3个元素的结构
                                        elements.forEach((el, idx) => {
                                            console.log(`[Pageview] Element ${idx} (${selector}):`, el.className, el.tagName);
                                        });
                                    }
                                }
                            } catch (e) {
                                // 忽略选择器错误
                            }
                        });
                        // 获取 Waline serverURL（从已存在的 Waline 实例或配置中获取）
                        const getWalineServerURL = (): string => {
                            // 方法1: 从 Waline 实例中获取
                            const walineInstance = (window as any).Waline;
                            if (walineInstance && walineInstance.options && walineInstance.options.serverURL) {
                                return walineInstance.options.serverURL;
                            }
                            
                            // 方法2: 从页面中的 script 标签或配置中查找
                            const walineScript = document.querySelector('script[src*="waline"]');
                            if (walineScript) {
                                // 尝试从 Waline 的初始化代码中提取
                                const scripts = document.querySelectorAll('script');
                                for (const script of scripts) {
                                    const content = script.textContent || '';
                                    if (content.includes('serverURL') || content.includes('your-waline-domain.com')) {
                                        const match = content.match(/serverURL['":\s]*['"]([^'"]+)['"]/);
                                        if (match) {
                                            return match[1];
                                        }
                                    }
                                }
                            }
                            
                            // 方法3: 默认值（请替换为你的 Waline 服务地址）
                            return 'https://your-waline-domain.com';
                        };
                        
                        const serverURL = getWalineServerURL();
                        console.log('[Pageview] Using Waline serverURL:', serverURL);
                        
                        // 尝试多种选择器来查找博客链接
                        // 首先尝试直接查找所有包含 /posts/ 的链接（最通用）
                        // 但要排除导航栏、侧边栏等
                        const excludeSelectors = [
                            'nav a',
                            '.navbar a',
                            '.sidebar a',
                            '.toc a',
                            'header a',
                            'footer a'
                        ];
                        
                        let allPostLinks = Array.from(document.querySelectorAll('a[href*="/posts/"]'));
                        
                        // 过滤掉导航栏和侧边栏的链接
                        allPostLinks = allPostLinks.filter(link => {
                            const element = link as HTMLElement;
                            // 检查是否在排除的选择器中
                            for (const excludeSelector of excludeSelectors) {
                                if (element.closest(excludeSelector.replace(' a', ''))) {
                                    return false;
                                }
                            }
                            // 检查是否在主要内容区域
                            const mainContent = element.closest('.content, .main-content, .page-content, .theme-reco-content, .content__default, .page, main');
                            return mainContent !== null;
                        });
                        
                        let blogLinks: NodeListOf<Element> | null = null;
                        
                        if (allPostLinks.length > 0) {
                            // 创建一个临时的 NodeList
                            const tempDiv = document.createElement('div');
                            allPostLinks.forEach(link => tempDiv.appendChild(link.cloneNode(true)));
                            blogLinks = tempDiv.querySelectorAll('a') as any;
                            console.log('[Pageview] Found', allPostLinks.length, 'blog links in main content (filtered from', document.querySelectorAll('a[href*="/posts/"]').length, 'total)');
                        } else {
                            // 如果没找到，尝试其他选择器
                            const linkSelectors = [
                                '.item-wrapper .item-title a',
                                '.reco-blog-wrapper .item-wrapper .item-title a',
                                '.home-blog-wrapper .item-wrapper .item-title a',
                                '.item-wrapper a[href*="/posts/"]',
                                '.reco-blog-wrapper a[href*="/posts/"]',
                                '.home-blog-wrapper a[href*="/posts/"]',
                                '.item-title a',
                                '.item-wrapper a',
                                '.reco-blog-wrapper a',
                                '.home-blog-wrapper a',
                                'article a',
                                '.card a',
                                '.post-card a'
                            ];
                            
                            for (const selector of linkSelectors) {
                                blogLinks = document.querySelectorAll(selector);
                                if (blogLinks.length > 0) {
                                    console.log('[Pageview] Found', blogLinks.length, 'blog links using selector:', selector);
                                    break;
                                }
                            }
                        }
                        
                        // 如果找到了链接，转换为数组以便后续处理
                        if (blogLinks && blogLinks.length > 0) {
                            blogLinks = allPostLinks as any;
                        }
                        
                        // 如果还是没找到，输出调试信息
                        if (!blogLinks || blogLinks.length === 0) {
                            console.warn('[Pageview] No blog links found. Checking DOM structure...');
                            
                            // 检查页面上所有的链接
                            const allLinks = document.querySelectorAll('a[href]');
                            const postLinks = Array.from(allLinks).filter(link => {
                                const href = (link as HTMLAnchorElement).href;
                                return href.includes('/posts/') || href.includes('/articles/') || href.includes('/tutorials/');
                            });
                            console.log('[Pageview] Found', postLinks.length, 'post/article links on page');
                            if (postLinks.length > 0 && postLinks.length <= 5) {
                                postLinks.forEach((link, idx) => {
                                    console.log(`[Pageview] Link ${idx}:`, (link as HTMLAnchorElement).href, 'Parent:', link.parentElement?.className);
                                });
                            }
                            
                            // 检查实际存在的元素
                            const itemWrappers = document.querySelectorAll('.item-wrapper, .reco-blog-wrapper, .home-blog-wrapper');
                            console.log('[Pageview] Found', itemWrappers.length, 'item wrappers');
                            
                            // 检查页面的主要内容区域
                            const mainContent = document.querySelector('.content, .main-content, .page-content, .theme-reco-content, .content__default');
                            if (mainContent) {
                                console.log('[Pageview] Found main content area:', mainContent.className);
                                const linksInContent = mainContent.querySelectorAll('a[href*="/posts/"]');
                                console.log('[Pageview] Links in main content:', linksInContent.length);
                            }
                            
                            // 如果还没有链接，等待 DOM 加载（但限制重试次数）
                            const retryCount = (window as any).__pageviewRetryCount || 0;
                            if (retryCount < 5) {
                                (window as any).__pageviewRetryCount = retryCount + 1;
                                console.log(`[Pageview] Retrying... (${retryCount + 1}/5)`);
                                setTimeout(initBlogListPageviews, 2000);
                            } else {
                                console.warn('[Pageview] Max retries reached, stopping. Please check if you are on a blog list page.');
                                delete (window as any).__pageviewRetryCount;
                            }
                            return;
                        }
                        
                        // 重置重试计数
                        delete (window as any).__pageviewRetryCount;
                        
                        // 标记已找到链接
                        (window as any).__pageviewLinksFound = true;
                        
                        blogLinks!.forEach((link) => {
                            const href = (link as HTMLAnchorElement).href;
                            if (!href) return;
                            
                            try {
                                // 解析 URL 获取路径
                                const url = new URL(href, window.location.origin);
                                let path = url.pathname;
                                
                                // 移除 base 路径（如果有）
                                const base = (window as any).__VUEPRESS_BASE__ || '/';
                                if (path.startsWith(base)) {
                                    path = path.slice(base.length);
                                }
                                if (!path.startsWith('/')) {
                                    path = '/' + path;
                                }
                                
                                // 查找对应的浏览量显示元素
                                const itemWrapper = link.closest('.item-wrapper');
                                if (!itemWrapper) return;
                                
                                // 查找浏览量显示元素（包含眼睛图标的 span）
                                // 尝试多种选择器来找到浏览量元素
                                const possibleSelectors = [
                                    '.item-meta .visitor-count',
                                    '.item-meta .reco-visitor',
                                    '.item-meta .waline-visitor-count',
                                    '.item-meta .waline-pageview',
                                    '.item-meta span:has(svg)',
                                    '.item-meta > span',
                                    '.item-meta > div'
                                ];
                                
                                let viewElement: HTMLElement | null = null;
                                
                                // 先尝试使用特定的类名选择器
                                for (const selector of possibleSelectors) {
                                    const elements = itemWrapper.querySelectorAll(selector);
                                    for (const el of elements) {
                                        const element = el as HTMLElement;
                                        const svg = element.querySelector('svg');
                                        const text = (element.textContent || '').trim();
                                        
                                        // 检查是否是浏览量元素（包含眼睛图标或数字）
                                        if (svg) {
                                            const viewBox = svg.getAttribute('viewBox') || '';
                                            const path = svg.querySelector('path');
                                            const pathD = path?.getAttribute('d') || '';
                                            
                                            // 检查是否是眼睛图标（常见的眼睛图标特征）
                                            const isEyeIcon = viewBox.includes('24') && 
                                                             (pathD.includes('M12') || pathD.includes('M9') || 
                                                              pathD.includes('M15') || pathD.includes('M18'));
                                            
                                            // 如果包含眼睛图标，或者文本是纯数字，则认为是浏览量元素
                                            if (isEyeIcon || /^\d+$/.test(text)) {
                                                viewElement = element;
                                                break;
                                            }
                                        } else if (/^\d+$/.test(text) && text !== '0') {
                                            // 如果没有 SVG 但文本是数字（且不是0），也可能是浏览量
                                            viewElement = element;
                                            break;
                                        }
                                    }
                                    if (viewElement) break;
                                }
                                
                                // 如果还没找到，尝试遍历所有 meta 元素
                                if (!viewElement) {
                                    const metaElements = itemWrapper.querySelectorAll('.item-meta > span, .item-meta > div');
                                    metaElements.forEach((metaEl) => {
                                        const el = metaEl as HTMLElement;
                                        const svg = el.querySelector('svg');
                                        const text = (el.textContent || '').trim();
                                        
                                        // 检查是否是浏览量元素（包含眼睛图标）
                                        if (svg) {
                                            const viewBox = svg.getAttribute('viewBox') || '';
                                            if (viewBox.includes('24')) {
                                                viewElement = el;
                                            }
                                        }
                                    });
                                }
                                
                                if (!viewElement) {
                                    console.warn('[Pageview] View element not found for link:', href);
                                    return;
                                }
                                
                                console.log('[Pageview] Found view element for path:', path, 'current value:', viewElement.textContent);
                                
                                // 调用 Waline 的浏览量 API
                                // Waline 的浏览量 API 路径：/api/comment?type=visitor&path=...
                                const apiUrl = `${serverURL}/api/comment?type=visitor&path=${encodeURIComponent(path)}`;
                                
                                console.log('[Pageview] Fetching pageview for path:', path, 'from:', apiUrl);
                                
                                fetch(apiUrl, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        // 如果返回 404，说明该路径还没有浏览量数据，这是正常的
                                        if (response.status === 404) {
                                            return null;
                                        }
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    if (data === null) {
                                        // 404 响应，没有浏览量数据，保持显示 0
                                        return;
                                    }
                                    
                                    // Waline API 返回的数据格式可能是：
                                    // - 直接是数字
                                    // - { count: number }
                                    // - { data: number }
                                    let count = 0;
                                    if (typeof data === 'number') {
                                        count = data;
                                    } else if (data && typeof data === 'object') {
                                        count = data.count || data.data || data.time || 0;
                                    }
                                    
                                    if (viewElement) {
                                        console.log('[Pageview] Updating pageview for', path, 'to', count);
                                        // 更新浏览量，保留 SVG 图标
                                        const svg = viewElement.querySelector('svg');
                                        if (svg) {
                                            // 克隆 SVG 以避免重复引用问题
                                            const svgClone = svg.cloneNode(true) as SVGElement;
                                            viewElement.innerHTML = '';
                                            viewElement.appendChild(svgClone);
                                            viewElement.appendChild(document.createTextNode(' ' + count));
                                        } else {
                                            viewElement.textContent = String(count);
                                        }
                                    } else {
                                        console.warn('[Pageview] View element not found for path:', path);
                                    }
                                })
                                .catch(err => {
                                    // 输出错误信息以便调试
                                    console.debug('Failed to load pageview for', path, 'from', apiUrl, err);
                                });
                            } catch (err) {
                                // 静默处理错误
                                console.debug('Error processing link:', err);
                            }
                        });
                    }
                } catch (e) {
                    console.warn('initBlogListPageviews error:', e);
                }
            };
            
            // 优化：使用智能延迟执行，避免重复调用
            const debouncedInitPageviews = utils.debounce(() => {
                (window as any).__pageviewRetryCount = 0;
                initBlogListPageviews();
            }, 300)
            
            // 初始执行（使用智能延迟）
            utils.waitForDOM(() => {
                utils.idleCallback(debouncedInitPageviews, 1000)
            })
            
            // 路由变化后重新执行（使用防抖）
            router.afterEach(() => {
                debouncedInitPageviews()
            });
            
            // 监听 DOM 变化，确保动态加载的内容也能加载浏览量（使用防抖）
            if (typeof MutationObserver !== 'undefined') {
                let pageviewDebounceTimer: ReturnType<typeof setTimeout> | null = null;
                const pageviewObserver = new MutationObserver(() => {
                    const currentPath = window.location.pathname;
                    const isBlogListPage = currentPath === '/posts.html' || 
                                          currentPath === '/posts' ||
                                          currentPath === '/' ||
                                          currentPath.endsWith('/posts.html') ||
                                          currentPath.endsWith('/posts');
                    if (isBlogListPage) {
                        // 防抖处理，避免频繁调用
                        if (pageviewDebounceTimer) {
                            clearTimeout(pageviewDebounceTimer);
                        }
                        pageviewDebounceTimer = setTimeout(() => {
                            (window as any).__pageviewRetryCount = 0;
                            initBlogListPageviews();
                        }, 2000);
                    }
                });
                
                pageviewObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
            
        }
    },

    setup() {
        // 添加阅读进度条
        if (typeof window !== 'undefined') {
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #a78bfa, #7c3aed, #6d28d9);
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
      `;
            document.body.appendChild(progressBar);

            // 优化：使用节流优化滚动事件
            const updateProgress = utils.throttle(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = progress + '%';
            }, 16); // 约 60fps

            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();

            // 个人信息卡片交互
            const initProfileCard = () => {
                const trigger = document.getElementById('profileTrigger');
                const card = document.getElementById('profileCard');
                const closeBtn = document.getElementById('closeBtn');

                if (!trigger || !card) {
                    // 如果元素还没有加载，稍后再试
                    return;
                }

                console.log('Profile card found, initializing...');

                // 移除可能存在的旧事件监听器（通过克隆节点）
                const newTrigger = trigger.cloneNode(true) as HTMLElement;
                trigger.parentNode?.replaceChild(newTrigger, trigger);

                // 切换卡片显示状态
                const toggleCard = (e: Event) => {
                    e.stopPropagation();
                    console.log('Toggle card clicked');

                    if (card.classList.contains('active')) {
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    } else {
                        card.classList.add('active');
                        newTrigger.classList.add('active');
                    }
                };

                // 点击触发按钮
                newTrigger.addEventListener('click', toggleCard);

                // 点击关闭按钮
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    });
                }

                // 点击卡片外部关闭
                const closeOnClickOutside = (e: MouseEvent) => {
                    if (card.classList.contains('active') &&
                        !card.contains(e.target as Node) &&
                        !newTrigger.contains(e.target as Node)) {
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    }
                };
                document.addEventListener('click', closeOnClickOutside);

                // 阻止卡片内部点击事件冒泡（但不阻止链接点击）
                card.addEventListener('click', (e) => {
                    // 允许链接正常工作
                    if ((e.target as HTMLElement).tagName === 'A' ||
                        (e.target as HTMLElement).closest('a')) {
                        return;
                    }
                    e.stopPropagation();
                });
            };

            // 优化：使用智能延迟执行，避免重复调用
            utils.waitForDOM(() => {
                utils.idleCallback(initProfileCard, 500)
            })
            
            // 隐藏博客卡片上的浏览量和小眼睛图标
            const hideBlogCardPageviews = () => {
                try {
                    // 查找所有博客卡片（使用多种选择器）
                    const itemWrappers = document.querySelectorAll('.item-wrapper, .reco-blog-wrapper .item-wrapper, .home-blog-wrapper .item-wrapper');
                    
                    itemWrappers.forEach((wrapper) => {
                        const itemMeta = wrapper.querySelector('.item-meta');
                        if (!itemMeta) return;
                        
                        // 方法1: 隐藏所有包含SVG的元素（浏览量通常有眼睛图标）
                        // 注意：:has()选择器可能不被所有浏览器支持，所以也查找SVG元素本身
                        const elementsWithSvg = Array.from(itemMeta.querySelectorAll('span, div')).filter(el => {
                            return el.querySelector('svg') !== null;
                        });
                        const svgElements = itemMeta.querySelectorAll('svg');
                        // 隐藏包含SVG的容器元素
                        elementsWithSvg.forEach((el) => {
                            const element = el as HTMLElement;
                            element.style.setProperty('display', 'none', 'important');
                            element.style.setProperty('visibility', 'hidden', 'important');
                            element.style.setProperty('opacity', '0', 'important');
                            element.style.setProperty('width', '0', 'important');
                            element.style.setProperty('height', '0', 'important');
                            element.style.setProperty('overflow', 'hidden', 'important');
                        });
                        
                        // 隐藏SVG元素本身，并隐藏其父元素
                        svgElements.forEach((svg) => {
                            const svgElement = svg as SVGElement;
                            const parent = svgElement.parentElement;
                            if (parent && parent.closest('.item-meta')) {
                                parent.style.setProperty('display', 'none', 'important');
                                parent.style.setProperty('visibility', 'hidden', 'important');
                                parent.style.setProperty('opacity', '0', 'important');
                                parent.style.setProperty('width', '0', 'important');
                                parent.style.setProperty('height', '0', 'important');
                                parent.style.setProperty('overflow', 'hidden', 'important');
                            }
                        });
                        
                        // 方法2: 查找所有可能包含浏览量的元素（更通用的方法）
                        const allChildren = itemMeta.querySelectorAll('span, div');
                        allChildren.forEach((el) => {
                            const element = el as HTMLElement;
                            const svg = element.querySelector('svg');
                            const text = (element.textContent || '').trim();
                            
                            // 如果包含SVG图标
                            if (svg) {
                                const viewBox = svg.getAttribute('viewBox') || '';
                                // 检查是否是眼睛图标（24x24 viewBox是常见的图标尺寸）
                                if (viewBox.includes('24')) {
                                    element.style.setProperty('display', 'none', 'important');
                                    element.style.setProperty('visibility', 'hidden', 'important');
                                    element.style.setProperty('opacity', '0', 'important');
                                    element.style.setProperty('width', '0', 'important');
                                    element.style.setProperty('height', '0', 'important');
                                    element.style.setProperty('overflow', 'hidden', 'important');
                                    element.style.setProperty('margin', '0', 'important');
                                    element.style.setProperty('padding', '0', 'important');
                                }
                            }
                            
                            // 如果文本是纯数字（可能是浏览量）
                            if (/^\d+$/.test(text)) {
                                // 检查元素或其父元素是否包含SVG
                                const hasSvg = element.querySelector('svg') !== null || 
                                              element.parentElement?.querySelector('svg') !== null;
                                if (hasSvg) {
                                    element.style.setProperty('display', 'none', 'important');
                                    element.style.setProperty('visibility', 'hidden', 'important');
                                    element.style.setProperty('opacity', '0', 'important');
                                }
                            }
                        });
                        
                        // 方法3: 隐藏包含特定类名的元素
                        const classSelectors = [
                            '.visitor-count',
                            '.reco-visitor',
                            '.waline-visitor-count',
                            '.waline-pageview',
                            '.waline-pageview-count',
                            '[class*="visitor"]',
                            '[class*="pageview"]',
                            '[class*="view-count"]'
                        ];
                        
                        classSelectors.forEach(selector => {
                            try {
                                const elements = itemMeta.querySelectorAll(selector);
                                elements.forEach((el) => {
                                    const element = el as HTMLElement;
                                    element.style.setProperty('display', 'none', 'important');
                                    element.style.setProperty('visibility', 'hidden', 'important');
                                    element.style.setProperty('opacity', '0', 'important');
                                    element.style.setProperty('width', '0', 'important');
                                    element.style.setProperty('height', '0', 'important');
                                    element.style.setProperty('overflow', 'hidden', 'important');
                                });
                            } catch (e) {
                                // 忽略选择器错误
                            }
                        });
                        
                        // 方法4: 隐藏最后一个子元素（如果它包含SVG或数字）
                        const lastChild = itemMeta.lastElementChild as HTMLElement;
                        if (lastChild) {
                            const hasSvg = lastChild.querySelector('svg') !== null;
                            const text = (lastChild.textContent || '').trim();
                            const isNumber = /^\d+$/.test(text);
                            
                            if (hasSvg || isNumber) {
                                lastChild.style.setProperty('display', 'none', 'important');
                                lastChild.style.setProperty('visibility', 'hidden', 'important');
                                lastChild.style.setProperty('opacity', '0', 'important');
                            }
                        }
                    });
                } catch (e) {
                    console.debug('Error hiding blog card pageviews:', e);
                }
            };
            
            // 优化：使用防抖和智能延迟执行
            const debouncedHidePageviews = utils.debounce(hideBlogCardPageviews, 150)
            
            // 初始执行（使用智能延迟）
            utils.waitForDOM(() => {
                utils.idleCallback(debouncedHidePageviews, 200)
            })
            
            // 监听DOM变化，确保动态加载的内容也能隐藏浏览量（使用防抖）
            if (typeof MutationObserver !== 'undefined') {
                const pageviewObserver = new MutationObserver(debouncedHidePageviews);
                
                pageviewObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
            
            // 路由变化时也执行
            if (typeof window !== 'undefined' && (window as any).__VUEPRESS_ROUTER__) {
                (window as any).__VUEPRESS_ROUTER__.afterEach(() => {
                    setTimeout(hideBlogCardPageviews, 100);
                    setTimeout(hideBlogCardPageviews, 500);
                    setTimeout(hideBlogCardPageviews, 1000);
                });
            }
            
            // 监听路由变化（通过 VuePress 路由）
            if (typeof window !== 'undefined' && (window as any).__VUEPRESS_ROUTER__) {
                (window as any).__VUEPRESS_ROUTER__.afterEach(() => {
                    utils.idleCallback(initProfileCard, 500)
                    
                    // 路由变化后重新添加搜索快捷键（使用防抖）
                    utils.idleCallback(() => {
                        const addSearchShortcut = () => {
                            const searchBox = document.querySelector('.navbar-search input, .search-box input, input[type="search"]');
                            if (searchBox && !document.querySelector('.search-shortcut-hint')) {
                                const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                                const shortcutKey = isMac ? '⌘ K' : 'Ctrl K';
                                
                                const hint = document.createElement('div');
                                hint.className = 'search-shortcut-hint';
                                hint.textContent = shortcutKey;
                                hint.style.cssText = `
                                    position: absolute;
                                    right: 10px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background: rgba(0, 0, 0, 0.05);
                                    color: #666;
                                    padding: 2px 6px;
                                    border-radius: 3px;
                                    font-size: 11px;
                                    font-weight: 600;
                                    border: 1px solid rgba(0, 0, 0, 0.1);
                                    pointer-events: none;
                                    font-family: 'Segoe UI', system-ui, sans-serif;
                                    z-index: 10;
                                    line-height: 1.3;
                                    display: inline-flex;
                                    align-items: center;
                                    height: 20px;
                                `;
                                
                                const searchContainer = searchBox.parentElement;
                                if (searchContainer) {
                                    searchContainer.style.position = 'relative';
                                    searchContainer.appendChild(hint);
                                    (searchBox as HTMLInputElement).style.paddingRight = '65px';
                                    
                                    const updateTheme = () => {
                                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                                        if (isDark) {
                                            hint.style.background = 'rgba(255, 255, 255, 0.1)';
                                            hint.style.color = 'rgba(255, 255, 255, 0.6)';
                                            hint.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        } else {
                                            hint.style.background = 'rgba(0, 0, 0, 0.05)';
                                            hint.style.color = '#666';
                                            hint.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                        }
                                    };
                                    
                                    updateTheme();
                                }
                            }
                        };
                        addSearchShortcut();
                    }, 300);
                });
            }
        }
    },

    rootComponents: [],
})


