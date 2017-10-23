using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TheWorld.Migrations
{
    public partial class InitialDatabase1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Arival",
                table: "Stops",
                newName: "Arrival");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Stops",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Stops");

            migrationBuilder.RenameColumn(
                name: "Arrival",
                table: "Stops",
                newName: "Arival");
        }
    }
}
