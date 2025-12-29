



// Career Generator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the generator
    initCareerGenerator();
    
    // Add event listeners
    document.getElementById('prevBtn').addEventListener('click', showPreviousQuestion);
    document.getElementById('nextBtn').addEventListener('click', showNextQuestion);
    document.getElementById('skipBtn').addEventListener('click', skipToResults);
    document.getElementById('restartBtn')?.addEventListener('click', restartGenerator);
    document.getElementById('savePathBtn')?.addEventListener('click', saveCareerPath);
});

// Career Generator Configuration
const careerGenerator = {
    currentQuestion: 0,
    answers: {},
    questions: [
        {
            id: 1,
            question: "What's your experience level with technology?",
            options: [
                {
                    id: "beginner",
                    title: "Beginner",
                    description: "Just starting out, little to no coding experience",
                    icon: "fas fa-seedling",
                    value: 1
                },
                {
                    id: "some-experience",
                    title: "Some Experience",
                    description: "Basic programming knowledge, taken some courses",
                    icon: "fas fa-leaf",
                    value: 2
                },
                {
                    id: "intermediate",
                    title: "Intermediate",
                    description: "Comfortable with programming, built small projects",
                    icon: "fas fa-tree",
                    value: 3
                },
                {
                    id: "advanced",
                    title: "Advanced",
                    description: "Professional experience, comfortable with multiple technologies",
                    icon: "fas fa-mountain",
                    value: 4
                }
            ]
        },
        {
            id: 2,
            question: "What type of work interests you most?",
            options: [
                {
                    id: "problem-solving",
                    title: "Problem Solving",
                    description: "Solving complex problems and algorithms",
                    icon: "fas fa-puzzle-piece",
                    value: "ai-ml,data"
                },
                {
                    id: "building",
                    title: "Building Products",
                    description: "Creating applications and websites",
                    icon: "fas fa-code",
                    value: "web-dev,mobile"
                },
                {
                    id: "design",
                    title: "Design & Creativity",
                    description: "Designing user interfaces and experiences",
                    icon: "fas fa-palette",
                    value: "design"
                },
                {
                    id: "security",
                    title: "Security & Protection",
                    description: "Securing systems and preventing attacks",
                    icon: "fas fa-shield-alt",
                    value: "cyber"
                },
                {
                    id: "infrastructure",
                    title: "Infrastructure & Systems",
                    description: "Managing servers, networks, and deployment",
                    icon: "fas fa-server",
                    value: "cloud"
                }
            ]
        },
        {
            id: 3,
            question: "What's your preferred work style?",
            options: [
                {
                    id: "solo",
                    title: "Independent Work",
                    description: "Prefer working alone on focused tasks",
                    icon: "fas fa-user",
                    value: "ai-ml,cyber"
                },
                {
                    id: "team",
                    title: "Team Collaboration",
                    description: "Enjoy working in teams and group projects",
                    icon: "fas fa-users",
                    value: "web-dev,design"
                },
                {
                    id: "mix",
                    title: "Mix of Both",
                    description: "Balance of independent and team work",
                    icon: "fas fa-balance-scale",
                    value: "data,cloud"
                }
            ]
        },
        {
            id: 4,
            question: "How important is salary to you?",
            options: [
                {
                    id: "high-priority",
                    title: "High Priority",
                    description: "Maximizing earning potential is very important",
                    icon: "fas fa-money-bill-wave",
                    value: "ai-ml,cyber,cloud"
                },
                {
                    id: "important",
                    title: "Important",
                    description: "Good salary is important but not the only factor",
                    icon: "fas fa-coins",
                    value: "data,web-dev"
                },
                {
                    id: "moderate",
                    title: "Moderate",
                    description: "Fair compensation, more focused on work satisfaction",
                    icon: "fas fa-hand-holding-usd",
                    value: "design,mobile"
                }
            ]
        },
        {
            id: 5,
            question: "How quickly do you want to start working?",
            options: [
                {
                    id: "fast-track",
                    title: "Fast Track (3-6 months)",
                    description: "Want to start working as soon as possible",
                    icon: "fas fa-bolt",
                    value: "web-dev,design"
                },
                {
                    id: "moderate",
                    title: "Moderate Pace (6-12 months)",
                    description: "Balanced timeline for thorough learning",
                    icon: "fas fa-walking",
                    value: "data,mobile"
                },
                {
                    id: "comprehensive",
                    title: "Comprehensive (12+ months)",
                    description: "Willing to invest time for in-depth expertise",
                    icon: "fas fa-graduation-cap",
                    value: "ai-ml,cyber,cloud"
                }
            ]
        },
        {
            id: 6,
            question: "What's your learning preference?",
            options: [
                {
                    id: "structured",
                    title: "Structured Learning",
                    description: "Prefer clear roadmaps and guided courses",
                    icon: "fas fa-road",
                    value: "web-dev,design"
                },
                {
                    id: "experimental",
                    title: "Experimental Learning",
                    description: "Learn by doing and experimenting",
                    icon: "fas fa-flask",
                    value: "ai-ml,data"
                },
                {
                    id: "theoretical",
                    title: "Theoretical Learning",
                    description: "Enjoy deep dives into concepts and theory",
                    icon: "fas fa-book",
                    value: "cyber,cloud"
                }
            ]
        },
        {
            id: 7,
            question: "What industry interests you?",
            options: [
                {
                    id: "tech",
                    title: "Pure Tech",
                    description: "Tech companies, startups, SaaS",
                    icon: "fas fa-laptop-code",
                    value: "all"
                },
                {
                    id: "finance",
                    title: "Finance & Banking",
                    description: "Fintech, banking, trading systems",
                    icon: "fas fa-chart-line",
                    value: "ai-ml,data,cyber"
                },
                {
                    id: "health",
                    title: "Healthcare",
                    description: "Medical tech, health data, biotech",
                    icon: "fas fa-heartbeat",
                    value: "ai-ml,data"
                },
                {
                    id: "ecommerce",
                    title: "E-commerce & Retail",
                    description: "Online shopping, retail platforms",
                    icon: "fas fa-shopping-cart",
                    value: "web-dev,data"
                }
            ]
        }
    ],
    
    careerPaths: {
        "ai-ml": {
            title: "AI Engineer",
            description: "Master machine learning, deep learning, and AI model deployment to build intelligent systems.",
            icon: "fas fa-brain",
            salary: "$140,000",
            growth: "32%",
            timeline: "12-18 months",
            matchReasons: [
                "Matches your interest in problem-solving",
                "Aligns with your analytical thinking style",
                "High demand matches your career goals"
            ]
        },
        "web-dev": {
            title: "Full-Stack Web Developer",
            description: "Build modern web applications with frontend and backend technologies.",
            icon: "fas fa-code",
            salary: "$95,000",
            growth: "23%",
            timeline: "9-12 months",
            matchReasons: [
                "Perfect for creative builders",
                "Fast entry into tech industry",
                "High demand across all industries"
            ]
        },
        "data": {
            title: "Data Scientist",
            description: "Analyze complex data to uncover insights and drive business decisions.",
            icon: "fas fa-chart-line",
            salary: "$125,000",
            growth: "28%",
            timeline: "10-14 months",
            matchReasons: [
                "Combines statistics and programming",
                "High impact on business decisions",
                "Growing demand in all sectors"
            ]
        },
        "cyber": {
            title: "Cybersecurity Analyst",
            description: "Protect systems and networks from cyber threats and attacks.",
            icon: "fas fa-shield-alt",
            salary: "$105,000",
            growth: "35%",
            timeline: "12-15 months",
            matchReasons: [
                "Critical role in digital security",
                "High job security and demand",
                "Constant learning and challenges"
            ]
        },
        "cloud": {
            title: "Cloud Engineer",
            description: "Design, implement, and manage cloud infrastructure and services.",
            icon: "fas fa-cloud",
            salary: "$120,000",
            growth: "30%",
            timeline: "10-12 months",
            matchReasons: [
                "Infrastructure is critical for all tech",
                "High salary with strong demand",
                "Mix of technical and architectural work"
            ]
        },
        "design": {
            title: "UI/UX Designer",
            description: "Design user interfaces and experiences for digital products.",
            icon: "fas fa-palette",
            salary: "$85,000",
            growth: "20%",
            timeline: "6-8 months",
            matchReasons: [
                "Perfect for creative problem-solvers",
                "Bridge between users and technology",
                "Growing importance in product development"
            ]
        },
        "mobile": {
            title: "Mobile App Developer",
            description: "Create applications for iOS and Android platforms.",
            icon: "fas fa-mobile-alt",
            salary: "$90,000",
            growth: "22%",
            timeline: "8-10 months",
            matchReasons: [
                "Work on popular consumer apps",
                "Creative and technical combination",
                "Strong demand in mobile-first world"
            ]
        }
    }
};

function initCareerGenerator() {
    // Load first question
    showQuestion(0);
    updateProgress();
}

function showQuestion(questionIndex) {
    const question = careerGenerator.questions[questionIndex];
    const container = document.getElementById('questionContainer');
    
    if (!question) {
        showResults();
        return;
    }
    
    // Update current question
    careerGenerator.currentQuestion = questionIndex;
    
    // Render question
    container.innerHTML = `
        <div class="question-card">
            <h3>${question.question}</h3>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <div class="option-card ${careerGenerator.answers[question.id] === option.id ? 'selected' : ''}" 
                         data-option-id="${option.id}"
                         data-question-id="${question.id}">
                        <div class="option-icon">
                            <i class="${option.icon}"></i>
                        </div>
                        <h4>${option.title}</h4>
                        <p>${option.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add click handlers to options
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            const optionId = this.getAttribute('data-option-id');
            
            // Remove selection from other options
            document.querySelectorAll(`[data-question-id="${questionId}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select this option
            this.classList.add('selected');
            
            // Save answer
            careerGenerator.answers[questionId] = optionId;
            
            // Enable next button
            document.getElementById('nextBtn').disabled = false;
        });
    });
    
    // Update navigation buttons
    updateNavigation();
    updateProgress();
}

function showPreviousQuestion() {
    if (careerGenerator.currentQuestion > 0) {
        showQuestion(careerGenerator.currentQuestion - 1);
    }
}

function showNextQuestion() {
    // Check if current question is answered
    const currentQuestion = careerGenerator.questions[careerGenerator.currentQuestion];
    if (!careerGenerator.answers[currentQuestion.id]) {
        alert('Please select an option before continuing');
        return;
    }
    
    if (careerGenerator.currentQuestion < careerGenerator.questions.length - 1) {
        showQuestion(careerGenerator.currentQuestion + 1);
    } else {
        showResults();
    }
}

function skipToResults() {
    showResults();
}

function updateProgress() {
    const current = careerGenerator.currentQuestion + 1;
    const total = careerGenerator.questions.length;
    const progress = (current / total) * 100;
    
    // Update progress bar
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = current;
    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');
    
    // Previous button
    prevBtn.disabled = careerGenerator.currentQuestion === 0;
    
    // Next button
    const currentQuestion = careerGenerator.questions[careerGenerator.currentQuestion];
    nextBtn.disabled = !careerGenerator.answers[currentQuestion.id];
    
    // Skip button (show on last 2 questions)
    skipBtn.style.display = careerGenerator.currentQuestion >= careerGenerator.questions.length - 2 ? 'block' : 'none';
    
    // Update next button text on last question
    if (careerGenerator.currentQuestion === careerGenerator.questions.length - 1) {
        nextBtn.innerHTML = 'See Results <i class="fas fa-chart-line"></i>';
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }
}

function calculateCareerPath() {
    // Count category preferences from answers
    const categoryCounts = {
        'ai-ml': 0,
        'web-dev': 0,
        'data': 0,
        'cyber': 0,
        'cloud': 0,
        'design': 0,
        'mobile': 0
    };
    
    // Analyze answers
    careerGenerator.questions.forEach(question => {
        const answerId = careerGenerator.answers[question.id];
        if (answerId) {
            const selectedOption = question.options.find(opt => opt.id === answerId);
            if (selectedOption && selectedOption.value) {
                const categories = selectedOption.value.split(',');
                categories.forEach(category => {
                    if (category === 'all') {
                        Object.keys(categoryCounts).forEach(cat => categoryCounts[cat]++);
                    } else if (categoryCounts[category] !== undefined) {
                        categoryCounts[category]++;
                    }
                });
            }
        }
    });
    
    // Find highest scoring category
    let topCategory = 'ai-ml';
    let topScore = 0;
    
    Object.entries(categoryCounts).forEach(([category, score]) => {
        if (score > topScore) {
            topScore = score;
            topCategory = category;
        }
    });
    
    // Get alternative categories (next highest scores)
    const alternatives = Object.entries(categoryCounts)
        .filter(([category]) => category !== topCategory)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([category]) => category);
    
    return {
        primary: topCategory,
        alternatives: alternatives,
        matchPercent: Math.min(85 + (topScore * 5), 95) // Calculate match percentage
    };
}

function showResults() {
    // Hide generator, show results
    document.getElementById('generator').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Calculate career path
    const result = calculateCareerPath();
    const primaryPath = careerGenerator.careerPaths[result.primary];
    
    // Update primary result
    document.getElementById('resultIcon').className = primaryPath.icon;
    document.getElementById('resultTitle').textContent = primaryPath.title;
    document.getElementById('resultSalary').textContent = primaryPath.salary;
    document.getElementById('resultGrowth').textContent = primaryPath.growth;
    document.getElementById('resultTimeline').textContent = primaryPath.timeline;
    document.getElementById('resultDescription').textContent = primaryPath.description;
    document.getElementById('matchPercent').textContent = `${result.matchPercent}%`;
    
    // Update match reasons
    const reasonsList = document.getElementById('matchReasons');
    reasonsList.innerHTML = primaryPath.matchReasons.map(reason => 
        `<li>${reason}</li>`
    ).join('');
    
    // Update view roadmap button
    const roadmapBtn = document.getElementById('viewRoadmapBtn');
    roadmapBtn.href = `../skills/${result.primary === 'ai-ml' ? 'ai-engineer' : 
                      result.primary === 'web-dev' ? 'web-developer' :
                      result.primary === 'data' ? 'data-analyst' :
                      result.primary === 'cyber' ? 'cybersecurity' :
                      result.primary === 'cloud' ? 'cloud-engineer' :
                      result.primary === 'design' ? 'ui-ux-designer' : 'mobile-developer'}.html`;
    
    // Update alternative paths
    const alternativesGrid = document.getElementById('alternativesGrid');
    alternativesGrid.innerHTML = result.alternatives.map(category => {
        const path = careerGenerator.careerPaths[category];
        return `
            <div class="alternative-card">
                <div class="alternative-icon">
                    <i class="${path.icon}"></i>
                </div>
                <h4>${path.title}</h4>
                <p class="alternative-salary">${path.salary}</p>
                <p class="alternative-match">Good alternative match</p>
                <a href="../skills/${category === 'ai-ml' ? 'ai-engineer' : 
                                category === 'web-dev' ? 'web-developer' :
                                category === 'data' ? 'data-analyst' :
                                category === 'cyber' ? 'cybersecurity' :
                                category === 'cloud' ? 'cloud-engineer' :
                                category === 'design' ? 'ui-ux-designer' : 'mobile-developer'}.html" 
                   class="btn btn-outline btn-small">
                    Explore
                </a>
            </div>
        `;
    }).join('');
}

function saveCareerPath() {
    const result = calculateCareerPath();
    const primaryPath = careerGenerator.careerPaths[result.primary];
    
    // Get saved paths from localStorage
    let savedPaths = JSON.parse(localStorage.getItem('savedCareerPaths')) || [];
    
    // Add current path if not already saved
    const pathExists = savedPaths.some(path => path.category === result.primary);
    
    if (!pathExists) {
        savedPaths.push({
            category: result.primary,
            title: primaryPath.title,
            date: new Date().toISOString(),
            matchPercent: result.matchPercent
        });
        
        localStorage.setItem('savedCareerPaths', JSON.stringify(savedPaths));
        
        // Show success message
        showNotification('Career path saved to your profile!', 'success');
        
        // Update button
        const btn = document.getElementById('savePathBtn');
        btn.innerHTML = '<i class="fas fa-check"></i> Saved';
        btn.disabled = true;
    }
}

function restartGenerator() {
    // Reset answers
    careerGenerator.answers = {};
    careerGenerator.currentQuestion = 0;
    
    // Show generator, hide results
    document.getElementById('generator').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // Reload first question
    showQuestion(0);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}



