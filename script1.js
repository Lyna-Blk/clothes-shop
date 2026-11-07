
    function showForm(formType) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';

        if (formType === 'login') {
            document.getElementById('login-form').style.display = 'block';
        } else if (formType === 'signup') {
            document.getElementById('signup-form').style.display = 'block';
        }
    }

    // تسجيل حساب جديد
    function signup() {
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("signup-password").value;

        if (!firstName || !lastName || !email || !password || !phone) {
            alert("يرجى ملء جميع الحقول");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // التحقق من وجود الحساب
        if (users.find(user => user.email === email)) {
            alert("الحساب موجود مسبقاً");
            return;
        }

        users.push({
            firstName,
            lastName,
            email,
            phone,
            password: btoa(password) // تشفير بسيط
        });

        localStorage.setItem("users", JSON.stringify(users));
        alert("تم إنشاء الحساب بنجاح");
        showForm('login');
    }

    // تسجيل الدخول
    function login() {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.email === email && user.password === btoa(password));

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("تم تسجيل الدخول");
            window.location.href = "profile.html"; // توجيه لصفحة الملف الشخصي
        } else {
            alert("بريد إلكتروني أو كلمة مرور غير صحيحة");
        }
    }

