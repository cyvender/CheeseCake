using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Patterns;
using ReactCheesecakeOrdering.Data;
using ReactCheesecakeOrdering.Web.Models;

namespace ReactCheesecakeOrdering.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheeseCakeController : ControllerBase
    {
        private readonly string _connectionString;

        public CheeseCakeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getorders")]
        public List<Order> GetOrders()
        {
            var repo = new CheeseCakeRepository(_connectionString);
            return repo.GetOrders();
        }

        [HttpPost]
        [Route("addorder")]
        public void AddOrder(Order order)
        {
            var repo = new CheeseCakeRepository(_connectionString);
            repo.AddOrder(order);
        }

        [HttpGet]
        [Route("getorder")]
        public Order GetOrderById(int orderId)
        {
            var repo = new CheeseCakeRepository(_connectionString);
            return repo.GetOrderById(orderId);
        }

    }
}
