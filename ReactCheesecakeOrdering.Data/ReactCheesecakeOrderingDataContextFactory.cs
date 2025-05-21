using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data;

public class ReactCheesecakeOrderingDataContextFactory : IDesignTimeDbContextFactory<ReactCheesecakeOrderingDataContext>
{
    public ReactCheesecakeOrderingDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}ReactCheesecakeOrdering.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new ReactCheesecakeOrderingDataContext(config.GetConnectionString("ConStr"));
    }
}