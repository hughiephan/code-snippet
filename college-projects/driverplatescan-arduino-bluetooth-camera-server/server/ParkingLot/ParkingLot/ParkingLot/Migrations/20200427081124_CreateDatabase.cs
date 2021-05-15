using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ParkingLot.Migrations
{
    public partial class CreateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parkings",
                columns: table => new
                {
                    Uid = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardId = table.Column<string>(nullable: true),
                    LicencePlateIn = table.Column<string>(nullable: true),
                    LicencePlateImgIn = table.Column<string>(nullable: true),
                    TimeIn = table.Column<DateTime>(nullable: false),
                    LicencePlateOut = table.Column<string>(nullable: true),
                    LicencePlateImgOut = table.Column<string>(nullable: true),
                    TimeOut = table.Column<DateTime>(nullable: true),
                    TotalHours = table.Column<int>(nullable: true),
                    ParkingCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UserUidIn = table.Column<int>(nullable: false),
                    UserUidOut = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parkings", x => x.Uid);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Uid = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    role = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Uid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parkings");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
