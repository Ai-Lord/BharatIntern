
document.getElementById('register').addEventListener("click", (e)=>{
    e.preventDefault();
    const inputData={
        name: document.getElementById('form_name').value,
        email: document.getElementById('form_email').value,
        password: document.getElementById('form_pass').value
    };

    if (inputData.password !== document.getElementById('form_cpass').value) {
        alert('Password does not match')
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) =>response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

})