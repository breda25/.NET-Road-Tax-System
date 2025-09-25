using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vignetteapp.Migrations
{
    public partial class AddTransactionYear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransactionYear",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionYear",
                table: "Transactions");
        }
    }
}
