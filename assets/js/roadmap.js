


// Skills Roadmap Functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Load and display skills
    await loadSkills();
    
    // Initialize filters
    initSkillFilters();
    
    // Initialize search
    initSkillSearch();
});

// Load skills from JSON
async function loadSkills() {
    try {
        const response = await fetch('../../data/skills.json');
        const data = await response.json();
        
        // Display featured skills on homepage
        if (document.getElementById('featured-skills')) {
            displayFeaturedSkills(data.skills.slice(0, 6));
        }
        
        // Display all skills on skills page
        if (document.getElementById('allSkillsGrid')) {
            displayAllSkills(data.skills);
        }
        
        // Store skills globally for filtering
        window.skillsData = data.skills;
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('allSkillsGrid').innerHTML = 
            '<div class="error-message">Error loading skills. Please try again later.</div>';
    }
}

// Display featured skills on homepage
function displayFeaturedSkills(skills) {
    const container = document.getElementById('featured-skills');
    container.innerHTML = skills.map(skill => `
        <div class="skill-card" data-category="${skill.category}">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3>${skill.title}</h3>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">
                ${skill.tags.slice(0, 3).map(tag => `
                    <span class="tag">${tag}</span>
                `).join('')}
            </div>
            <div class="skill-stats">
                <div class="stat">
                    <span class="stat-value">${skill.difficulty}</span>
                    <span class="stat-label">Level</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${skill.duration}</span>
                    <span class="stat-label">Duration</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${skill.avgSalary}</span>
                    <span class="stat-label">Avg Salary</span>
                </div>
            </div>
            <a href="pages/skills/${skill.id}.html" class="btn btn-primary btn-small">
                <i class="fas fa-road"></i> View Roadmap
            </a>
        </div>
    `).join('');
}

// Display all skills on skills page
function displayAllSkills(skills) {
    const container = document.getElementById('allSkillsGrid');
    container.innerHTML = skills.map(skill => `
        <div class="skill-listing-card" data-category="${skill.category}">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-title">
                    <h3>${skill.title}</h3>
                    <span class="skill-category">${formatCategory(skill.category)}</span>
                </div>
            </div>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">
                ${skill.tags.map(tag => `
                    <span class="tag">${tag}</span>
                `).join('')}
            </div>
            <div class="skill-stats">
                <div class="stat-item">
                    <div class="stat-value">${skill.difficulty}</div>
                    <div class="stat-label">Level</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${skill.duration}</div>
                    <div class="stat-label">Duration</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${skill.avgSalary}</div>
                    <div class="stat-label">Salary</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${skill.growth}</div>
                    <div class="stat-label">Growth</div>
                </div>
            </div>
            <div class="skill-actions">
                <a href="pages/skills/${skill.id}.html" class="btn btn-primary btn-small">
                    <i class="fas fa-road"></i> View Roadmap
                </a>
                <button class="btn btn-secondary btn-small save-skill-btn" data-skill-id="${skill.id}">
                    <i class="far fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `).join('');
    
    // Add save functionality
    document.querySelectorAll('.save-skill-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const skillId = this.getAttribute('data-skill-id');
            saveSkill(skillId);
        });
    });
}

// Format category for display
function formatCategory(category) {
    const categories = {
        'ai-ml': 'AI & Machine Learning',
        'web-dev': 'Web Development',
        'data': 'Data Science',
        'cyber': 'Cybersecurity',
        'cloud': 'Cloud & DevOps',
        'design': 'Design & UX'
    };
    return categories[category] || category;
}

// Initialize skill filters
function initSkillFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-listing-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter skills
            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize skill search
function initSkillSearch() {
    const searchInput = document.getElementById('skillSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const skillCards = document.querySelectorAll('.skill-listing-card');
        
        skillCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.skill-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           tags.some(tag => tag.includes(searchTerm));
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Save skill to localStorage
function saveSkill(skillId) {
    let savedSkills = JSON.parse(localStorage.getItem('savedSkills')) || [];
    
    if (!savedSkills.includes(skillId)) {
        savedSkills.push(skillId);
        localStorage.setItem('savedSkills', JSON.stringify(savedSkills));
        
        // Show success message
        showNotification('Skill saved to your profile!', 'success');
        
        // Update button
        const btn = document.querySelector(`[data-skill-id="${skillId}"]`);
        btn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        btn.classList.add('saved');
    } else {
        // Remove from saved
        savedSkills = savedSkills.filter(id => id !== skillId);
        localStorage.setItem('savedSkills', JSON.stringify(savedSkills));
        
        // Update button
        const btn = document.querySelector(`[data-skill-id="${skillId}"]`);
        btn.innerHTML = '<i class="far fa-bookmark"></i> Save';
        btn.classList.remove('saved');
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--accent-cyan);
    border-radius: 8px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--shadow);
    transform: translateX(100%);
    opacity: 0;
    transition: var(--transition);
    z-index: 10000;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification.success {
    border-left-color: var(--success);
}

.notification.success i {
    color: var(--success);
}

.notification i {
    font-size: 1.2rem;
}
`;
document.head.appendChild(notificationStyle);



