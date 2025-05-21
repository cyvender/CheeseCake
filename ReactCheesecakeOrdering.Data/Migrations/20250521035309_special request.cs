using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactCheesecakeOrdering.Data.Migrations
{
    /// <inheritdoc />
    public partial class specialrequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpecialRequests",
                table: "Orders",
                newName: "SpecialRequest");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpecialRequest",
                table: "Orders",
                newName: "SpecialRequests");
        }
    }
}
