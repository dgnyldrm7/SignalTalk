var connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7174/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();





function startConnection() {
    connection.start()
        .then(() => {console.log("SignalR ile haberleşme sağlandı!")
            connection.invoke("GetConnectionId")
            .then((connectionId) => {
                document.getElementById("userId").innerText = "User Kimliği: " + connectionId;
            } )
            .catch(err => console.error(err));
    })
        .catch(err => {
            console.log("Error message => " + err);
            setTimeout(startConnection, 5000);
        });
}

function SendMessageToUser() {
    let connectionId = document.getElementById("userNameInput").value.trim();
    let message = document.getElementById("messageInput").value.trim();

    connection.invoke("GetConnectionId")
            .then((connectionId) => {

                let messageContainer = document.getElementById("messageContainer");
                let messageDiv = document.createElement("div");
                
                messageDiv.textContent = `Ben : ${message}`;
                messageDiv.style.padding = "5px";
                messageDiv.style.borderBottom = "1px solid #ddd";
                messageContainer.appendChild(messageDiv);
            } )
            .catch(err => console.error(err));

    


    if (!connectionId || !message) {
        alert("Bağlantı ID'si ve mesaj alanları boş bırakılamaz!");
        return;
    }

    connection.invoke("SendMessageToUser", connectionId, message)
        .then(() => {
            document.getElementById("messageInput").value = "";
        })
        .catch(err => console.error("Mesaj gönderme hatası:", err));
}


connection.on("SendToUser", function (senderId, message) {
    console.log("Mesaj geldi - Gönderen ID:", senderId, "Mesaj:", message);

    let messageContainer = document.getElementById("messageContainer");
    let messageDiv = document.createElement("div");
    
    messageDiv.textContent = `${senderId} : ${message}`;
    messageDiv.style.padding = "5px";
    messageDiv.style.borderBottom = "1px solid #ddd";
    messageContainer.appendChild(messageDiv);
});




connection.on("SendToUserBack", function (message) {
    let messageContainer = document.getElementById("messageContainer");
    let messageDiv = document.createElement("div");
    messageDiv.textContent = `${message}`;
    messageDiv.style.padding = "5px";
    messageDiv.style.borderBottom = "1px solid #ddd";
    messageContainer.appendChild(messageDiv);
});



document.addEventListener('DOMContentLoaded', function () {
    var toastTrigger = document.getElementById('liveToastBtn');
    var toastContainer = document.getElementById('toastContainer');

    if (toastTrigger) {
        toastTrigger.addEventListener('click', function () {
            var toastElement = document.createElement('div');
            toastElement.classList.add('toast');
            toastElement.setAttribute('role', 'alert');
            toastElement.setAttribute('aria-live', 'assertive');
            toastElement.setAttribute('aria-atomic', 'true');
            
            toastElement.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">Hey</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Doğan isimli kullanıcı sisteme giriş yaptı!
                </div>`;
            
            toastContainer.appendChild(toastElement);
            var toast = new bootstrap.Toast(toastElement);
            toast.show();
            setTimeout(() => {
                toast.hide();
                toastElement.remove();
            }, 3000);
        });
    }
});



startConnection();