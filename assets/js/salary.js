


// Salary Explorer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize salary chart
    initSalaryChart();
    
    // Load salary data
    loadSalaryData();
    
    // Initialize calculator
    initSalaryCalculator();
    
    // Add event listeners
    document.getElementById('searchBtn').addEventListener('click', searchSalaries);
    document.getElementById('roleSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchSalaries();
    });
    
    // Filter event listeners
    document.getElementById('experienceFilter').addEventListener('change', updateChart);
    document.getElementById('locationFilter').addEventListener('change', updateChart);
    document.getElementById('categoryFilter').addEventListener('change', updateChart);
    
    // Experience range updates
    const experienceRange = document.getElementById('calcExperience');
    const expValue = document.getElementById('expValue');
    
    experienceRange.addEventListener('input', function() {
        expValue.textContent = `${this.value} year${this.value > 1 ? 's' : ''}`;
    });
});

// Salary data
const salaryData = {
    roles: [
        {
            role: "AI Engineer",
            category: "ai-ml",
            entry: 95000,
            mid: 140000,
            senior: 200000,
            growth: "32%",
            demand: "Very High",
            skills: ["Python", "TensorFlow", "ML", "NLP"]
        },
        {
            role: "Web Developer",
            category: "web-dev",
            entry: 65000,
            mid: 95000,
            senior: 140000,
            growth: "23%",
            demand: "High",
            skills: ["JavaScript", "React", "Node.js", "HTML/CSS"]
        },
        {
            role: "Data Scientist",
            category: "data",
            entry: 85000,
            mid: 125000,
            senior: 180000,
            growth: "28%",
            demand: "Very High",
            skills: ["Python", "SQL", "Statistics", "ML"]
        },
        {
            role: "Cybersecurity Analyst",
            category: "cyber",
            entry: 75000,
            mid: 105000,
            senior: 160000,
            growth: "35%",
            demand: "Very High",
            skills: ["Network Security", "Linux", "Cryptography"]
        },
        {
            role: "Cloud Engineer",
            category: "cloud",
            entry: 80000,
            mid: 120000,
            senior: 170000,
            growth: "30%",
            demand: "High",
            skills: ["AWS", "Docker", "Kubernetes", "Linux"]
        },
        {
            role: "DevOps Engineer",
            category: "cloud",
            entry: 85000,
            mid: 130000,
            senior: 190000,
            growth: "28%",
            demand: "Very High",
            skills: ["Docker", "Kubernetes", "AWS", "Jenkins"]
        },
        {
            role: "Mobile Developer",
            category: "mobile",
            entry: 70000,
            mid: 90000,
            senior: 130000,
            growth: "22%",
            demand: "High",
            skills: ["React Native", "Swift", "Kotlin"]
        },
        {
            role: "UI/UX Designer",
            category: "design",
            entry: 60000,
            mid: 85000,
            senior: 120000,
            growth: "20%",
            demand: "High",
            skills: ["Figma", "Adobe XD", "User Research"]
        }
    ],
    
    locationMultipliers: {
        global: 1.0,
        us: 1.2,
        uk: 0.8,
        eu: 0.85,
        india: 0.3,
        remote: 1.1
    },
    
    skillBonuses: {
        python: 5000,
        tensorflow: 10000,
        aws: 8000,
        react: 6000,
        docker: 7000,
        kubernetes: 9000,
        cybersecurity: 12000,
        machinelearning: 15000
    }
};

let salaryChart;

function initSalaryChart() {
    const ctx = document.getElementById('salaryChart').getContext('2d');
    
    salaryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Entry Level (0-2 yrs)',
                    data: [],
                    backgroundColor: 'rgba(0, 217, 255, 0.7)',
                    borderColor: 'rgba(0, 217, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Mid Level (3-5 yrs)',
                    data: [],
                    backgroundColor: 'rgba(157, 78, 221, 0.7)',
                    borderColor: 'rgba(157, 78, 221, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Senior Level (6+ yrs)',
                    data: [],
                    backgroundColor: 'rgba(0, 255, 157, 0.7)',
                    borderColor: 'rgba(0, 255, 157, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: "'Source Sans Pro', sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#b0b0c0',
                        font: {
                            family: "'Source Sans Pro', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#b0b0c0',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        },
                        font: {
                            family: "'Source Sans Pro', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function loadSalaryData() {
    updateChart();
    populateSalaryTable();
}

function updateChart() {
    const experience = document.getElementById('experienceFilter').value;
    const category = document.getElementById('categoryFilter').value;
    
    // Filter data
    let filteredRoles = salaryData.roles;
    
    if (category !== 'all') {
        filteredRoles = filteredRoles.filter(role => role.category === category);
    }
    
    // Update chart data
    salaryChart.data.labels = filteredRoles.map(role => role.role);
    
    if (experience === 'all') {
        salaryChart.data.datasets[0].data = filteredRoles.map(role => role.entry);
        salaryChart.data.datasets[1].data = filteredRoles.map(role => role.mid);
        salaryChart.data.datasets[2].data = filteredRoles.map(role => role.senior);
    } else if (experience === 'entry') {
        salaryChart.data.datasets[0].data = filteredRoles.map(role => role.entry);
        salaryChart.data.datasets[1].data = [];
        salaryChart.data.datasets[2].data = [];
    } else if (experience === 'mid') {
        salaryChart.data.datasets[0].data = [];
        salaryChart.data.datasets[1].data = filteredRoles.map(role => role.mid);
        salaryChart.data.datasets[2].data = [];
    } else if (experience === 'senior') {
        salaryChart.data.datasets[0].data = [];
        salaryChart.data.datasets[1].data = [];
        salaryChart.data.datasets[2].data = filteredRoles.map(role => role.senior);
    }
    
    salaryChart.update();
}

function populateSalaryTable() {
    const tableBody = document.getElementById('salaryTableBody');
    const category = document.getElementById('categoryFilter').value;
    
    let filteredRoles = salaryData.roles;
    if (category !== 'all') {
        filteredRoles = filteredRoles.filter(role => role.category === category);
    }
    
    tableBody.innerHTML = filteredRoles.map(role => `
        <tr>
            <td>
                <strong>${role.role}</strong>
                <div class="role-tags">
                    ${role.skills.slice(0, 2).map(skill => 
                        `<span class="tag">${skill}</span>`
                    ).join('')}
                </div>
            </td>
            <td class="salary-high">$${role.entry.toLocaleString()}</td>
            <td class="salary-high">$${role.mid.toLocaleString()}</td>
            <td class="salary-high">$${role.senior.toLocaleString()}</td>
            <td><span class="growth-high">${role.growth}</span></td>
            <td><span class="demand-high">${role.demand}</span></td>
        </tr>
    `).join('');
}

function searchSalaries() {
    const searchTerm = document.getElementById('roleSearch').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        updateChart();
        populateSalaryTable();
        return;
    }
    
    const filteredRoles = salaryData.roles.filter(role => 
        role.role.toLowerCase().includes(searchTerm) ||
        role.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    // Update chart with search results
    salaryChart.data.labels = filteredRoles.map(role => role.role);
    salaryChart.data.datasets[0].data = filteredRoles.map(role => role.entry);
    salaryChart.data.datasets[1].data = filteredRoles.map(role => role.mid);
    salaryChart.data.datasets[2].data = filteredRoles.map(role => role.senior);
    salaryChart.update();
    
    // Update table
    const tableBody = document.getElementById('salaryTableBody');
    tableBody.innerHTML = filteredRoles.map(role => `
        <tr>
            <td><strong>${role.role}</strong></td>
            <td class="salary-high">$${role.entry.toLocaleString()}</td>
            <td class="salary-high">$${role.mid.toLocaleString()}</td>
            <td class="salary-high">$${role.senior.toLocaleString()}</td>
            <td><span class="growth-high">${role.growth}</span></td>
            <td><span class="demand-high">${role.demand}</span></td>
        </tr>
    `).join('');
}

function initSalaryCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateSalary);
    
    // Set initial calculation
    calculateSalary();
}

function calculateSalary() {
    const role = document.getElementById('calcRole').value;
    const experience = parseInt(document.getElementById('calcExperience').value);
    const location = document.getElementById('calcLocation').value;
    
    // Get selected skills
    const skillCheckboxes = document.querySelectorAll('.skill-checkbox input[type="checkbox"]:checked');
    const selectedSkills = Array.from(skillCheckboxes).map(cb => cb.value);
    
    // Find base role data
    const roleData = salaryData.roles.find(r => 
        r.role.toLowerCase().replace(' ', '-') === role
    );
    
    if (!roleData) return;
    
    // Calculate base salary based on experience
    let baseSalary;
    if (experience <= 2) {
        baseSalary = roleData.entry;
    } else if (experience <= 5) {
        baseSalary = roleData.mid;
    } else {
        baseSalary = roleData.senior;
    }
    
    // Adjust for location
    const locationMultiplier = salaryData.locationMultipliers[location] || 1.0;
    let adjustedSalary = baseSalary * locationMultiplier;
    
    // Add skill bonuses
    let skillBonus = 0;
    selectedSkills.forEach(skill => {
        if (salaryData.skillBonuses[skill]) {
            skillBonus += salaryData.skillBonuses[skill];
        }
    });
    
    // Adjust skill bonus for location
    skillBonus *= locationMultiplier;
    
    const totalSalary = Math.round(adjustedSalary + skillBonus);
    
    // Update UI
    document.getElementById('baseSalary').textContent = `$${Math.round(adjustedSalary).toLocaleString()}`;
    document.getElementById('skillBonus').textContent = `+$${Math.round(skillBonus).toLocaleString()}`;
    document.getElementById('totalSalary').textContent = `$${totalSalary.toLocaleString()}`;
    document.getElementById('resultSalary').textContent = `$${totalSalary.toLocaleString()}`;
    
    // Show result
    document.getElementById('calculatorResult').style.display = 'block';
}



