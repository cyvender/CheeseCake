using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data
{
    public class CheeseCakeRepository
    {
        private readonly string _connectionString;
        public CheeseCakeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Order> GetOrders()
        {
            using var context = new ReactCheesecakeOrderingDataContext(_connectionString);
            return context.Orders.ToList();
        }

        public void AddOrder(Order order)
        {
            using var context = new ReactCheesecakeOrderingDataContext(_connectionString);
            context.Add(order);
            context.SaveChanges();
        }

        public Order GetOrderById(int id)
        {
            using var context = new ReactCheesecakeOrderingDataContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }

    }
}
