// Portfolio page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilter();
    initializeProjectModals();
});

// Portfolio filtering functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project modal functionality
function initializeProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Project data
    const projects = {
        makueni_villa: {
            title: 'Modern Family Villa',
            location: 'Makueni County',
            type: 'Residential Construction',
            duration: '6 months',
            budget: 'KSh 2.5M',
            description: 'A beautiful 3-bedroom family villa built with modern construction techniques and quality materials. Features include spacious living areas, modern kitchen, and well-designed outdoor spaces.',
            features: [
                '3 bedrooms with modern bathrooms',
                'Open-plan living and dining area',
                'Modern kitchen with quality fittings',
                'Outdoor entertainment area',
                'Quality roofing and finishing',
                'Proper drainage and water systems'
            ],
            images: [
                'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Makueni Family',
            year: '2024'
        },
        mombasa_apartments: {
            title: 'Mombasa Road Apartments',
            location: 'Mombasa Road Corridor',
            type: 'Residential Development',
            duration: '12 months',
            budget: 'KSh 8M',
            description: 'A modern 12-unit apartment complex strategically located along the Mombasa Road corridor. Features quality construction with modern amenities and secure parking.',
            features: [
                '12 residential units (2 and 3 bedrooms)',
                'Secure parking for residents',
                'Modern kitchen and bathroom fittings',
                'Quality roofing and waterproofing',
                '24/7 security and water supply',
                'Well-designed common areas'
            ],
            images: [
                'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Mombasa Road Developers',
            year: '2023'
        },
        machakos_commercial: {
            title: 'Machakos Commercial Center',
            location: 'Machakos County',
            type: 'Commercial Construction',
            duration: '10 months',
            budget: 'KSh 5M',
            description: 'A modern commercial building designed for office and retail spaces. Features quality construction with modern amenities and ample parking space.',
            features: [
                'Ground floor retail spaces',
                'Upper floor office spaces',
                'Modern electrical and plumbing systems',
                'Quality finishing and fixtures',
                'Adequate parking space',
                'Professional building design'
            ],
            images: [
                'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Machakos Business Group',
            year: '2023'
        },
        makueni_renovation: {
            title: 'House Renovation Project',
            location: 'Makueni Town',
            type: 'Residential Renovation',
            duration: '4 months',
            budget: 'KSh 800K',
            description: 'Complete renovation of an existing family home including modern kitchen, updated bathrooms, new roofing, and improved electrical systems.',
            features: [
                'Kitchen and bathroom modernization',
                'New roofing and ceiling work',
                'Modern windows and doors',
                'Improved outdoor spaces',
                'Updated electrical and plumbing systems',
                'Quality painting and finishing'
            ],
            images: [
                'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Makueni Homeowner',
            year: '2024'
        },
        wote_retail: {
            title: 'Retail Shopping Center',
            location: 'Wote, Makueni',
            type: 'Commercial Development',
            duration: '8 months',
            budget: 'KSh 3.5M',
            description: 'A modern retail center with multiple shops and commercial spaces designed to serve the Wote community with quality construction and modern amenities.',
            features: [
                '8 retail units of varying sizes',
                'Central common area',
                'Adequate parking space',
                'Modern HVAC and lighting systems',
                'Security systems and fire safety',
                'Quality finishing throughout'
            ],
            images: [
                'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Wote Business Community',
            year: '2023'
        },
        mombasa_warehouse: {
            title: 'Warehouse Construction',
            location: 'Mombasa Road Industrial Area',
            type: 'Industrial Construction',
            duration: '6 months',
            budget: 'KSh 4M',
            description: 'A large warehouse facility built for storage and logistics operations. Features strong foundations, high ceilings, and efficient loading areas.',
            features: [
                'Strong concrete foundations',
                'High ceiling construction',
                'Large loading and unloading bays',
                'Office and administrative area',
                'Security and safety systems',
                'Proper drainage and utilities'
            ],
            images: [
                'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            client: 'Logistics Company Kenya',
            year: '2024'
        }
    };

    const project = projects[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <div class="project-modal">
            <div class="project-header">
                <h2>${project.title}</h2>
                <div class="project-meta">
                    <span class="meta-item">📍 ${project.location}</span>
                    <span class="meta-item">📅 ${project.year}</span>
                    <span class="meta-item">⏱️ ${project.duration}</span>
                    <span class="meta-item">💰 ${project.budget}</span>
                </div>
            </div>
            
            <div class="project-gallery">
                ${project.images.map(img => `
                    <img src="${img}" alt="${project.title}" class="gallery-image">
                `).join('')}
            </div>
            
            <div class="project-details">
                <div class="project-description">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-info-grid">
                    <div class="info-item">
                        <strong>Client:</strong>
                        <span>${project.client}</span>
                    </div>
                    <div class="info-item">
                        <strong>Project Type:</strong>
                        <span>${project.type}</span>
                    </div>
                    <div class="info-item">
                        <strong>Completion:</strong>
                        <span>${project.year}</span>
                    </div>
                    <div class="info-item">
                        <strong>Duration:</strong>
                        <span>${project.duration}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="quote.html" class="btn btn-primary">Request Similar Quote</a>
                <a href="contact.html" class="btn btn-outline">Contact Us</a>
            </div>
        </div>
    `;

    // Add modal-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .project-modal {
            max-width: 100%;
        }
        
        .project-header {
            margin-bottom: var(--spacing-8);
            text-align: center;
        }
        
        .project-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--gray-900);
            margin-bottom: var(--spacing-4);
        }
        
        .project-meta {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--spacing-4);
        }
        
        .meta-item {
            background: var(--gray-100);
            padding: var(--spacing-2) var(--spacing-3);
            border-radius: 6px;
            font-size: 0.9rem;
            color: var(--gray-700);
        }
        
        .project-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-4);
            margin-bottom: var(--spacing-8);
        }
        
        .gallery-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 12px;
        }
        
        .project-details {
            margin-bottom: var(--spacing-8);
        }
        
        .project-description,
        .project-features {
            margin-bottom: var(--spacing-6);
        }
        
        .project-description h3,
        .project-features h3 {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: var(--spacing-3);
        }
        
        .project-description p {
            color: var(--gray-600);
            line-height: 1.6;
        }
        
        .project-features ul {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-2);
        }
        
        .project-features li {
            color: var(--gray-700);
            padding-left: var(--spacing-6);
            position: relative;
        }
        
        .project-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary-600);
            font-weight: 700;
        }
        
        .project-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-4);
            background: var(--gray-50);
            padding: var(--spacing-6);
            border-radius: 12px;
        }
        
        .info-item {
            text-align: center;
        }
        
        .info-item strong {
            display: block;
            color: var(--gray-900);
            margin-bottom: var(--spacing-1);
        }
        
        .info-item span {
            color: var(--gray-600);
        }
        
        .modal-actions {
            display: flex;
            justify-content: center;
            gap: var(--spacing-4);
            flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
            .project-meta {
                flex-direction: column;
                align-items: center;
            }
            
            .project-gallery {
                grid-template-columns: 1fr;
            }
            
            .project-features ul {
                grid-template-columns: 1fr;
            }
            
            .project-info-grid {
                grid-template-columns: 1fr;
                text-align: left;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Make openProjectModal available globally
window.openProjectModal = function(projectId) {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Call the modal initialization function
        openProjectModal(projectId);
    }
};

// Project search functionality
function initializeProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    const projectItems = document.querySelectorAll('.project-item');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            projectItems.forEach(item => {
                const title = item.querySelector('.project-details h3')?.textContent.toLowerCase() || '';
                const location = item.querySelector('.project-location')?.textContent.toLowerCase() || '';
                const type = item.querySelector('.project-type')?.textContent.toLowerCase() || '';
                
                const matches = title.includes(searchTerm) || 
                               location.includes(searchTerm) || 
                               type.includes(searchTerm);
                
                item.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Initialize search if search input exists
if (document.getElementById('projectSearch')) {
    initializeProjectSearch();
}

// Portfolio lazy loading
function initializePortfolioLazyLoading() {
    const images = document.querySelectorAll('.project-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize portfolio lazy loading
initializePortfolioLazyLoading();