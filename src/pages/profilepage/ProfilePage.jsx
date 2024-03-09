function ProfilePage() {
    if (!localStorage.getItem('token')) {
        window.location.href = '/login';
    }
    const student = JSON.parse(localStorage.getItem('student'));

    return (
        <div>
            <h1>Welcome {student.name}</h1>
        </div>
    );
}

export default ProfilePage;