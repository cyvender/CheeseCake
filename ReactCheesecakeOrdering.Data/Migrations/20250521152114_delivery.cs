using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactCheesecakeOrdering.Data.Migrations
{
    /// <inheritdoc />
    public partial class delivery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeleveryDate",
                table: "Orders",
                newName: "DeliveryDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryDate",
                table: "Orders",
                newName: "DeleveryDate");
        }
    }
}
