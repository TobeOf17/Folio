// src/utils/helpers.ts

/**
 * Get appropriate greeting based on current time
 */
export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

/**
 * Format time to 12-hour format
 */
export const formatTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format full date and time
 */
export const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};



/**
 * Get role-specific badge styling
 */
export const getRoleBadgeStyle = (role: string): string => {
    const roleStyles: { [key: string]: string } = {
        'Admin': 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300',
        'Manager': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300',
        'Staff': 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300',
        'HR': 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300',
        'IT': 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-700 border border-cyan-300'
    };

    return roleStyles[role] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300';
};

/**
 * Get role-specific icon
 */
export const getRoleIcon = (role: string): string => {
    const roleIcons: { [key: string]: string } = {
        'Admin': '👑',
        'Manager': '👔',
        'Staff': '👤',
        'HR': '👥',
        'IT': '💻',
        'Finance': '💰',
        'Operations': '⚙️',
        'Marketing': '📈',
        'Customer Service': '🎧'
    };

    return roleIcons[role] || '👤';
};

/**
 * Get attendance status color
 */
export const getAttendanceStatusColor = (status: string): string => {
    const statusColors: { [key: string]: string } = {
        'Present': 'text-green-600 bg-green-50 border-green-200',
        'Absent': 'text-red-600 bg-red-50 border-red-200',
        'Late': 'text-yellow-600 bg-yellow-50 border-yellow-200',
        'On Leave': 'text-blue-600 bg-blue-50 border-blue-200',
        'Checked In': 'text-green-600 bg-green-50 border-green-200',
        'Checked Out': 'text-gray-600 bg-gray-50 border-gray-200'
    };

    return statusColors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
};


/**
 * Check if user is admin based on role
 */
export const checkIsAdmin = (role: string): boolean => {
    const adminRoles = ['Admin', 'Super Admin', 'System Admin'];
    return adminRoles.includes(role);
};





