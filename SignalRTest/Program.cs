using SignalRTest.HubContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add SignalR - SignalR Servicei burada ekledik.
builder.Services.AddSignalR();

//Add CORS - CORS Servicei burada ekledik.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500") // Ýstemcinin URL’sini buraya ekle
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Hub'ý belirli bir endpoint'e baðladýk. Keyfidir!
app.MapHub<ChatHub>("/chatHub");

app.MapHub<ExampleTypeSafeHub>("/exampleTypeSafeHub");

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
