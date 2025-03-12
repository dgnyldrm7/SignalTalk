using Microsoft.AspNetCore.SignalR;

namespace SignalRTest.HubContext
{
    public class ChatHub : Hub
    {
        //Create a method to get connectionId
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        //Kullanıcı diğer kullacıya mesaj atar!
        public async Task SendMessageToUser(string connectionId, string message)
        {
            string senderId = Context.ConnectionId;

            if (!string.IsNullOrEmpty(connectionId))
            {
                await Clients.Client(connectionId).SendAsync("SendToUser", senderId, message);

                await Clients.Caller.SendAsync("SendToUser", "Ben", message);
            }
            else
            {
                await Clients.Caller.SendAsync("SendToUserBack", "Kullanıcı bulunamadı!");
            }
        }

    }
}
