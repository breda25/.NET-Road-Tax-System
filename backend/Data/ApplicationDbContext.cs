using Microsoft.EntityFrameworkCore;
using vignette_app.Models;

namespace vignette_app.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Car>()
                .HasMany(c => c.Transactions)
                .WithOne(t => t.Car)
                .HasForeignKey(t => t.CarId);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.RoadTaxAmount)
                .HasColumnType("decimal(18,2)");
        }
    }
}