using Microsoft.AspNetCore.SignalR;

namespace SignalRTest.HubContext
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        public async Task ExampleTaskMethod(string message, int id)
        {
            await Clients.All.ReceiveAllClient("Server", message);

            await Clients.Others.ReceiveSendOtherUsers("Server", message, id);
        }
    }
}
