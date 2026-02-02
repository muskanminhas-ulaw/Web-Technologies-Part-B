// Task Manager JavaScript - Full CRUD Operations with localStorage

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = {
            category: 'all',
            status: 'all',
            search: '',
            sortBy: 'date-asc'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    // Load tasks from localStorage
    loadTasks() {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Setup event listeners
    setupEventListeners() {
        // Mobile menu
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Add task form
        const taskForm = document.getElementById('taskForm');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Edit task form
        const editForm = document.getElementById('editTaskForm');
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTask();
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value.toLowerCase();
            this.renderTasks();
        });

        // Filter category
        const filterCategory = document.getElementById('filterCategory');
        filterCategory.addEventListener('change', (e) => {
            this.currentFilter.category = e.target.value;
            this.renderTasks();
        });

        // Filter status
        const filterStatus = document.getElementById('filterStatus');
        filterStatus.addEventListener('change', (e) => {
            this.currentFilter.status = e.target.value;
            this.renderTasks();
        });

        // Sort by
        const sortBy = document.getElementById('sortBy');
        sortBy.addEventListener('change', (e) => {
            this.currentFilter.sortBy = e.target.value;
            this.renderTasks();
        });

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        const modal = document.getElementById('editModal');
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Add new task
    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;
        const category = document.getElementById('taskCategory').value;

        if (!title || !description || !dueDate || !category) {
            alert('Please fill in all fields');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            category,
            status: 'in-progress',
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        // Reset form
        document.getElementById('taskForm').reset();
        
        // Show success message
        this.showNotification('Task added successfully!', 'success');
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    // Toggle task status
    toggleTaskStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = task.status === 'in-progress' ? 'completed' : 'in-progress';
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Open edit modal
    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description;
        document.getElementById('editTaskDueDate').value = task.dueDate;
        document.getElementById('editTaskCategory').value = task.category;

        document.getElementById('editModal').classList.add('active');
    }

    // Update task
    updateTask() {
        const id = parseInt(document.getElementById('editTaskId').value);
        const task = this.tasks.find(t => t.id === id);
        
        if (!task) return;

        task.title = document.getElementById('editTaskTitle').value.trim();
        task.description = document.getElementById('editTaskDescription').value.trim();
        task.dueDate = document.getElementById('editTaskDueDate').value;
        task.category = document.getElementById('editTaskCategory').value;

        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        document.getElementById('editModal').classList.remove('active');
        this.showNotification('Task updated successfully!', 'success');
    }

    // Filter tasks
    filterTasks() {
        let filtered = [...this.tasks];

        // Filter by category
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(task => task.category === this.currentFilter.category);
        }

        // Filter by status
        if (this.currentFilter.status !== 'all') {
            filtered = filtered.filter(task => task.status === this.currentFilter.status);
        }

        // Filter by search
        if (this.currentFilter.search) {
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(this.currentFilter.search) ||
                task.description.toLowerCase().includes(this.currentFilter.search)
            );
        }

        return filtered;
    }

    // Sort tasks
    sortTasks(tasks) {
        const sorted = [...tasks];

        switch (this.currentFilter.sortBy) {
            case 'date-asc':
                sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                break;
            case 'date-desc':
                sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return sorted;
    }

    // Check if task is overdue
    isOverdue(dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today;
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Render tasks
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const filtered = this.filterTasks();
        const sorted = this.sortTasks(filtered);

        if (sorted.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks found. ${this.currentFilter.search || this.currentFilter.category !== 'all' || this.currentFilter.status !== 'all' ? 'Try adjusting your filters.' : 'Add your first task above!'}</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = sorted.map(task => {
            const isOverdue = this.isOverdue(task.dueDate) && task.status === 'in-progress';
            
            return `
                <div class="task-card ${task.status}">
                    <div class="task-checkbox ${task.status === 'completed' ? 'checked' : ''}" 
                         onclick="taskManager.toggleTaskStatus(${task.id})">
                        <i class="fas fa-check"></i>
                    </div>
                    
                    <div class="task-details">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        <p class="task-description">${this.escapeHtml(task.description)}</p>
                        
                        <div class="task-meta">
                            <span class="task-meta-item ${isOverdue ? 'task-overdue' : ''}">
                                <i class="fas fa-calendar"></i>
                                ${this.formatDate(task.dueDate)}
                                ${isOverdue ? '(Overdue)' : ''}
                            </span>
                            <span class="task-category-badge ${task.category}">
                                ${task.category}
                            </span>
                            <span class="task-status-badge ${task.status}">
                                ${task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </span>
                        </div>
                    </div>
                    
                    <div class="task-actions">
                        <button class="task-action-btn" onclick="taskManager.openEditModal(${task.id})" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-action-btn delete" onclick="taskManager.deleteTask(${task.id})" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const inProgress = this.tasks.filter(t => t.status === 'in-progress').length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('inProgressTasks').textContent = inProgress;
        document.getElementById('completedTasks').textContent = completed;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#00b894' : '#d63031'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize Task Manager
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});