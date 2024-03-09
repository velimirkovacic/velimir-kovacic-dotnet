export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    window.location.href = '/';
}