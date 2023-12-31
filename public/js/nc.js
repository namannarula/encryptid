var notyf = new Notyf();
const regBtn = document.getElementById('regBtn');

regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const displayName = document.getElementById('displayName').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;
    const refCode = document.getElementById('refCode').value;

    const data = {
        email,
        password, 
        cpassword,
        name,
        displayName,
        refCode
    }
    fetch('/auth/nc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            switch (data.status) {
                case "error": 
                    notyf.error(data.message);
                    // clear form data after 4 seconds
                    setTimeout(() => {
                        document.getElementById('regForm').reset();
                    }, 3000);
                    break;
                case "success":
                    notyf.success(data.message);
                    notyf.success("Redirecting to Dashboard");      
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 2000);
                    break;
                default:
                    break;
            }
        })
    

})