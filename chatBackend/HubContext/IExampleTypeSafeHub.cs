namespace SignalRTest.HubContext
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveAllClient(string userName, string message);

        Task ReceiveSendOtherUsers(string userName, string message, int id);
    }
}
