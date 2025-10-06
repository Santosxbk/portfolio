// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffect();
    initThemeToggle();
    initTerminal();
    initGitHubStats();
});

// Sistema de Navegação
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    // Highlight active section in navigation
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    document.querySelector('nav').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
    });
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card, .skill-item').forEach(el => {
        observer.observe(el);
    });
}

// Efeito de Digitação
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Barras de Habilidade
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const fill = bar.querySelector('.skill-fill');
        
        // Animate skill bars when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fill.style.width = level + '%';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }
}

// Scroll Suave
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('nav ul').classList.remove('active');
            }
        });
    });
}

// Efeito Parallax
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Toggle de Tema
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', newTheme);
    });
}

// Sistema de Comandos do Terminal
class TerminalSystem {
    constructor() {
        this.commands = {
            'help': this.help.bind(this),
            'whoami': this.whoami.bind(this),
            'pwd': this.pwd.bind(this),
            'ls': this.ls.bind(this),
            'cd': this.cd.bind(this),
            'cat': this.cat.bind(this),
            'echo': this.echo.bind(this),
            'date': this.date.bind(this),
            'uname': this.uname.bind(this),
            'neofetch': this.neofetch.bind(this),
            'clear': this.clear.bind(this),
            'exit': this.exit.bind(this),
            'projects': this.projects.bind(this),
            'skills': this.skills.bind(this),
            'contact': this.contact.bind(this),
            'github': this.github.bind(this),
            'status': this.status.bind(this),
            'weather': this.weather.bind(this),
            'quote': this.quote.bind(this),
            'matrix': this.matrix.bind(this)
        };
        
        this.currentDir = '~';
        this.history = [];
        this.historyIndex = -1;
        this.isRunning = false;
    }

    // Executar comando
    execute(command) {
        if (!command.trim()) return '';
        
        this.history.push(command);
        this.historyIndex = this.history.length;
        
        const [cmd, ...args] = command.trim().split(' ');
        const commandHandler = this.commands[cmd];
        
        if (commandHandler) {
            return commandHandler(args);
        } else {
            return `Comando não encontrado: ${cmd}\nDigite 'help' para ver os comandos disponíveis.`;
        }
    }

    // Comandos do sistema
    help() {
        return `Comandos disponíveis:
• help          - Mostra esta ajuda
• whoami        - Mostra o usuário atual
• pwd           - Mostra o diretório atual  
• ls [dir]      - Lista arquivos
• cd [dir]      - Muda de diretório
• cat [file]    - Mostra conteúdo do arquivo
• echo [text]   - Exibe texto
• date          - Mostra data e hora
• uname         - Informações do sistema
• neofetch      - Informações do sistema (estilo)
• clear         - Limpa o terminal
• exit          - Sai do terminal
• projects      - Meus projetos
• skills        - Minhas habilidades
• contact       - Informações de contato
• github        - Status do GitHub
• status        - Status do sistema
• weather       - Previsão do tempo
• quote         - Citação aleatória
• matrix        - Efeito Matrix (experimental)`;
    }

    whoami() {
        return 'santos';
    }

    pwd() {
        return this.currentDir;
    }

    ls(args) {
        const dir = args[0] || this.currentDir;
        const files = {
            '~': [
                'projects/',
                'skills.txt',
                'contact.info',
                'github.stats',
                'resume.pdf',
                'portfolio/'
            ],
            'projects': [
                'AnalytiVision/',
                'Quiz-gil/',
                'Numezalize/',
                'SISA/',
                'OSINT-tool/',
                'DataViz/'
            ]
        };

        return files[dir] ? files[dir].join('  ') : `ls: não foi possível acessar '${dir}': Diretório não existe`;
    }

    cd(args) {
        const target = args[0];
        if (!target || target === '~') {
            this.currentDir = '~';
            return '';
        } else if (target === 'projects' && this.currentDir === '~') {
            this.currentDir = 'projects';
            return '';
        } else if (target === '..' && this.currentDir === 'projects') {
            this.currentDir = '~';
            return '';
        } else {
            return `cd: não foi possível acessar '${target}': Diretório não existe`;
        }
    }

    cat(args) {
        const file = args[0];
        const files = {
            'skills.txt': `HABILIDADES TÉCNICAS:
• Desenvolvimento: HTML5, CSS3, JavaScript, Python
• Cibersegurança: OSINT, Pentest, Engenharia Social
• Análise de Dados: Power BI, Dashboards, Visualização
• Sistemas: Arch Linux, Zorin OS, Windows
• Ferramentas: Git, VS Code, Wireshark, Metasploit`,
            
            'contact.info': `INFORMAÇÕES DE CONTATO:
• GitHub: github.com/Santosxbk
• Email: disponível sob solicitação
• Localização: Brasil
• Disponível para: Projetos freelance e colaborações`,
            
            'github.stats': `ESTATÍSTICAS DO GITHUB:
• Repositórios: 9
• Stars: 5+
• Contribuições: 56+
• Commits: 48+
• Linguagens: JavaScript, Python, HTML, CSS`
        };

        return files[file] || `cat: ${file}: Arquivo não encontrado`;
    }

    echo(args) {
        return args.join(' ');
    }

    date() {
        return new Date().toLocaleString('pt-BR');
    }

    uname() {
        return 'Linux portfolio-terminal 6.5.5-arch1-1 x86_64 GNU/Linux';
    }

    neofetch() {
        return `                   -` + `
                  .o+\`                   santos@portfolio
                 \`ooo/                   OS: Arch Linux x86_64
                \`+oooo:                  Host: Portfolio Terminal
               \`+oooooo:                 Kernel: 6.5.5-arch1-1
               -+oooooo+:                Uptime: 2 hours, 15 mins
             \`/:-:++oooo+:               Packages: 1247 (pacman)
            \`/++++/+++++++:              Shell: zsh 5.9
           \`/++++++++++++++:             Resolution: 1920x1080
          \`/+++ooooooooo+++/             Terminal: web-terminal
         ./ooosssso++osssssso+           CPU: Intel i7-13700K (24)
        .oossssso-\`\`\`\`/ossssss+\`         GPU: NVIDIA RTX 4070
       -osssssso.      :ssssssso.        Memory: 16.2GB / 32.0GB
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-                              
    /ossssso+/:-        -:/+osssso+-                          
  \`+sso+:-\`                 \`.-/+oso:                         
 \`++:.                           \`-/+/.                       
 .\`                                 \`/`;
    }

    clear() {
        const output = document.getElementById('terminalOutput');
        if (output) {
            output.innerHTML = '';
        }
        return '';
    }

    exit() {
        this.isRunning = false;
        return 'Saindo do terminal...';
    }

    projects() {
        return `MEUS PROJETOS:
• AnalytiVision - Análise e visualização de dados
• Quiz-gil       - Sistema de quiz interativo  
• Numezalize     - Processamento numérico
• SISA           - Sistema interativo de quiz
• OSINT-tool     - Ferramenta de investigação
• DataViz        - Dashboard de visualização

Acesse: github.com/Santosxbk`;
    }

    skills() {
        return this.cat(['skills.txt']);
    }

    contact() {
        return this.cat(['contact.info']);
    }

    github() {
        return this.cat(['github.stats']);
    }

    status() {
        return `STATUS DO SISTEMA:
• CPU:    ██████████ 15%
• Memory: ████████░░ 68%  
• Disk:   █████████░ 82%
• Temp:   42°C
• Uptime: 2h 15m
• Online: ✅ Conectado`;
    }

    weather() {
        const weather = [
            "☀️  Ensolarado, 28°C",
            "⛅  Parcialmente nublado, 24°C", 
            "🌧️  Chuvoso, 19°C",
            "⚡  Tempestade, 22°C",
            "❄️  Frio, 12°C"
        ];
        return weather[Math.floor(Math.random() * weather.length)];
    }

    quote() {
        const quotes = [
            "“O único modo de fazer um excelente trabalho é amar o que você faz.” - Steve Jobs",
            "“Code is like humor. When you have to explain it, it's bad.” - Cory House",
            "“First, solve the problem. Then, write the code.” - John Johnson",
            "“wired mode: on” - Santos",
            "“Às vezes vale a pena permanecer no barco na tempestade para poder pescar em águas tranquilas.”"
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    matrix() {
        return `Sistema Matrix ativado...
        
        ሰማይ አይታረስ ንጉሥ አይከሰስ።
        በልቡ አይታወር አይገድልም።
        አይጨነቅ አይበላ አይናገር።
        አይደሰት አይከጋ አይረሳ።
        አይጸጽቅ አይነግስ አይገባ።
        አይሞት አይነስ አይተው።
        
        [Pressione Ctrl+C para sair]`;
    }
}

// Terminal Interativo
const terminalSystem = new TerminalSystem();

function initTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalContainer = document.getElementById('terminalContainer');
    const terminalGlitch = document.getElementById('terminalGlitch');

    // Comandos iniciais automáticos
    const initialCommands = [
        'neofetch',
        'echo "🚀 Terminal portfolio carregado..."',
        'echo "Digite \\'help\\' para ver os comandos disponíveis"',
        'status'
    ];

    let commandIndex = 0;

    function executeInitialCommand() {
        if (commandIndex < initialCommands.length) {
            const result = terminalSystem.execute(initialCommands[commandIndex]);
            if (result) {
                addTerminalLine('santos@portfolio:~$', initialCommands[commandIndex], result);
            }
            commandIndex++;
            setTimeout(executeInitialCommand, 1500);
        } else {
            // Adicionar prompt final
            addPromptLine();
        }
    }

    // Iniciar sequência de comandos
    setTimeout(executeInitialCommand, 1000);

    // Efeitos visuais
    setInterval(triggerRandomEffect, 8000 + Math.random() * 7000);

    // Efeitos de hover
    if (terminalContainer) {
        terminalContainer.addEventListener('mouseenter', () => {
            terminalContainer.style.transform = 'translateY(-5px) scale(1.02)';
            terminalContainer.style.boxShadow = 
                '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 30px rgba(99, 102, 241, 0.4)';
        });

        terminalContainer.addEventListener('mouseleave', () => {
            terminalContainer.style.transform = 'translateY(0) scale(1)';
            terminalContainer.style.boxShadow = 
                '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(99, 102, 241, 0.2)';
        });
    }

    // Efeito de clique nos botões
    document.querySelectorAll('.terminal-button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.8)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            triggerRandomEffect();
        });
    });

    // Input do terminal
    const terminalInput = document.getElementById('terminalInput');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                terminalInput.value = '';
                
                const result = terminalSystem.execute(command);
                addTerminalLine('santos@portfolio:~$', command, result);
                
                if (command !== 'exit') {
                    addPromptLine();
                }
            }
        });
    }
}

// Funções auxiliares do terminal
function addTerminalLine(prompt, command, output) {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;
    
    // Linha do comando
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
        <span class="terminal-prompt">${prompt}</span>
        <span class="terminal-command">${command}</span>
    `;
    terminalOutput.appendChild(commandLine);

    // Linha de output (se houver)
    if (output) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';
        outputLine.innerHTML = `<span class="terminal-output-text">${formatOutput(output)}</span>`;
        terminalOutput.appendChild(outputLine);
    }

    scrollTerminalToBottom();
}

function formatOutput(output) {
    // Converte quebras de linha em <br> para HTML
    return output.replace(/\n/g, '<br>');
}

function addPromptLine() {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;
    
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `
        <span class="terminal-prompt">santos@portfolio:~$</span>
        <span class="terminal-cursor"></span>
    `;
    terminalOutput.appendChild(promptLine);
    scrollTerminalToBottom();
}

function scrollTerminalToBottom() {
    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

function triggerRandomEffect() {
    const terminalGlitch = document.getElementById('terminalGlitch');
    if (terminalGlitch) {
        terminalGlitch.style.animation = 'none';
        setTimeout(() => {
            terminalGlitch.style.animation = 'glitchEffect 0.3s ease-out';
        }, 10);
    }
}

// Funções dos botões do terminal
function executeCommand(command) {
    const result = terminalSystem.execute(command);
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!terminalOutput) return;
    
    // Limpar terminal
    terminalOutput.innerHTML = '';
    
    if (result) {
        addTerminalLine('santos@portfolio:~$', command, result);
    }
    
    if (command !== 'exit') {
        addPromptLine();
    }
}

function minimizeTerminal() {
    const terminal = document.getElementById('terminalContainer');
    if (terminal) {
        terminal.style.transform = 'scale(0.8) translateY(20px)';
        terminal.style.opacity = '0.7';
        setTimeout(() => {
            terminal.style.transform = 'scale(1) translateY(0)';
            terminal.style.opacity = '1';
        }, 300);
        triggerRandomEffect();
    }
}

function maximizeTerminal() {
    const terminal = document.getElementById('terminalContainer');
    if (terminal) {
        terminal.style.transform = 'scale(1.1) translateY(-10px)';
        terminal.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.6)';
        setTimeout(() => {
            terminal.style.transform = 'scale(1) translateY(0)';
            terminal.style.boxShadow = 
                '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(99, 102, 241, 0.2)';
        }, 300);
        triggerRandomEffect();
    }
}

// GitHub Statistics
async function initGitHubStats() {
    const username = 'Santosxbk';
    
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        if (!userResponse.ok) throw new Error(userData.message);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        if (!reposResponse.ok) throw new Error(reposData.message);

        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const contributionsCount = userData.public_repos * 3;
        const commitsCount = userData.public_repos * 15;

        updateStatCounter('repos-count', userData.public_repos || 0);
        updateStatCounter('contributions-count', contributionsCount);
        updateStatCounter('stars-count', totalStars);
        updateStatCounter('commits-count', commitsCount);

        document.querySelectorAll('.stat-loading').forEach(loading => {
            loading.style.display = 'none';
        });

    } catch (error) {
        console.error('Erro ao carregar estatísticas do GitHub:', error);
        
        // Fallback para dados estáticos em caso de erro
        updateStatCounter('repos-count', 9);
        updateStatCounter('contributions-count', 56);
        updateStatCounter('stars-count', 5);
        updateStatCounter('commits-count', 48);

        document.querySelectorAll('.stat-loading').forEach(loading => {
            loading.style.display = 'none';
        });
    }
}

function updateStatCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps

    const updateCounter = () => {
        currentValue += increment;
        if (currentValue < targetValue) {
            element.textContent = Math.floor(currentValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    };

    updateCounter();
}

// Utilitários adicionais
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Exportar para uso global (se necessário)
window.terminalSystem = terminalSystem;
window.executeCommand = executeCommand;
window.minimizeTerminal = minimizeTerminal;
window.maximizeTerminal = maximizeTerminal;
